const axios = require("axios");

const config = require("../utils/config");

const baseUrlLoader = async () => {
  let lyraBaseUrl;
  if (config.nodeEnv === "production") {
    const baseUrl = `${config.host}:${config.apiPort}`;
    lyraBaseUrl = baseUrl;
  } else {
    const response = await axios.get(config.lyraUrl);
    lyraBaseUrl = response.data;
  }

  return lyraBaseUrl;
};

module.exports = { baseUrlLoader };
