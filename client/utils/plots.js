// Note: It might be useful to check commit bb920e9 and 9d4fedd at file OS/plots

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

/* It handles with Charts to create a doughnut given 2 arrays and a target to show the data
 *
 * @param {Object} ctx - Canvas to render Chart
 * @param {Array} data - An array with data for the Chart
 * @param {Array} labels - An array with data
 *
 * @return {Chart} A new instance of Chart.js whit a doughnut kind instance
 */
const createDoughnutChart = (ctx, data, labels) => {
  return new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          hoverBackgroundColor: COLORS,
          backgroundColor: COLORS,
          borderColor: COLORS,
        },
      ],
    },
    options: {
      responsive: false,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      tooltips: {
        mode: "index",
        enabled: false,
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

/* It handles with Charts to create a polar Area chart given 2 arrays and a target to show the data
 *
 * @param {Object} ctx - Canvas to render Chart
 * @param {Array} data - An array with data for the Chart
 * @param {Array} labels - An array with data
 *
 * @return {Chart} A new instance of Chart.js whit a polar area instance
 */
const createPolarAreaChart = (ctx, data, labels) => {
  return new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          hoverBackgroundColor: COLORS,
          backgroundColor: COLORS,
          borderColor: COLORS,
        },
      ],
    },
    options: {
      responsive: false,
      animation: {
        animateScale: true,
        animateRotate: true,
      },
      tooltips: {
        mode: "index",
        enabled: false,
        intersect: false,
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
};

export { createDoughnutChart, createPolarAreaChart };
