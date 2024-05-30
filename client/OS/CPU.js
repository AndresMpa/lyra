const os = require("os");

const getCPUUsage = () => {
  const cpus = os.cpus();
  const totalCores = cpus.length;

  const usage = cpus.map((cpu, index) => {
    const idle = cpu.times.idle;
    const total = Object.values(cpu.times).reduce((acc, time) => acc + time, 0);
    const usagePercent = ((total - idle) / total) * 100;

    return { core: index, usage: usagePercent };
  });

  return usage;
};

module.exports = { getCPUUsage };
