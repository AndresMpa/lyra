import {
  saveItemToStorage,
  getItemFromStorage,
} from "../utils/storageHandler.js";

const prevChat = document.querySelector("#prevChat");
const nextChat = document.querySelector("#nextChat");
const menu = document.querySelector("#menu");

const messageBox = document.querySelector("#messageBox");
const activeChat = document.querySelector("#activeChat");
const app = document.querySelector("#app");

const addChatHandler = () => {
  const currentChat = getItemFromStorage("currentChat");
  const listOfChats = getItemFromStorage("chats");
  listOfChats.push([]);

  if (listOfChats[currentChat].length > 0) {
    saveItemToStorage("currentChat", currentChat + 1);
    saveItemToStorage("chats", listOfChats);

    app.classList.remove("none");
    app.classList.add("moveDownFadeIn");

    activeChat.classList.remove("active-chat");
    messageBox.classList.add("none");

    messageBox.replaceChildren();
  }
};

const prevChatHandler = () => {
  const amountOfChat = getItemFromStorage("chats").lenght;
  const currentChat = getItemFromStorage("currentChat");

  if (currentChat - 1 > amountOfChat) {
    saveItemToStorage("currentChat", currentChat - 1);
  }

  if (currentChat - 1 <= amountOfChat) {
    nextChat.classList.remove("disabled-controls-button");
    prevChat.classList.add("disabled-controls-button");
  }
};
const nextChatHandler = () => {
  const amountOfChat = getItemFromStorage("chats").lenght;
  const currentChat = getItemFromStorage("currentChat");

  if (currentChat + 1 < amountOfChat) {
    saveItemToStorage("currentChat", currentChat + 1);
  }

  if (currentChat + 1 >= amountOfChat) {
    prevChat.classList.remove("disabled-controls-button");
    nextChat.classList.add("disabled-controls-button");
  }
};

const menuHandler = (target) => menu.classList.toggle("none");

export { addChatHandler, prevChatHandler, nextChatHandler, menuHandler };
