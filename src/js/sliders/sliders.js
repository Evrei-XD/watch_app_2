let controlTimer;
let controlTimerActive = false;
let forceTimer;
let forceTimerActive = false;
let controlRequestTimer;
let forceRequestTimer;

const slides = (preRender) => {
  /*const drawControlSlider = () => drawSlider(
    document.getElementById(`control-slider`),
    {
      percentage: controlLevel,
      color: `#ff00e8`,
      shadowColor: `rgba(255, 86, 0, 0.54)`,
      shadowBlur: 22,
      pathColor: `#460032`,
      innerColor: `rgba(228, 0, 255, 0.23)`
    }
  );*/

  const drawForceSlider = () =>
    drawSlider(document.getElementById(`force-slider`), {
      percentage: gripForce,
      color: `#ff5600`,
      shadowColor: `rgba(255, 86, 0, 0.54)`,
      shadowBlur: 22,
      pathColor: `#461800`,
      innerColor: `rgba(255, 112, 0, 0.23)`
    });

  if (preRender) {
    //drawForceSlider();
    //drawControlSlider();
  }

  if (page === `right2`) {
    const delta = forceTimerActive ? 5 : 1;
    gripForce += direction === `CW` ? delta : -delta;
    gripForce = Math.max(0, Math.min(100, gripForce));
    // setGripForce();
    // drawForceSlider();
    $('#force-slider').roundSlider('setValue', gripForce);

    clearTimeout(forceTimer);
    forceTimer = setTimeout(() => {
      forceTimerActive = false;
    }, slidersDebounceTimeout);
    forceTimerActive = true;

    clearTimeout(forceRequestTimer);
    forceRequestTimer = setTimeout(() => {
      let tmpForce = ('0000' + (30 * gripForce).toString(16)).slice(-4);
      let tmpForce1 = '0x' + tmpForce.substring(0, 2);
      let tmpForce2 = '0x' + tmpForce.substring(2);
      let tmpMessage = '0xFA 0x02 0x28 ' + tmpForce1 + ' ' + tmpForce2;
      addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
    }, 400);
    
  } else if (page === `right1`) {
    const delta = controlTimerActive ? 5 : 1;
    controlLevel += direction === `CW` ? delta : -delta;
    controlLevel = Math.max(0, Math.min(100, controlLevel));
    $('#control-slider').roundSlider('setValue', controlLevel);
    
    clearTimeout(controlTimer);
    controlTimer = setTimeout(() => {
      controlTimerActive = false;
    }, slidersDebounceTimeout);
    controlTimerActive = true;

    clearTimeout(controlRequestTimer);
    controlRequestTimer = setTimeout(() => {
      let tmpLevel = '0x' + ('00' + controlLevel.toString(16)).slice(-2);
      let tmpMessage = '0xFF 0x02 0x35 ' + tmpLevel;
      addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
    }, 400);    
  }
};

slides(true);
