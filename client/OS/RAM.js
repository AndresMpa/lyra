const os = require("os");

function getRAMUsage() {
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const usedMemory = totalMemory - freeMemory;
  const usagePercent = (usedMemory / totalMemory) * 100;

  return {
    total: totalMemory,
    used: usedMemory,
    free: freeMemory,
    usage: usagePercent,
  };
}

module.exports = { getRAMUsage };
