FigureRender.Base = {
  Parts: {
    FigureRender: $('#figure-render'),
    Row: $('<div class="row figure-row"></div>'),
    /**
     * @param {String} wide
     */
    /** wide = [one-quarter, one-third, half, two-thirds, three-quarters, full] **/
    Col: function (wide) {
      switch(wide) {
        case "one-quarter":
        case "1/4":
          return $(`<div class="col-md-3"></div>`);
        case "one-third":
        case "1/3":
          return $(`<div class="col-md-4"></div>`);
        case "one-half":
        case "half":
        case "1/2":
          return $(`<div class="col-md-6"></div>`);
        case "two-thirds":
        case "2/3":
          return $(`<div class="col-md-8"></div>`);
        case "three-quarters":
        case "3/4":
          return $(`<div class="col-md-9"></div>`);
        case "full":
        case "entire":
        case "whole":
        case "one":
          return $(`<div class="col-md-12"></div>`);
      }
    },
    Card: $('<div class="card figure-card"></div>'),
  },
}