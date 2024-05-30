import { cpuData, ramData, diskData } from "../OS/main.js";
import { createDoughnutChart, createPolarAreaChart } from "../utils/plots.js";

const cpuDrawer = document.querySelector("#cpuDrawer").getContext("2d");
const ramDrawer = document.querySelector("#ramDrawer").getContext("2d");
const diskDrawer = document.querySelector("#diskDrawer").getContext("2d");

let cpuChart;
let ramChart;
let diskChart;

const updateCpuChart = async () => {
  const labels = cpuData.map((data, index) =>
    data.total !== undefined ? "Total" : `Core ${index}`,
  );
  const data = cpuData.map((data) => data.usage);

  if (cpuChart) {
    cpuChart.data.labels = labels;
    cpuChart.data.datasets[0].data = data;

    cpuChart.clear();
    cpuChart.update();
  } else {
    cpuChart = createPolarAreaChart(cpuDrawer, data, labels);
  }
};

const updateRamChart = async () => {
  const labels = ["Used", "Free"];
  const data = [ramData.used, ramData.free];

  if (ramChart) {
    ramChart.data.labels = labels;
    ramChart.data.datasets[0].data = data;

    ramChart.clear();
    ramChart.update();
  } else {
    ramChart = createDoughnutChart(ramDrawer, data, labels);
  }
};

const updateDiskChart = async () => {
  const labels = diskData.map((data) => data.directory);
  const data = diskData.map((data) => parseFloat(data.size));

  if (diskChart) {
    diskChart.data.labels = labels;
    diskChart.data.datasets[0].data = data;

    diskChart.clear();
    diskChart.update();
  } else {
    diskChart = createDoughnutChart(diskDrawer, data, labels);
  }
};

const reloadCharts = () => {
  cpuChart.resize();
  ramChart.resize();
  diskChart.resize();
};

export {
  reloadCharts,
  updateCpuChart,
  updateRamChart,
  updateDiskChart,
};
