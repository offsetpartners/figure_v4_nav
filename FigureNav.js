$(document).ready(function () {
  // State
  const figureNavState = {
    activeLink: [],
  };

  // Components
  const dropdownDivider = $('<div class="dropdown-divider"></div>');

  const accountChooserButton = $("#figure-nav-account-chooser");
  const accountChooserDropdown = $(
    ".figure-nav-account-dropdown .dropdown-menu"
  );

  const linksContainer = $(".figure-nav-links ul");

  // Helper Functions
  function hasActiveLink() {
    return Boolean(
      figureNavState.activeLink &&
        Array.isArray(figureNavState) &&
        figureNavState.length > 0
    );
  }

  /**
   * Creates a Dropdown Item for Account Chooser
   * @param {String} id
   * @param {String} name
   */
  function createDropdownItem(id, name) {
    const anchor = $(`<a href="/switch-account/${id}">${name}</a>`);
    anchor.addClass("dropdown-item");
    return anchor;
  }

  function createNav(array) {
    if (!array || !Array.isArray(array)) return;

    return array.map(function (link) {
      const { key, label } = link;

      const navItem = createNavItem(key, label);

      linksContainer.append(navItem);
    });
  }

  // MARK: Account Chooser

  accountChooserButton.text(config.company_name);

  /**
   * Create a Nav Item
   * @param {String} key
   * @param {String} label
   */
  function createNavItem(key, label) {
    const item = $(`<li></li>`);
    item.addClass("nav-item");
    const link = $(`<a></a>`);
    link.addClass("nav-link");
    const text = $(`<h5><span>${label}</span></h5>`);
    text.addClass("nav-label");
    item.prepend(link);
    link.prepend(text);

    return item;
  }

  if (config.accounts && Array.isArray(config.accounts)) {
    config.accounts.forEach(function (account) {
      const { id, name } = account;
      const dropdownItem = createDropdownItem(id, name);

      accountChooserDropdown.append(dropdownItem);
    });

    // Add Divider after every Item except the last one
    $("a.dropdown-item:not(:last-child)").after(dropdownDivider);
  }

  // MARK: Links
  if (config.links && Array.isArray(config.links)) {
    const { links } = config;

    // if (hasActiveLink()) {
    //   const { activeLink } = figureNavState;
    // }

    return createNav(links);
  }
});
