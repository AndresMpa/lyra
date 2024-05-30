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

  const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
  const totalTotal = cpus.reduce(
    (acc, cpu) =>
      acc + Object.values(cpu.times).reduce((acc, time) => acc + time, 0),
    0,
  );
  const totalUsage = ((totalTotal - totalIdle) / totalTotal) * 100;
  const freeMemory = os.freemem();

  usage.push({ total: totalCores, usage: totalUsage, free: freeMemory });

  return usage;
};

module.exports = { getCPUUsage };
