const fs = require("fs");
const os = require("os");
const path = require("path");

const customConfigPaths = [
  path.join(os.homedir(), ".config", "lyra", "config.json"),
  path.join(os.homedir(), ".lyra", "config.json"),
];

const loadConfig = () => {
  let customPath;

  for (customPath of customConfigPaths) {
    if (fs.existsSync(customPath)) {
      configPath = customPath;
      break;
    }
  }

  try {
    const config = require(configPath);
    return config;
  } catch (err) {
    throw new Error("Failed to load config file: " + err.message);
  }
};

module.exports = loadConfig();
