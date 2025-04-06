import { NextResponse } from "next/server";
import { openAi, optimizedMessages } from "../config/config";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { checkApiLimit, increaseApiLimit } from "@/lib/apiLimit";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatCompletionMessageParam[] } =
      await req.json();

    if (!messages || !messages.length) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();

    if (!freeTrial) {
      return new NextResponse("Free trial has expired", { status: 402 });
    }

    const optimizedMessage = optimizedMessages(messages);

    const completion = await openAi.chat.completions.create({
      model: "deepseek/deepseek-r1:free" ,
      stream: true,
      messages: optimizedMessage as ChatCompletionMessageParam[],
      temperature: 2,
    });

    await increaseApiLimit();

    const encoder = new TextEncoder();

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            const text = chunk.choices[0]?.delta?.content || "";
            if (text) {
              controller.enqueue(encoder.encode(text));
            }
          }
        } catch (err) {
          console.error("Streaming error:", err);
          controller.error(err);
        } finally {
          controller.close();
        }
      },
    });

    const stream = new Response(readableStream, {
      headers: {
        "Content-Type": "text/event-stream",
        "X-Accel-Buffering": "no",
      },
    });

    return stream;
  } catch (error) {
    console.error("Error in POST conversation route:", error);
    return new NextResponse("Something went wrong, please try again later", {
      status: 500,
    });
  }
}
