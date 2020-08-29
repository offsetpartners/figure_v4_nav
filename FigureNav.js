$(document).ready(function () {
  const ACCOUNT_CHOOSER_DURATION = 180;
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser } = Components;

  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    Helpers.toggleSearchState();
    e.stopPropagation();
  });

  // MARK: Search Bar
  Search.Bar.click(function (e) {
    Helpers.toggleSearchState(true);
    e.stopPropagation();
  });
  Search.Icon.click(function (e) {
    Helpers.toggleSearchState(true);
    e.stopPropagation();
  });
  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  Search.Bar.on("input change keydown", (e) => {
    renderSearchResult(e.target.value, config);
    if (e.keyCode == 27) {
      Helpers.toggleSearchState();
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
