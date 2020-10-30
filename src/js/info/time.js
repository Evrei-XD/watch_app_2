(() => {
  const timeBlock = document.querySelector(`.page__time`);
  const setTime = () => {
    const minutesSince1970 = Math.trunc(Date.now() / 60000);
    const minutes = minutesSince1970 % 60;
    const hours =
      Math.trunc((minutesSince1970 - new Date().getTimezoneOffset()) / 60) % 24;
    timeBlock.textContent = `${hours}:${`0${minutes}`.slice(-2)}`;
  };
  setTime();
  setInterval(setTime, 1000);
})();
