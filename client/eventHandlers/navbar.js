import {
  saveItemToStorage,
  getItemFromStorage,
  deleteArrayItemFromStorage,
} from "../utils/storageHandler.js";
import { createMessage, trimBr } from "./prompt.js";
import { invokeDashboard, invokeChat } from "./chat.js";

const controlButtons = [
  document.querySelector("#controlButton1"),
  document.querySelector("#controlButton2"),
  document.querySelector("#controlButton3"),
];

const activeTabs = document.querySelector("#activeTabs");
const prevChat = document.querySelector("#prevChat");
const nextChat = document.querySelector("#nextChat");
const menu = document.querySelector("#menu");

const loadChat = (chatIndex) => {
  invokeChat();

  const promptChat = document.querySelector("#promptChat");
  const messageBox = document.querySelector("#messageBox");
  messageBox.replaceChildren();

  const listOfChats = getItemFromStorage("chats");

  let rawContent;
  listOfChats[chatIndex].forEach((item) => {
    rawContent = trimBr(item.data);
    messageBox.append(createMessage(rawContent, item.type));
    messageBox.scrollTop = messageBox.scrollHeight;
    promptChat.replaceChildren();
  });
};

const updateButtons = (change) => {
  let calculus;
  controlButtons.forEach((item) => {
    calculus = parseInt(item.dataset.value) + change;
    item.dataset.value = calculus;
    item.textContent = calculus;
    item.classList.toggle("none", calculus <= 0);
  });
};

const checkLimits = (current, limit) => {
  nextChat.classList.toggle("disabled-controls-button", current >= limit - 1);
  prevChat.classList.toggle("disabled-controls-button", current <= 0);
};

const addChatHandler = () => {
  const currentChat = getItemFromStorage("currentChat");
  const listOfChats = getItemFromStorage("chats");
  listOfChats.push([]);

  if (listOfChats[currentChat].length > 0) {
    saveItemToStorage("currentChat", currentChat + 1);
    saveItemToStorage("chats", listOfChats);

    invokeDashboard();

    activeTabs.classList.remove("none");

    updateButtons(1);
    checkLimits(currentChat + 1, getItemFromStorage("chats").length);
  }
};

const prevChatHandler = () => {
  const currentChat = getItemFromStorage("currentChat");

  if (currentChat - 1 > -1) {
    saveItemToStorage("currentChat", currentChat - 1);
    checkLimits(currentChat - 1, getItemFromStorage("chats").length);
    updateButtons(-1);

    loadChat(currentChat - 1);
  }
};

const nextChatHandler = () => {
  const currentChat = getItemFromStorage("currentChat");

  if (currentChat + 1 < getItemFromStorage("chats").length) {
    saveItemToStorage("currentChat", currentChat + 1);
    checkLimits(currentChat + 1, getItemFromStorage("chats").length);
    updateButtons(1);

    loadChat(currentChat + 1);
  }
};

const deleteChatHandler = () => {
  const currentChat = getItemFromStorage("currentChat");
  deleteArrayItemFromStorage("chats", currentChat);

  const amountOfChat = getItemFromStorage("chats").length;
  saveItemToStorage("currentChat", amountOfChat);

  if (getItemFromStorage("chats").length <= 0) {
    saveItemToStorage("chats", [[]]);

    activeTabs.classList.add("none");
  }

  if (currentChat - 1 >= 0) {
    saveItemToStorage("currentChat", currentChat - 1);
    checkLimits(currentChat - 1, getItemFromStorage("chats").length);
    updateButtons(-1);

    loadChat(currentChat - 1);
  }
};

const menuHandler = (target) => menu.classList.toggle("none");

export {
  menuHandler,
  addChatHandler,
  prevChatHandler,
  nextChatHandler,
  deleteChatHandler,
};
