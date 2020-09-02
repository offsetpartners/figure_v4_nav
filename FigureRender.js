$(document).ready(function () {

  const { Base } = FigureRender;
  const { Parts } = Base;

  /**
   * Window Render Sizing
   */
  const renderSizeAdjust = function () {
    let sideNavWidth = $('.figure-nav').outerWidth();
    let topNavHeight = $('.figure-top-nav').outerHeight();
    let pageWidth = $('body').outerWidth();
    let pageHeight = $('body').outerHeight();
    let renderWidth = pageWidth - sideNavWidth;
    let renderHeight = pageHeight - topNavHeight;
    // console.log(sideNavWidth, topNavHeight, pageWidth, pageHeight, renderWidth, renderHeight);
    $('#figure-render').height(renderHeight);
    $('#figure-render').width(renderWidth);
  }
  renderSizeAdjust();
  $(window).resize( () => {
    renderSizeAdjust();
  });


  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    console.log($(e.target));
    console.log($(e.target).closest('li'));
    if($(e.target).closest('li').hasClass('dashboard-search-list-item')) {
      console.log($(e.target).closest('li').find('a'));
      if($(e.target).closest('li').find('a').hasClass('see-all') || $(e.target).closest('li').find('a').hasClass('advanced-link')) {
        console.log($(e.target).closest('li').find('a'))
        const card = Parts.Col("full").append(Parts.Card);
        const fullCard = Parts.Row
          .append(card)
          .addClass('search-results-card');
        console.log(fullCard);
        Parts.FigureRender.html(fullCard);
      }
      // FigureNav.State.activeLink = 
    }
    console.log(FigureNav.State.activeLink);
    e.stopPropagation();
  });

});