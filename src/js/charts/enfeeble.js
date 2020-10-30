let enfeebleChart;
const drawEnfeeble = (enfeebleGradient, enfeebleLine) => {
  const enfeeble = document.getElementById('chart-enfeeble');
  const ctx = enfeeble.getContext(`2d`);
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, enfeebleGradient);
  gradient.addColorStop(1, `transparent`);
  enfeebleChart = new Chart(enfeeble, {
    type: `line`,
    data: {
      labels: { length: 10 },
      datasets: [
        {
          borderColor: enfeebleLine,
          fill: true,
          backgroundColor: gradient,
          borderWidth: 2,
          data: enfeebleData
        }
      ]
    },
    options
  });
};

drawEnfeeble(enfeebleGradient, enfeebleLine);
