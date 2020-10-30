$('#control-slider').roundSlider({
  handleShape: 'round',
  width: '16',
  radius: 130,
  value: controlLevel,
  handleSize: '+16',
  circleShape: 'pie',
  startAngle: 315,
  svgMode: true,
  rangeColor: `#ff00e8`,
  readOnly: true,
  sliderType: 'min-range',
  animation: false
});

$('#force-slider').roundSlider({
  handleShape: 'round',
  width: '16',
  radius: 130,
  value: controlLevel,
  handleSize: '+16',
  circleShape: 'pie',
  startAngle: 315,
  svgMode: true,
  rangeColor: `#FF5600`,
  readOnly: true,
  sliderType: 'min-range',
  animation: false
});
