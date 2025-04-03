"use client";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ClipboardCopy } from "lucide-react";
import { copyToClipboard, markdownComponents } from "./MarkdownComponent";

interface ConversationChatsProps {
  conversation: ChatCompletionMessageParam[];
}

const ConversationChats = ({ conversation }: ConversationChatsProps) => {
  return (
    <div className="mt-4 w-full max-w-4xl mx-auto font-sans">
      {conversation.map((msg, index) => {
        const isUser = msg.role === "user";
        const messageContent = Array.isArray(msg.content)
          ? msg.content.join("")
          : msg.content || "";

        return (
          <div
            key={index}
            className={`flex mb-6 ${isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-3xl rounded-lg ${
                isUser ? "bg-zinc-900 text-gray-100" : "text-gray-100"
              }`}
            >
              <div className="p-4 pb-6">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={markdownComponents}
                >
                  {messageContent}
                </ReactMarkdown>
              </div>
              {!isUser && (
                <button
                  className="absolute bottom-2 right-2 p-1 text-gray-400 hover:text-white transition"
                  onClick={() => {
                    copyToClipboard(messageContent);
                  }}
                >
                  <ClipboardCopy size={16} />
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ConversationChats;
