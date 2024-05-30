const axios = require("axios");
require("dotenv").config();

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
