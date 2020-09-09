$(document).ready(function () {
  const ACCOUNT_CHOOSER_DURATION = 180;
  const { Helpers, Components } = FigureNav;

  const { renderSearchResult } = Helpers;
  const { Search, AccountChooser, Notifications, Help, Profile } = Components;

  Helpers.readURL();

  /**
   * Click Away Listener
   */
  $(window).mousedown(function (e) {
    Helpers.toggleSearchState();
    e.stopPropagation();
  });

  /**
   * Click Away Listener - stop dropdown menu close on internal click
   */
  $(".dropdown-menu").click(function (e) {
    console.log($(e.target));
    if (e.target.tagName == "A") return;
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
  AccountChooser.Button.prepend(`<p>${config.company_name}</p>`);
  if (config.accounts && Array.isArray(config.accounts)) {
    config.accounts.forEach(function (account) {
      const { id, name } = account;
      const dropdownItem = AccountChooser.DropdownItem(id, name);

      AccountChooser.DropdownMenu.append(dropdownItem);
    });
  }

  // MARK: Notifications
  if (config.notifications_list && Array.isArray(config.notifications_list)) {
    const title = Notifications.Title("Notifications");
    Notifications.DropdownMenu.prepend(title);
    var alertNoteCount = 0;
    const sortedNotifications = config.notifications_list
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date));
    sortedNotifications.forEach(function (note) {
      const { id, name, date } = note;
      const dropdownItem = Notifications.DropdownItem(id, name, date);
      if (Notifications.DayCheck(note.date)) alertNoteCount++;
      Notifications.DropdownMenuList.append(dropdownItem);
    });
    if (alertNoteCount > 0) Notifications.Button.append(Notifications.Alert);
  }

  // MARK: Help
  if (config.help_doc && Array.isArray(config.help_doc)) {
    const title = Help.Title("Help");

    Help.DropdownMenu.append(title);

    config.help_doc.forEach(function (help) {
      const { key, label, order_index } = help;
      const dropdownItem = Help.DropdownItem(key, label);

      Help.DropdownMenu.append(dropdownItem);
    });
  }

  // MARK: Profile
  if (config.user_info && Array.isArray(config.user_info)) {
    config.user_info.forEach(function (detail) {
      if (detail.key === "user_details") {
        const d = detail.details;
        Components.Profile.Icon.append(`${d.first_name[0]}${d.last_name[0]}`);
        const title = Profile.UserDetails(
          d.first_name,
          d.last_name,
          d.email,
          d.position
        );
        Profile.DropdownMenu.append(title);
      }
    });
    config.user_info.forEach(function (detail) {
      if (detail.key !== "user_details") {
        const { key, label, order_index } = detail;
        const dropdownItem = Profile.DropdownItem(key, label);

        Profile.DropdownMenu.append(dropdownItem);
      }
    });
  }

  // Handle Dropdown interactions
  const DropdownHandlers = [AccountChooser, Notifications, Help, Profile];
  DropdownHandlers.forEach((Handler) => {
    Handler.Dropdown.on("show.bs.dropdown", function (e) {
      Handler.DropdownMenu.slideDown(ACCOUNT_CHOOSER_DURATION);
    });

    Handler.Dropdown.on("hide.bs.dropdown", function (e) {
      Handler.DropdownMenu.slideUp(ACCOUNT_CHOOSER_DURATION);
    });
  });

  // MARK: Links
  Helpers.updateSidebar();
});
