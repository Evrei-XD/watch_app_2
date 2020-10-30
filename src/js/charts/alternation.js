(() => {
  const swap = (object) => {
    object
      .querySelector(`.page__title`)
      .classList.toggle(`page__title--enfeeble`);
    object
      .querySelector(`.page__title`)
      .classList.toggle(`page__title--squeeze`);
    object
      .querySelector(`.page__panel`)
      .classList.toggle(`page__panel--enfeeble`);
    object
      .querySelector(`.page__panel`)
      .classList.toggle(`page__panel--squeeze`);
    object.querySelector(`.container`).classList.toggle(`container--enfeeble`);
    object.querySelector(`.container`).classList.toggle(`container--squeeze`);
    object
      .querySelector(`.page__threshold`)
      .classList.toggle(`page__threshold--enfeeble`);
    object
      .querySelector(`.page__threshold`)
      .classList.toggle(`page__threshold--squeeze`);
    object.querySelector(`.page__title`).textContent =
      object.querySelector(`.page__title`).textContent.trim() === `Сжатие`
        ? `Разжатие`
        : `Сжатие`;
    drawSqueeze(squeezeGradient, squeezeLine);
    drawEnfeeble(enfeebleGradient, enfeebleLine);
  };

  const enfeeble = document.querySelector(`#left1`);
  const squeeze = document.querySelector(`#left2`);

  const enfeebleHeader = document.querySelector(`.page__panel--enfeeble`);
  const squeezeHeader = document.querySelector(`.page__panel--squeeze`);

  const f = () => {
    let tmp = screensData[0].to;
    screensData[0].to = screensData[1].to;
    screensData[1].to = tmp;
    alternate = !alternate;
    enfeebleGradient = alternate
      ? `rgba(247, 20, 71, 0.46)`
      : `rgba(20, 247, 246, 0.46)`;
    squeezeGradient = !alternate
      ? `rgba(247, 20, 71, 0.46)`
      : `rgba(20, 247, 246, 0.46)`;
    enfeebleLine = alternate ? `#ff006a` : `#00ffb8`;
    squeezeLine = !alternate ? `#ff006a` : `#00ffb8`;
    swap(enfeeble);
    swap(squeeze);
  };
  enfeebleHeader.addEventListener(`click`, f);
  squeezeHeader.addEventListener(`click`, f);
})();
