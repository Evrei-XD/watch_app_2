(() => {
  // Жесты
  tau.event.enableGesture(
    document.body,
    new tau.event.gesture.Swipe({ orientation: `horizontal` })
  );
  tau.event.enableGesture(
    document.body,
    new tau.event.gesture.Swipe({ orientation: `vertical` })
  );

  // Нормальный такой человеческий код
  const swipe = (evt) => {
    const swipeDirection = evt.detail.direction;
    if (navigation[page].directions[swipeDirection]) {
      if (
        navigation[page].directions[swipeDirection] === `bottom1` ||
        navigation[page].directions[swipeDirection] === `top1`
      )
        previousPage = page;
      if (
        (page === `bottom1` && swipeDirection === `down`) ||
        (page === `top1` && swipeDirection === `up`)
      )
        page = previousPage;
      else page = navigation[page].directions[swipeDirection];
    }
    triggerSendThreshold = true;
    render();
  };

  document.addEventListener(`DOMContentLoaded`, render);
  document.body.addEventListener(`swipe`, swipe);
})();
