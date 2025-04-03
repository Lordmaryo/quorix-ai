"use client";
import { validatePrompt } from "@/app/(dashboard)/constant";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp, Loader2 } from "lucide-react";
import { streamResponse } from "@/app/api/call";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useRouter } from "next/navigation";
import ConversationChats from "./ConversationChats";
import Greeting from "./Greeting";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<
    ChatCompletionMessageParam[]
  >([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    responseRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      if (loading) return;
      setError(null);
      setLoading(true);

      const validationError = validatePrompt(prompt);
      setError(validationError);

      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: prompt,
      };

      const newmessage = [...conversation, userMessage];

      await streamResponse(newmessage, (res) => {
        setConversation([...newmessage, { role: "assistant", content: res }]);
      });
    } catch (error) {
      console.error("Error submitting message:", error);
    } finally {
      setPrompt("");
      setLoading(false);
      router.refresh();
    }
  };

  return (
    <div className="w-[440px] sm:w-[500px] lg:w-[600px] xl:w-[720px] md:mt-10">
      {!conversation.length && <Greeting />}
      {conversation.length > 1 && (
        <ConversationChats conversation={conversation} />
      )}

      <div className="sticky bottom-6 w-full mt-10">
        <form onSubmit={handleSubmit}>
          <div
            ref={responseRef}
            className="w-full h-32 bg-[#0A0A0A] fixed right-0 -z-10 bottom-0"
          />
          {error && <p className="text-red-500 text-sm py-2">{error}</p>}
          <textarea
            value={prompt}
            placeholder="Ask anything"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSubmit(e)
            }
            className="bg-zinc-900 border py-2 pl-2 pr-12 w-full h-24 resize-none rounded-lg outline-none"
          />
          <Button
            type="submit"
            disabled={loading || !prompt}
            className="absolute right-5 bottom-2 rounded-full"
          >
            {loading ? <Loader2 className="animate-spin" /> : <ArrowUp />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Form;
