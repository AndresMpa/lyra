const diskData = await window.electron.getDiskUsage();
const ramData = await window.electron.getRAMUsage();
const cpuData = await window.electron.getCPUUsage();
const baseUrl = await window.electron.getBaseUrl();

export { cpuData, ramData, diskData, baseUrl };
