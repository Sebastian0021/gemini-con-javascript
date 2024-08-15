const form = document.querySelector("#chatForm");
const input = document.querySelector("#chatInput");
const chatContent = document.querySelector("#chatContent");

const historyChat = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const message = input.value;

  fetch("EL LINK DE TU WORKER", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userMessage: message, historyChat }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Worker Error");
      }
      return response.json();
    })
    .then((data) => {
      chatContent.textContent = data.text;
    });
});
