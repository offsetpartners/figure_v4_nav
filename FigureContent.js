$(document).ready(function () {
  const { Base } = FigureContent;
  const { Components } = FigureNav;
  
  const { Parts } = Base;
  const { Search } = Components;

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
    $('#figure-content').height(renderHeight);
    $('#figure-content').width(renderWidth);
  }
  renderSizeAdjust();
  $(window).resize( () => {
    renderSizeAdjust();
  });


  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    // console.log($(e.target));
    if ($(e.target).closest('li').hasClass('dashboard-search-list-item')) {
      Parts.FigureContent.contents().empty();
      if ($(e.target).closest('li').find('a').hasClass('see-all') || $(e.target).closest('li').find('a').hasClass('advanced-link')) {
        // console.log($(e.target).closest('li').find('a'))
        Search.Bar.val($(e.target).closest('li').find('a').text())
        const card = Parts.Col("full").append(Parts.Card);
        const fullCard = Parts.Row
          .append(card)
          .addClass('search-results-card');
        // console.log(fullCard);
        Parts.FigureContent.html(fullCard);
      }
      // FigureNav.State.activeLink = 
    }
    // console.log(FigureNav.State.activeLink);
    e.stopPropagation();
  });

});