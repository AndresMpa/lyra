import {
  saveItemToStorage,
  saveArrayToStorage,
  getItemFromStorage,
} from "../utils/storageHandler.js";
import { baseUrl } from "../OS/main.js";

const promptChat = document.querySelector("#promptChat");

const messageBox = document.querySelector("#messageBox");
const activeChat = document.querySelector("#activeChat");
const app = document.querySelector("#app");

const trimBr = (htmlContent) => {
  const tmpDiv = document.createElement("div");
  tmpDiv.innerHTML = htmlContent;

  while (tmpDiv.firstChild && tmpDiv.firstChild.nodeName === "BR") {
    tmpDiv.removeChild(tmpDiv.firstChild);
  }

  while (tmpDiv.lastChild && tmpDiv.lastChild.nodeName === "BR") {
    tmpDiv.removeChild(tmpDiv.lastChild);
  }

  return tmpDiv.innerHTML;
};

const createMessage = (content, messageType) => {
  const messageContainer = document.createElement("article");
  const message = document.createElement("p");
  message.classList.add(`${messageType}-message-content`);
  message.innerHTML = content;

  messageContainer.classList.add(`${messageType}-message`);
  messageContainer.append(message);

  return messageContainer;
};

const askLyra = async (entry) => {
  const rawData = await fetch(`${baseUrl}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_input: entry }),
  })
    .then((response) => response.json())
    .then((data) => data.response)
    .catch((error) => console.error("Error on fetch request: ", error));

  return rawData;
};

export const handlePrompt = async () => {
  app.classList.add("moveUpFadeOut");
  app.classList.add("none");

  activeChat.classList = "active-chat";
  messageBox.classList.remove("none");

  const currentChat = getItemFromStorage("currentChat");
  const chats = getItemFromStorage("chats");

  const rawContent = trimBr(promptChat.innerHTML);
  saveArrayToStorage("chats", currentChat, { type: "user", data: rawContent });

  messageBox.append(createMessage(rawContent, "user"));
  messageBox.scrollTop = messageBox.scrollHeight;
  promptChat.replaceChildren();

  const lyrasAnswer = await askLyra(rawContent);
  saveArrayToStorage("chats", currentChat, { type: "lyra", data: lyrasAnswer });

  messageBox.append(createMessage(lyrasAnswer, "lyra"));
  messageBox.scrollTop = messageBox.scrollHeight;
  promptChat.replaceChildren();
};

export { trimBr, createMessage };
