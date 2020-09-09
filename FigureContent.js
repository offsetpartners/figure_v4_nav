$(document).ready(function () {
  const { Base } = FigureContent;
  const { Components } = FigureNav;

  const { Parts } = Base;
  const { Search } = Components;

  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    // console.log($(e.target));
    // console.log(State.activeLink);
    if ($(e.target).closest("li").hasClass("dashboard-search-list-item")) {
      Parts.FigureContent.contents().empty();
      if ($(e.target).closest("li").find("a").hasClass("see-all")) {
        // console.log($(e.target).closest('li').find('a'))
        Search.Bar.val($(e.target).closest("li").find("a").text());
        const card = Parts.Col("full").append(Parts.Card);
        const fullCard = Parts.Row.append(card).addClass("search-results-card");
        // console.log(fullCard);
        Parts.FigureContent.html(fullCard);
      }
    }
    e.stopPropagation();
  });
});
