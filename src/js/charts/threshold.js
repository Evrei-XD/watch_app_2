let squeezeTimer;
let squeezeTimerActive = false;
let enfeebleTimer;
let enfeebleTimerActive = false;
let squeezeRequestTimer;
let enfeebleRequestTimer;

const moveSqueezeThreshold = () => {
  if (page === `left2`) {
    const delta = squeezeTimerActive ? 9 : 2;
    if (alternate) {
      enfeebleThreshold += direction === `CW` ? delta : -delta;
      enfeebleThreshold = Math.max(0, Math.min(180, enfeebleThreshold));
      document.querySelector(`.page__threshold--enfeeble`).style.top = `${
        89 + enfeebleThreshold
      }px`;
    } else {
      squeezeThreshold += direction === `CW` ? delta : -delta;
      squeezeThreshold = Math.max(0, Math.min(180, squeezeThreshold));
      document.querySelector(`.page__threshold--squeeze`).style.top = `${
        89 + squeezeThreshold
      }px`;
    }
    clearTimeout(squeezeTimer);
    squeezeTimer = setTimeout(() => {
      squeezeTimerActive = false;
    }, debounceTimeout);
    squeezeTimerActive = true;

    clearTimeout(enfeebleRequestTimer);
    enfeebleRequestTimer = setTimeout(() => {
      let tmpSqueeze = ('0000' + (16 * (180 - squeezeThreshold)).toString(16)).slice(
        -4
      );
      let tmpSqueeze1 = '0x' + tmpSqueeze.substring(0, 2);
      let tmpSqueeze2 = '0x' + tmpSqueeze.substring(2);
      let tmpMessage = '0xFA 0x02 0x26 ' + tmpSqueeze1 + ' ' + tmpSqueeze2;
      addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
    }, 400);
  }
};

const moveEnfeebleThreshold = () => {
  if (page === `left1`) {
    const delta = enfeebleTimerActive ? 9 : 2;
    if (!alternate) {
      enfeebleThreshold += direction === `CW` ? delta : -delta;
      enfeebleThreshold = Math.max(0, Math.min(180, enfeebleThreshold));
      document.querySelector(`.page__threshold--enfeeble`).style.top = `${
        89 + enfeebleThreshold
      }px`;
    } else {
      squeezeThreshold += direction === `CW` ? delta : -delta;
      squeezeThreshold = Math.max(0, Math.min(180, squeezeThreshold));
      document.querySelector(`.page__threshold--squeeze`).style.top = `${
        89 + squeezeThreshold
      }px`;
    }
    clearTimeout(enfeebleTimer);
    enfeebleTimer = setTimeout(() => {
      enfeebleTimerActive = false;
    }, debounceTimeout);
    enfeebleTimerActive = true;

    clearTimeout(squeezeRequestTimer);
    squeezeRequestTimer = setTimeout(() => {
      let tmpEnfeeble = ('0000' + (16 * (180 - enfeebleThreshold)).toString(16)).slice(
        -4
      );
      let tmpEnfeeble1 = '0x' + tmpEnfeeble.substring(0, 2);
      let tmpEnfeeble2 = '0x' + tmpEnfeeble.substring(2);
      let tmpMessage = '0xFA 0x02 0x27 ' + tmpEnfeeble1 + ' ' + tmpEnfeeble2;
      addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
    }, 400);
  }
};

document.querySelector(`#chart-enfeeble`).addEventListener(`click`, (evt) => {
  if (!alternate) {
    const chart = document.querySelector(`#chart-enfeeble`);
    enfeebleThreshold = Math.trunc(evt.clientY - chart.parentElement.offsetTop);
    document.querySelector(
      `.page__threshold--enfeeble`
    ).style.top = `${evt.clientY}px`;
  } else {
    const chart = document.querySelector(`#chart-enfeeble`);
    squeezeThreshold = Math.trunc(evt.clientY - chart.parentElement.offsetTop);
    document.querySelector(
      `.page__threshold--squeeze`
    ).style.top = `${evt.clientY}px`;
  }
  let tmpEnfeeble = ('0000' + (16 * (180 - enfeebleThreshold)).toString(16)).slice(
    -4
  );
  let tmpEnfeeble1 = '0x' + tmpEnfeeble.substring(0, 2);
  let tmpEnfeeble2 = '0x' + tmpEnfeeble.substring(2);
  let tmpMessage = '0xFA 0x02 0x27 ' + tmpEnfeeble1 + ' ' + tmpEnfeeble2;
  addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
});

document.querySelector(`#chart-squeeze`).addEventListener(`click`, (evt) => {
  if (alternate) {
    const chart = document.querySelector(`#chart-squeeze`);
    enfeebleThreshold = Math.trunc(evt.clientY - chart.parentElement.offsetTop);
    document.querySelector(
      `.page__threshold--enfeeble`
    ).style.top = `${evt.clientY}px`;
  } else {
    const chart = document.querySelector(`#chart-squeeze`);
    squeezeThreshold = Math.trunc(evt.clientY - chart.parentElement.offsetTop);
    document.querySelector(
      `.page__threshold--squeeze`
    ).style.top = `${evt.clientY}px`;
  }
  let tmpSqueeze = ('0000' + (16 * (180 - squeezeThreshold)).toString(16)).slice(-4);
  let tmpSqueeze1 = '0x' + tmpSqueeze.substring(0, 2);
  let tmpSqueeze2 = '0x' + tmpSqueeze.substring(2);
  let tmpMessage = '0xFA 0x02 0x26 ' + tmpSqueeze1 + ' ' + tmpSqueeze2;
  addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
});
