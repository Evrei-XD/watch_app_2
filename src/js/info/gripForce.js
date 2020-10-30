const setGripForce = () => {
  const gripForceBlock = document.querySelector(`.page__data--grip-force`);
  gripForceBlock.textContent = `${gripForce}%`;
};

setGripForce();
