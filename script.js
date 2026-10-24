let MODEL = ["openai/gpt-oss-20b:free", "nvidia/nemotron-3-ultra-550b-a55b:free", "google/gemma-4-31b-it:free"]




const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${APIKEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": "http://localhost:3000",
    "X-Title": "My Local AI",
  },
  body: JSON.stringify({
    model: MODEL[0],
    messages: [
      {
        role: "user",
        content: "Fun fact about Nigeria.",             
      },
    ],
  }),
});

const data = await response.json();

console.log(data.choices[0].message.content);

import { askOpenRouter } from "./openRouter2.js";
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

const form = document.getElementById("form");
const input = document.getElementById("input");
const chat = document.getElementById("chat");

function appendMessage(text, cls = "bot") {
  const el = document.createElement("div");
  el.className = `msg ${cls}`;
  el.textContent = text;
  chat.appendChild(el);
  chat.scrollTop = chat.scrollHeight;
  return el;
}
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, "user");
  input.value = "";

  const placeholder = appendMessage("Thinking...", "bot loading");
  try {
    const reply = await askOpenRouter(text);
    const formattedReply = marked.parse(reply, { gfm: true, breaks: true });
    placeholder.remove();
    appendMessage(formattedReply, "bot");
  } catch (err) {
    placeholder.remove();
    appendMessage("Error: " + (err.message || err), "bot error");
  }
});