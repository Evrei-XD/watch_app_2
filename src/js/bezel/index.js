(() => {
  document.addEventListener(`rotarydetent`, (evt) => {
    direction = evt.detail.direction;

    slides();
    bluetooth();
    gestures();
    screens();
    moveSqueezeThreshold();
    moveEnfeebleThreshold();
  });
})();
