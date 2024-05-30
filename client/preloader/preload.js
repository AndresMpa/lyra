const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");
require("dotenv").config();

contextBridge.exposeInMainWorld("electron", {
  getCPUUsage: () => ipcRenderer.invoke("get-cpu-usage"),
  getDiskUsage: () => ipcRenderer.invoke("get-disk-usage"),
  getRAMUsage: () => ipcRenderer.invoke("get-ram-usage"),
});

const attachContextData = () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
};

window.addEventListener("DOMContentLoaded", async () => {
  const baseUrl = process.env.LYRA_URL;

  const lyraUrl = baseUrl;
  const response = await axios.get(lyraUrl);
  window.lyraBaseUrl = response.data;

  attachContextData();
});
