(() => {
  document
    .querySelector(`.screens__selected-screen`)
    .addEventListener(`click`, () => {
      const tmp =
        (screensData.length + (screen % screensData.length)) %
        screensData.length;
      page = screensData[tmp].to;
      render();
    });
})();
