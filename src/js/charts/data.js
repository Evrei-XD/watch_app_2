const updateSqueezeData = (newValue) => {
  if (squeezeData.length >= 10) {
    squeezeData.shift();
  }
  squeezeData.push(newValue);
  squeezeChart.update(0);
};

const updateEnfeebleData = (newValue) => {
  if (enfeebleData.length >= 10) {
    enfeebleData.shift();
  }
  enfeebleData.push(newValue);
  enfeebleChart.update(0);
};
