$(document).ready(function () {
  const SEARCH_DURATION = 120;
  const ACCOUNT_CHOOSER_DURATION = 180;
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser } = Components;
  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    if (Search.List.is(":visible")) {
      Search.List.slideUp(SEARCH_DURATION);
    }
    if (Search.Bar.hasClass("active")) {
      Search.Icon.removeClass("active");
      Search.Bar.removeClass("active");
      Search.List.removeClass("active");
      Search.Backdrop.removeClass("active");
    }
    if (Search.Bar.is(":focus")) {
      Search.Icon.removeClass("dark-icon");
    }
    e.stopPropagation();
  });

  // MARK: Search Bar
  Search.Bar.click(function (e) {
    Search.List.slideDown(SEARCH_DURATION);
    if (!Search.Bar.hasClass("active")) {
      Search.Package.addClass("active");
      Search.Icon.addClass("active");
      Search.Bar.addClass("active");
      Search.List.addClass("active");
      Search.Backdrop.addClass("active");
    }
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  Search.Icon.click(function (e) {
    Search.List.slideDown(SEARCH_DURATION);
    if (!Search.Bar.is(":focus")) Search.Bar.focus();
    if (!Search.Icon.hasClass("dark-icon")) Search.Icon.addClass("dark-icon");
    if (!Search.Bar.hasClass("active")) {
      Search.Package.addClass("active");
      Search.Icon.addClass("active");
      Search.Bar.addClass("active");
      Search.List.addClass("active");
      Search.Backdrop.addClass("active");
    }
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  Search.Bar.on("keydown input change value", (e) => {
    renderSearchResult(e.target.value, config);
    // Pushing esc key:
    if (e.keyCode == 27) {
      // console.log(e.keyCode);
      // if (Search.List.is(":visible")) Search.List.hide();
      if (Search.List.is(":visible")) {
        Search.List.slideUp(SEARCH_DURATION);
      }
      if (Search.Bar.hasClass("active")) {
        Search.Package.removeClass("active");
        Search.Icon.removeClass("active");
        Search.Bar.removeClass("active");
        Search.List.removeClass("active");
        Search.Backdrop.removeClass("active");
      }
      if (Search.Bar.is(":focus")) {
        Search.Icon.removeClass("dark-icon");
        Search.Bar.blur();
      }
    }
    e.stopPropagation();
  });
  Search.Bar.mousedown(function (e) {
    if (!Search.Bar.is(":focus")) Search.Icon.addClass("dark-icon");
    e.stopPropagation();
  });

  // MARK: Account Chooser
  AccountChooser.Button.prepend(config.company_name);
  if (config.accounts && Array.isArray(config.accounts)) {
    config.accounts.forEach(function (account) {
      const { id, name } = account;
      const dropdownItem = AccountChooser.DropdownItem(id, name);

      AccountChooser.DropdownMenu.append(dropdownItem);
    });
  }

  // Handle Droddown interactions
  AccountChooser.Dropdown.on("show.bs.dropdown", function (e) {
    AccountChooser.DropdownMenu.slideDown(ACCOUNT_CHOOSER_DURATION);
  });

  AccountChooser.Dropdown.on("hide.bs.dropdown", function (e) {
    AccountChooser.DropdownMenu.slideUp(ACCOUNT_CHOOSER_DURATION);
  });

  // MARK: Links
  if (config.links && Array.isArray(config.links)) {
    const { links } = config;

    return SideBar.Body(links);
  }
});
