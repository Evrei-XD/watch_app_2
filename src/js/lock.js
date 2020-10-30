let locked = false;

function showLocked() {
  if (locked) {
    document
        .querySelector(`.transparent-container--locked`)
        .classList.add(`hidden`);
    document
        .querySelector(`.transparent-container--unlocked`)
        .classList.remove(`hidden`);
  } else {
    document
        .querySelector(`.transparent-container--unlocked`)
        .classList.add(`hidden`);
    document
        .querySelector(`.transparent-container--locked`)
        .classList.remove(`hidden`);
  }
}

function toggleLockStage() {
  locked = !locked;
  showLocked();
  let tmpMessage = '0xFF 0x02 0x2E 0x' + (locked ? '01' : '00');
  addBluetoothCommandToConveyor(tmpMessage + ' ' + getCrc(tmpMessage));
}

(() => {
  showLocked();
  document.querySelector(`.lock`).addEventListener(`click`, toggleLockStage);
})();
