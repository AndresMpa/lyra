const os = require("os");

// Function to get CPU usage for the current process
function getProcessCpuUsage() {
  const cpuUsage = process.cpuUsage();
  const cpuUsagePercent =
    (cpuUsage.user + cpuUsage.system) / (os.cpus().length * 10000); // Convert to percentage
  return cpuUsagePercent.toFixed(2); // Return CPU usage percentage with 2 decimal places
}

// Example usage
const usagePercent = getProcessCpuUsage();
console.log(`Current process CPU usage: ${usagePercent}%`);
