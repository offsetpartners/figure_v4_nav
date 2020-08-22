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

  const linksContainer = $(".figure-nav-links .nav");

  // Helper Functions
  function hasActiveLink() {
    return Boolean(
      figureNavState.activeLink &&
        Array.isArray(figureNavState.activeLink) &&
        figureNavState.activeLink.length > 0
    );
  }

  /**
   * Creates a URL from Active Links Array
   */
  function createURL() {
    if (!hasActiveLink()) return null;

    return "/" + figureNavState.activeLink.join("/");
  }

  /**
   * Recursive function that finds the current key and returns relevant
   * data to render Nav
   * @param {Array.<{key: String, label: String, children: []|null}>} array
   * @param {Array.<String>} keys
   * @param {Number} count
   */
  function getNavItem(array, keys, count = 0, prev = null) {
    let label = null;
    let prevItem = null;
    let children = array;

    if (count === keys.length - 1) {
      prevItem = prev;
    }

    array.forEach(function (val) {
      if (val.key === keys[count]) {
        if (val.children) {
          // const newPrev = prev.concat([val.label]);
          const item = getNavItem(val.children, keys, ++count, val.label);
          children = item.children;
          label = item.label || val.label;
          prevItem = prevItem || item.prevItem;
        } else {
          children = null;
        }
      }
    });

    if (keys && keys.length === 1) prevItem = "Home";

    return {
      label,
      children,
      prevItem,
    };
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

  function updateNav() {
    const { label, children, prevItem } = getNavItem(
      config.links,
      figureNavState.activeLink
    );

    // If it has children then
    // render them
    if (children) {
      // Render new nav
      createNav(children, label, prevItem);
      return;
    }

    // TODO: Actually push to URL
    alert("URL: " + createURL());

    // Reset
    figureNavState.activeLink = [];
    createNav(config.links);
  }

  function createPreviousButton(label) {
    const button = $("<span></span>");
    const arrow = $(
      '<i class="fas fa-chevron-left" style="margin-right: 10px;"></i>'
    );
    button.addClass("nav-prev-button");
    button.append(arrow);
    button.append(label);

    button.click(function () {
      figureNavState.activeLink.pop();
      updateNav();
    });

    return button;
  }

  function createNavLabel(label) {
    let text;
    if (!hasActiveLink()) {
      text = $(`<h5><span>${label}</span></h5>`);
    } else {
      text = $(`<p><span>${label}</span></p>`);
    }
    text.addClass("nav-label");

    return text;
  }

  function createNav(array, label, previousItem) {
    if (!array || !Array.isArray(array)) return;
    // Empty Links
    linksContainer.empty();
    if (previousItem) {
      const button = createPreviousButton(previousItem);
      linksContainer.append(button);
    }

    if (label) {
      const title = $(`<h5>${label}</h5>`);
      title.addClass("nav-prev-header");
      linksContainer.append(title);
    }

    return array.map(function (link) {
      const { key, label } = link;

      const navItem = createNavItem(key, label);

      linksContainer.append(navItem);
    });
  }

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
    const text = createNavLabel(label);
    item.append(link);
    link.append(text);

    item.click(function (e) {
      figureNavState.activeLink.push(key);
      updateNav();
    });

    return item;
  }

  // MARK: Account Chooser
  accountChooserButton.text(config.company_name);
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

    return createNav(links);
  }
});
