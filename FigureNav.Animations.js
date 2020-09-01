FigureNav.Animations = {
  /**
   * @param {jQuery} Component
   * @param {("forward"|"backward")} direction
   * @param {function} complete
   */
  sharedX: function (
    Component,
    direction = "forward",
    complete = function () {}
  ) {
    let firstLeft, secondLeft;
    const allyOpts = {
      duration: 120,
      easing: "swing",
    };
    switch (direction) {
      case "forward":
        firstLeft = -10;
        secondLeft = 10;
        break;
      case "backward":
        firstLeft = 5;
        secondLeft = -10;
        break;
    }
    Component.animate(
      {
        opacity: 0,
        marginLeft: firstLeft,
      },
      allyOpts
    )
      .animate(
        {
          marginLeft: secondLeft,
        },
        {
          ...allyOpts,
          complete,
        }
      )
      .animate(
        {
          marginLeft: 0,
          opacity: 1,
        },
        allyOpts
      );
  },
  /**
   * @param {jQuery} Component 
   * @param {Boolean} shouldHide 
   */
  containerTransform: function (Component, shouldHide) {
    const scale = shouldHide ? 0 : 1;
    const opacity = shouldHide ? "hide" : "show";
    Component.stop(true, true).animate(
      { scale, opacity },
      {
        duration: 200,
        step: function () {
          if (!shouldHide && this.scale < 0.6) {
            Component.css({
              opacity: 0,
              transform: "scale(0.6)",
            });
            return;
          }
          Component.css({
            transform: `scale(${this.scale})`,
          });
        },
        complete: function () {
          Component.css({
            transform: `scale(${scale})`,
          });
        },
      }
    );
  },
};
