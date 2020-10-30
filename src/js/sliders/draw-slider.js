const drawSlider = (canvas, props) => {
  const scale = 1;

  const width = canvas.width;
  const height = canvas.height;
  canvas.height = scale * height;
  canvas.width = scale * width;
  canvas.style.height = `${height}px`;
  canvas.style.width = `${width}px`;

  const ctx = canvas.getContext('2d');

  const circleRadius = 136 * scale;
  const circleCenter = Math.ceil(canvas.width / 2);

  const radians = (degrees) => (degrees * Math.PI) / 180;

  const drawInnerFill = (props) => {
    const { color } = props;

    ctx.beginPath();
    ctx.arc(
      circleCenter,
      circleCenter,
      circleRadius - 8 * scale,
      0,
      2 * Math.PI
    );
    const gradient = (ctx.fillStyle = ctx.createLinearGradient(
      0,
      0,
      0,
      (circleRadius - 8) * scale
    ));
    gradient.addColorStop(0, color);
    gradient.addColorStop(1, `transparent`);
    ctx.fillStyle = gradient;
    ctx.fill();
    ctx.closePath();
  };

  const drawArc = (props) => {
    const { color, shadowColor, shadowBlur, percentage } = props;

    const startAngle = 150;
    ctx.shadowColor = shadowColor;
    ctx.shadowBlur = shadowBlur * scale;
    ctx.strokeStyle = color;
    ctx.lineWidth = 16 * scale;
    ctx.lineCap = `round`;
    ctx.beginPath();
    ctx.arc(
      circleCenter,
      circleCenter,
      circleRadius,
      radians(startAngle),
      radians(startAngle + 2.4 * percentage)
    );
    ctx.stroke();
    ctx.closePath();
  };

  const drawDot = (props) => {
    const { percentage } = props;

    const angle = radians((percentage * 120) / 50 - 30);
    const centerX = Math.cos(angle) * circleRadius;
    const centerY = Math.sin(angle) * circleRadius;

    ctx.beginPath();
    ctx.shadowColor = `rgba(0, 0, 0, 0.86)`;
    ctx.shadowBlur = 16 * scale;
    ctx.arc(
      circleCenter - centerX,
      circleCenter - centerY,
      8 * scale,
      0,
      2 * Math.PI
    );
    ctx.stroke();
    ctx.closePath();
  };

  const drawText = (props) => {
    const { percentage, color } = props;
    ctx.fillStyle = color;
    ctx.font = `500 ${60 * scale}px Roboto`;
    ctx.textAlign = `center`;
    ctx.fillText(` ${percentage}%`, circleCenter, circleCenter + 10 * scale);
    ctx.closePath();
  };

  const drawSlider = (props) => {
    const {
      percentage,
      shadowColor,
      shadowBlur,
      color,
      pathColor,
      innerColor
    } = props;

    ctx.clearRect(0, 0, 360, 360);
    drawInnerFill({ color: innerColor });
    drawArc({ percentage: 100, color: pathColor });
    drawArc({ percentage, color, shadowBlur, shadowColor });
    drawDot({ percentage, color, radius: 18 });
    drawText({ percentage, color });
  };

  drawSlider(props);
};
