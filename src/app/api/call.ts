import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const streamResponse = async (
  conversation: ChatCompletionMessageParam[],
  setResponse: (res: string) => void,
  signal: AbortSignal | null = null,
  setError: (error: string | number | null) => void
) => {
  try {
    const res = await fetch("/api/conversation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: conversation }),
      signal,
    });

    if (!res.ok) {
      setError(res.status);
      throw new Error(res.statusText);
    }

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
  } catch (error) {
    console.error("Error in streamResponse:", error);
  }
};

// add api limittations
// add payment method
// create a databse for user's history
// the ui is too minimal, add more components
