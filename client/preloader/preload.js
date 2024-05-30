const { contextBridge, ipcRenderer } = require("electron");
const axios = require("axios");

const config = require("../utils/config");

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
  const response = await axios.get(config.lyraUrl);
  window.lyraBaseUrl = response.data;

  attachContextData();
});
