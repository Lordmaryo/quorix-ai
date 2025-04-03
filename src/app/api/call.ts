import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const streamResponse = async (
  conversation: ChatCompletionMessageParam[],
  setResponse: (res: string) => void
) => {
  const res = await fetch("/api/conversation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: conversation }),
  });

  if (!res.body) return;

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let response = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    response += decoder.decode(value, { stream: true });

    setResponse(response);
  }
};
