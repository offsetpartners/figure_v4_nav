$(document).ready(function () {
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser, DropdownDivider } = Components;

  const searchBarHeight = Search.Bar.outerHeight();
  const tableHeight = Search.Table.height();
  /**
   * Click Away Listener
   */
  $(window).click(function () {
    if (Search.Table.is(":visible")) Search.Table.hide();
    // Search.Bar.outerHeight(searchBarHeight);
  });

  // MARK: Search Bar
  Search.Bar.click(function (e) {
    Search.Table.show();
    Search.Bar.focus();

    searchHeightComparison();
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  Search.Bar.on("change keydown paste input", (e) => {
    renderSearchResult(e.target.value, config.search);
    searchHeightComparison();
  });
  Search.Bar.mousedown(function () {
    if(Search.Bar.is(':focus')) return;
    Search.Icon.addClass('dark-icon');
  })
  Search.Bar.focusout(function () {
    Search.Icon.removeClass('dark-icon');
    if (Search.Table.is(":visible")) searchHeightReset();
    // Search.Bar.outerHeight(searchBarHeight);
  })
  const searchHeightComparison = function () {
    const newTableHeight = Search.Table.height();
    if(newTableHeight != tableHeight) {
      Search.Bar.outerHeight(searchBarHeight + newTableHeight);
      Search.Bar.css('padding-bottom', newTableHeight + 6 + "px");
    }
  }
  const searchHeightReset = function () {
    Search.Bar.outerHeight(searchBarHeight);
    Search.Bar.css('padding-bottom', "");
  }


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
