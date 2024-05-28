require("dotenv").config();

const config = {
  env: process.env.NODE_ENV || "development",
  baseUrl: process.env.LYRA_URL,
};

module.exports = { config };
