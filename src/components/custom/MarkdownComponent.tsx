"use client";
import { ClipboardCopy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { toast } from "sonner";

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
  toast.success("Copied to clipboard!");
};

export const markdownComponents = {
  h1: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />
  ),
  h2: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-xl font-bold mt-4 mb-2" {...props} />
  ),
  h3: ({ ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-lg font-bold mt-3 mb-1.5" {...props} />
  ),
  p: ({ ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-4 leading-relaxed" {...props} />
  ),
  ul: ({ ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc pl-5 mb-4" {...props} />
  ),
  ol: ({ ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal pl-5 mb-4" {...props} />
  ),
  li: ({ ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="mb-1" {...props} />
  ),
  blockquote: ({ ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-4 border-gray-500 pl-4 italic text-gray-400 mb-4"
      {...props}
    />
  ),
  code({
    inline,
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement> & {
    inline?: boolean;
    className?: string;
  }) {
    const match = /language-(\w+)/.exec(className || "");
    return !inline && match ? (
      <div className="relative">
        <SyntaxHighlighter
          //@ts-ignore
          style={atomDark}
          language={match[1]}
          PreTag="div"
          className="rounded-md text-sm mb-4 mt-2"
          {...props}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
        <button
          onClick={() => copyToClipboard(String(children).replace(/\n$/, ""))}
          className="absolute top-2 right-2 p-1 rounded bg-zinc-700 hover:bg-zinc-600 transition"
        >
          <ClipboardCopy size={16} />
        </button>
      </div>
    ) : (
      <code
        className="bg-zinc-700 rounded px-1 py-0.5 text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  },
};
