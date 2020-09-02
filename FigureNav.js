$(document).ready(function () {
  const ACCOUNT_CHOOSER_DURATION = 180;
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, SideBar, AccountChooser, Notifications } = Components;

  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    Helpers.toggleSearchState();
    // console.log(Search.ListItemLink);
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
    // Pushing esc key:
    if (e.keyCode == 27) {
      Helpers.toggleSearchState();
    }
    e.stopPropagation();
  });

  // Changes search icon to dark color when search bar is focused 
  // with white background 
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
  
  // MARK: Notifications
  if (config.notifications_list && Array.isArray(config.notifications_list)) {
    var alertNoteCount = 0;
    const sortedNotifications = config.notifications_list.slice().sort((a, b) => (new Date(b.date)) - (new Date(a.date)));
    sortedNotifications.forEach(function (note) {
      const { id, name, date } = note;
      const dropdownItem = Notifications.DropdownItem(id, name, date);
      if (Notifications.DayCheck(note.date)) alertNoteCount++;
      Notifications.DropdownMenuList.append(dropdownItem);
    });
    if (alertNoteCount > 0) Notifications.Button.append(Notifications.Alert);
  }

  // Handle Dropdown interactions
  const DropdownHandlers = [AccountChooser, Notifications];
  DropdownHandlers.forEach(Handler => {
    Handler.Dropdown.on("show.bs.dropdown", function (e) {
      Handler.DropdownMenu.slideDown(ACCOUNT_CHOOSER_DURATION);
    });
  
    Handler.Dropdown.on("hide.bs.dropdown", function (e) {
      Handler.DropdownMenu.slideUp(ACCOUNT_CHOOSER_DURATION);
    });
  });

  // MARK: Links
  if (config.links && Array.isArray(config.links)) {
    const { links } = config;

    return SideBar.Body(links);
  }
});

