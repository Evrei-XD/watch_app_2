const pages = document.querySelectorAll(`.page`);
const render = () => {
  pages.forEach((item) => {
    if (item.id !== page) item.classList.add(`hidden`);
    else item.classList.remove(`hidden`);
  });
};
