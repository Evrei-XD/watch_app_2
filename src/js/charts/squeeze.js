let squeezeChart;
const drawSqueeze = (squeezeGradient, squeezeLine) => {
  const squeeze = document.getElementById('chart-squeeze');
  const ctx = squeeze.getContext(`2d`);
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, squeezeGradient);
  gradient.addColorStop(1, `transparent`);
  squeezeChart = new Chart(squeeze, {
    type: `line`,
    data: {
      labels: { length: 10 },
      datasets: [
        {
          borderColor: squeezeLine,
          fill: true,
          backgroundColor: gradient,
          borderWidth: 2,
          data: squeezeData
        }
      ]
    },
    options
  });
};

drawSqueeze(squeezeGradient, squeezeLine);
