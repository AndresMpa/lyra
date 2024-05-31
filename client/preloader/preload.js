const { contextBridge, ipcRenderer } = require("electron");
const config = require("../utils/config");

contextBridge.exposeInMainWorld("electron", {
  getBaseUrl: () => ipcRenderer.invoke("get-base-url"),
  getCPUUsage: () => ipcRenderer.invoke("get-cpu-usage"),
  getRAMUsage: () => ipcRenderer.invoke("get-ram-usage"),
  getDiskUsage: () => ipcRenderer.invoke("get-disk-usage"),
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

window.addEventListener("DOMContentLoaded", () => attachContextData());
