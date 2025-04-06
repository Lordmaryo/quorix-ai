"use client";
import { validatePrompt } from "@/app/(dashboard)/constant";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowUp, Square } from "lucide-react";
import { streamResponse } from "@/app/api/call";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useRouter } from "next/navigation";
import ConversationChats from "./ConversationChats";
import Greeting from "./Greeting";
import { toast } from "sonner";
import Suggestions from "./Suggestions";
import { UseGlobalStore } from "@/app/hooks/useGlobalStore";

const Form = () => {
  const openModal = UseGlobalStore();
  const [prompt, setPrompt] = useState("");
  const { suggestedPrompt, setSuggestedPrompt } = UseGlobalStore();
  const [controller, setController] = useState<AbortController | null>(null);
  const [error, setError] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<
    ChatCompletionMessageParam[]
  >([]);
  const responseRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    responseRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const processPrompt = async (prompt: string) => {
    try {
      if (loading) return;
      setError(null);
      setLoading(true);

      const validationError = validatePrompt(prompt);
      setError(validationError);

      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: prompt,
      };

      const newMessage = [...conversation, userMessage];
      setConversation(newMessage);
      setPrompt("");

      const placeholderResponse: ChatCompletionMessageParam = {
        role: "assistant",
        content: "",
      };

      setConversation([...newMessage, placeholderResponse]);

      const newController = new AbortController();
      setController(newController);

      await streamResponse(
        newMessage,
        (res) => {
          setConversation([...newMessage, { role: "assistant", content: res }]);
        },
        newController.signal,
        setError
      );
    } catch (error: any) {
      console.error("Error submitting message:", error);
    } finally {
      setLoading(false);
      router.refresh();
    }
  };

  useEffect(() => {
    if (suggestedPrompt.length) {
      setTimeout(() => processPrompt(suggestedPrompt), 100);
      setSuggestedPrompt("");
    }
  }, [suggestedPrompt]);

  useEffect(() => {
    if (error === 402) {
      openModal.onOpen();
    }
  }, [error]);

  useEffect(() => {
    if (typeof error === "string") {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    processPrompt(prompt);
  };

  const handleStop = () => {
    if (controller) {
      controller.abort();
      setLoading(false);
      setController(null);
      toast("Generation terminated");
    }
  };

  return (
    <div className="w-[440px] sm:w-[500px] lg:w-[600px] xl:w-[720px] md:mt-10">
      {conversation.length > 1 && (
        <ConversationChats
          conversation={conversation}
          loading={loading}
          error={error}
        />
      )}
      {/* {!conversation.length && <Greeting />} */}
      {!conversation.length && <Suggestions />}

      <div className="sticky bottom-6 w-full mt-10">
        <form onSubmit={handleSubmit}>
          <div
            ref={responseRef}
            className="w-full h-32 bg-[#0A0A0A] fixed right-0 -z-10 bottom-0"
          />
          <textarea
            value={prompt}
            placeholder="Ask anything"
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              !loading &&
              prompt.trim().length &&
              handleSubmit(e)
            }
            className="bg-zinc-900 border py-2 pl-2 pr-12 w-full h-28 resize-none rounded-lg outline-none"
          />

          <div className="absolute right-5 bottom-4 rounded-full">
            <Button
              type="button"
              variant={"default"}
              disabled={!prompt && !loading}
              className="cursor-pointer rounded-full"
              onClick={loading ? handleStop : handleSubmit}
            >
              {loading ? <Square className="bg-black" /> : <ArrowUp />}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
