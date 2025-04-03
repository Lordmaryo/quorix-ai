import { NextResponse } from "next/server";
import { openAi } from "../config/config";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: ChatCompletionMessageParam[] } =
      await req.json();

    if (!messages || !messages.length) {
      return new NextResponse("Message is required", { status: 400 });
    }

    const completion = await openAi.chat.completions.create({
      model: process.env.DEEPSEEK_MODEL!,
      stream: true,
      messages,
    });

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
      headers: { "Content-Type": "text/event-stream" },
    });

    console.log("Stream response:", stream);

    return stream;
  } catch (error) {
    console.error("Error in POST conversation route:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
