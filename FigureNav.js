$(document).ready(function () {
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser, DropdownDivider } = Components;
  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    if (Search.List.is(":visible")) Search.List.hide();
    if (Search.Bar.hasClass('active')) {
      Search.Icon.removeClass('active');
      Search.Bar.removeClass('active');
      Search.List.removeClass('active');
      Search.Backdrop.removeClass('active');
    }
    if (Search.Bar.is(':focus')) {
      Search.Icon.removeClass("dark-icon");
    };
    e.stopPropagation();
  });

  // MARK: Search Bar
  Search.Bar.click(function (e) {
    Search.List.show();
    if (!Search.Bar.hasClass('active')) {
      Search.Package.addClass('active');
      Search.Icon.addClass('active');
      Search.Bar.addClass('active');
      Search.List.addClass('active');
      Search.Backdrop.addClass('active');
    }
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  Search.Icon.click(function (e) {
    Search.List.show();
    if (!Search.Bar.is(":focus")) Search.Bar.focus();
    if (!Search.Icon.hasClass("dark-icon")) Search.Icon.addClass("dark-icon");
    if(!Search.Bar.hasClass('active')) {
      Search.Package.addClass('active');
      Search.Icon.addClass('active');
      Search.Bar.addClass('active');
      Search.List.addClass('active');
      Search.Backdrop.addClass('active');
    }
    // Stop propogation to allow for Click Away
    // Listener to activate
    e.stopPropagation();
  });
  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  Search.Bar.on("change keydown paste input", (e) => {
    renderSearchResult(e.target.value, config);
    if(e.keyCode == 27) {
      // console.log(e.keyCode);
      if (Search.List.is(":visible")) Search.List.hide();
      if (Search.Bar.hasClass('active')) {
        Search.Package.removeClass('active');
        Search.Icon.removeClass('active');
        Search.Bar.removeClass('active');
        Search.List.removeClass('active');
        Search.Backdrop.removeClass('active');
      }
      if (Search.Bar.is(':focus')) {
        Search.Icon.removeClass("dark-icon");
        Search.Bar.blur();
      };
    }
    e.stopPropagation();
  });
  Search.Bar.mousedown(function (e) {
    if (!Search.Bar.is(":focus")) Search.Icon.addClass("dark-icon");
    e.stopPropagation();
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
