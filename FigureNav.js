$(document).ready(function () {
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser, DropdownDivider } = Components;
  /**
   * Click Away Listener
   */
  $(window).click(function () {
    if (Search.List.is(":visible")) Search.List.hide();
  });

  // MARK: Search Bar
  Search.Bar.click(function (e) {
    Search.List.show();
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  Search.Icon.click(function (e) {
    Search.List.show();
    if (!Search.Icon.hasClass("dark-icon")) Search.Icon.addClass("dark-icon");
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  Search.Bar.on("change keydown paste input", (e) => {
    renderSearchResult(e.target.value, config.search);
  });
  Search.Bar.mousedown(function () {
    if (!Search.Bar.is(":focus")) Search.Icon.addClass("dark-icon");
  });
  Search.Bar.focusout(function () {
    Search.Icon.removeClass("dark-icon");
  });

  // MARK: Account Chooser
  AccountChooser.Button.text(config.company_name);
  if (config.accounts && Array.isArray(config.accounts)) {
    config.accounts.forEach(function (account) {
      const { id, name } = account;
      const dropdownItem = AccountChooser.DropdownItem(id, name);

      AccountChooser.Dropdown.append(dropdownItem);
    });

    // Add Divider after every Item except the last one
    $("a.dropdown-item:not(:last-child)").after(DropdownDivider);
  }

  // MARK: Links
  if (config.links && Array.isArray(config.links)) {
    const { links } = config;

    return SideBar.Body(links);
  }
});
