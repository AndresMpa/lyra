const diskData = await window.electron.getDiskUsage();
const ramData = await window.electron.getRAMUsage();
const cpuData = await window.electron.getCPUUsage();

export { cpuData, ramData, diskData };
