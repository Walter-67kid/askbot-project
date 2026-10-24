export const OPEN_ROUTER_API_KEY =
"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";
let MODEL = ["openai/gpt-oss-20b:free", "nvidia/nemotron-3-ultra-550b-a55b:free", "google/gemma-4-31b-it:free"]


export async function askOpenRouter(message) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${OPEN_ROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "My Local AI",
      },
      body: JSON.stringify({
        model: "openrouter/free",
        messages: [
          {
            role: "user",
            content: message,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? JSON.stringify(data);
}