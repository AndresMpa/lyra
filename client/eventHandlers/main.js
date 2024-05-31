import {
  menuHandler,
  addChatHandler,
  prevChatHandler,
  nextChatHandler,
  deleteChatHandler,
} from "./navbar.js";
import { loadDefaults } from "./window.js";
import { handlePrompt } from "./prompt.js";
import {
  reloadCharts,
  updateCpuChart,
  updateRamChart,
  updateDiskChart,
} from "./widget.js";

const promptButton = document.querySelector("#promptButton");
const deleteChat = document.querySelector("#deleteChat");
const promptChat = document.querySelector("#promptChat");
const menuButton = document.querySelector("#menuButton");
const prevChat = document.querySelector("#prevChat");
const nextChat = document.querySelector("#nextChat");
const addChat = document.querySelector("#addChat");

loadDefaults();

//window.addEventListener("DOMContentLoaded", () => {
window.addEventListener("load", () => {
  loadDefaults();
  updateCpuChart();
  updateRamChart();
  updateDiskChart();
});

window.addEventListener("resize", () => reloadCharts());

menuButton.addEventListener("click", () => menuHandler());
addChat.addEventListener("click", () => addChatHandler());
prevChat.addEventListener("click", () => prevChatHandler());
nextChat.addEventListener("click", () => nextChatHandler());
deleteChat.addEventListener("click", () => deleteChatHandler());

promptButton.addEventListener("click", async () => {
  await handlePrompt();
});
promptChat.addEventListener("keydown", async (event) => {
  if (event.key === "Enter" && event.shiftKey) {
    event.preventDefault();
    await handlePrompt();
  }
});

setInterval(updateCpuChart, 1000);
setInterval(updateRamChart, 1000);
setInterval(updateDiskChart, 1000);
