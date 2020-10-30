const gestures = () => {
  if (page === `center`) {
    const selector = document.querySelector(`.gestures__select-wrapper`);
    gesture += direction === `CW` ? 1 : -1;
    const round = Math.floor(gesture / gesturesSrcAndSource.length);
    const tmp =
      (gesturesSrcAndSource.length + (gesture % gesturesSrcAndSource.length)) %
      gesturesSrcAndSource.length;
    selector.style.transform = `rotate(${
      gesturesSrcAndSource[tmp].angle + 360 * round
    }deg)`;

    const image = document.querySelector(`.gestures__selected-gesture`);
    image.src = gesturesSrcAndSource[tmp].src;

    const title = document.querySelector(`.gestures__title`);
    title.textContent = gesturesSrcAndSource[tmp].name;

    const name = document.querySelector(`.page__data--gesture`);
    name.textContent = gesturesSrcAndSource[tmp].name;

    idCurrentGesture =
      (gesturesSrcAndSource.length + (gesture % gesturesSrcAndSource.length)) %
      gesturesSrcAndSource.length;
    let tmpMessage = '0xFA 0x02 0x34 0x' + ('00' + idCurrentGesture.toString(16)).slice(-2);
    addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
    let tmpValue = ('00' + (2 + 3 * idCurrentGesture).toString(16)).slice(-2);
    tmpMessage = '0xFF 0x02 0x14 0x' + tmpValue;
    addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
  }
};
