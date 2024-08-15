import { getGeminiTextResponse } from "./gemini.js";

const form = document.querySelector("#chatForm");
const input = document.querySelector("#chatInput");
const chatContent = document.querySelector("#chatContent");

const historyChat = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = input.value;

  getGeminiTextResponse(message, historyChat).then((response) => {
    chatContent.textContent = response;
  });
});
