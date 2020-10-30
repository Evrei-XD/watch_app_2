(() => {
  window.addEventListener('tizenhwkey', function (evt) {
    if (evt.keyName == 'back') {
      if (page === `bottom1`) page = previousPage;
      else if (page === `top1`) page = `top2`;
      else if (page === `top2`)
        tizen.application.getCurrentApplication().exit();
      else page = `top1`;
      render();
    }
  });
})();
