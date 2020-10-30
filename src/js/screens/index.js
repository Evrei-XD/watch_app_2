const screens = () => {
  if (page === `bottom1`) {
    screen += direction === `CW` ? 1 : -1;

    const image = document.querySelector(`.screens__selected-screen`);
    const tmp =
      (screensData.length + (screen % screensData.length)) % screensData.length;

    image.src = screensData[tmp].src;

    const images = document.querySelectorAll(`.screens__screen`);
    images.forEach((item, index) => {
      if (tmp === index) item.classList.add(`screens__screen--selected`);
      else item.classList.remove(`screens__screen--selected`);
    });

    const title = document.querySelector(`.page__title.page__title--screens`);
    title.textContent = screensData[tmp].title;
    title.style.color = screensData[tmp].color;
    title.style.textShadow = `0 0 30px ${screensData[tmp].color}`;

    const panel = document.querySelector(`.page__panel--screens`);
    panel.style.boxShadow = `0 50px 200px ${screensData[tmp].shadow}`;

    const dots = document.querySelectorAll(`.navigation__dot`);
    dots.forEach((item, index) => {
      if (tmp === index) item.classList.add(`navigation__dot--selected`);
      else item.classList.remove(`navigation__dot--selected`);
    });
  }
};
