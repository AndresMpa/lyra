import { handlePrompt } from "./prompt.js";

const promptButton = document.querySelector("#promptButton");
const promptChat = document.querySelector("#promptChat");

promptButton.addEventListener("click", handlePrompt);
promptChat.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && event.shiftKey) {
    handlePrompt();
  }
});
