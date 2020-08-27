$(document).ready(function () {
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser, DropdownDivider } = Components;
  /**
   * Click Away Listener
   */
  $(window).click(function () {
    if (Search.Table.is(":visible")) Search.Table.hide();
  });
  
  // MARK: Search Bar
  Search.Bar.click(function (e) {
    Search.Table.show();
    Search.Bar.focus();
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  Search.Bar.mousedown(function () {
    if(Search.Bar.is(':focus')) return;
    Search.Icon.addClass('dark-icon');
  })
  Search.Bar.focusout(function () {
    Search.Icon.removeClass('dark-icon');
  })

  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  Search.Bar.on("change keydown paste input", (e) => {
    renderSearchResult(e.target.value, config.search);
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
