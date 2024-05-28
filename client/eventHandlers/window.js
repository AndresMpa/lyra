import {
  saveItemToStorage,
  saveArrayToStorage,
  getItemFromStorage,
} from "../utils/storageHandler.js";

const loadDefaults = () => {
  const currentChat = getItemFromStorage("currentChat") || 0;
  const chats = getItemFromStorage("chats") || [[]];

  saveItemToStorage("currentChat", currentChat);
  saveItemToStorage("chats", chats);
};

export { loadDefaults };
