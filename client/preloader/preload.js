const axios = require("axios");

window.addEventListener("DOMContentLoaded", async () => {
  const response = await axios.get(lyraUrl);
  window.lyraBaseUrl = response.data;

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
