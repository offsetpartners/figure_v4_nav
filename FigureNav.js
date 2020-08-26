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

  const searchBar = $(".dashboard-search-bar");
  const searchBarIcon = $(".figure-dashboard-search .search-icon");
  const searchTable = $("#dashboard-search-table");

  /**
   * @description Creates a Dropdown Item for Account Chooser
   * @param {String} id
   * @param {String} name
   */
  function createDropdownItem(id, name) {
    const anchor = $(`<a href="/switch-account/${id}">${name}</a>`);
    anchor.addClass("dropdown-item");
    return anchor;
  }

  const linksContainer = $(".figure-nav-links .nav");
  /**
   * @description Creates the Previous Button Component
   * @param {String} label
   */
  function createPreviousButton(label) {
    const button = $("<span></span>");
    const arrow = $('<i class="fas fa-chevron-left nav-previous-arrow"></i>');
    button.addClass("nav-prev-button");
    button.append(arrow);
    button.append(label);

    button.click(function () {
      figureNavState.activeLink.pop();
      updateNav();
    });

    return button;
  }
  /**
   * @description Creates the Nav Label Component
   * @param {String} label
   */
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

  // Helper Functions

  /**
   * @description Checks if there are active link
   * @returns {Bool}
   */
  function hasActiveLink() {
    return Boolean(
      figureNavState.activeLink &&
        Array.isArray(figureNavState.activeLink) &&
        figureNavState.activeLink.length > 0
    );
  }

  /**
   * @description Creates a URL from Active Links Array
   */
  function createURL() {
    if (!hasActiveLink()) return null;

    return "/" + figureNavState.activeLink.join("/");
  }

  /**
   * @description Recursive function that finds the current key and returns relevant
   * data to render Nav
   * @param {Array.<{key: String, label: String, children: []|null}>} array
   * @param {Array.<String>} keys
   * @param {Number} count
   * @returns { { label: String, children: Array<{key: String, label: String, children: Array}>, previousItem: String } }
   */
  function getNavLinks(array, keys, count = 0, prev = null) {
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
          const item = getNavLinks(val.children, keys, ++count, val.label);
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
   * @description Creates Nav Component
   * @param {Array.<{key: String, label: String}>} array
   * @param {String} label
   * @param {String} previousItem
   */
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
   * @description Create a Nav Item Component
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

  /**
   * @description Updates the Nav depending on the local state
   */
  function updateNav() {
    const { label, children, prevItem } = getNavLinks(
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

  /**
   * @description Creates Table View to display Search Results
   * @param {String} input
   * @param {Array} searchData
   */
  function createSearchResults(input, searchData) {
    const tableLength = searchData.length > 10 ? 10 : searchData.length;
    searchTable.empty();

    if (input.length <= 0) return;

    const data = [];
    for (i = 0; i < tableLength; i++) {
      data.push(searchData[i]);
    }

    data.forEach(function (tableData) {
      const row = createTableRow(tableData.key, tableData.label);
      searchTable.append(row);
    });
  }

  /**
   * @description Creates Search Bar Table Row Component
   * @param {String} key
   * @param {String} label
   */
  function createTableRow(key, label) {
    const tr = $("<tr></tr>");
    tr.addClass("dashboard-search-table-row");

    const td = $("<td></td>");
    td.addClass("dashboard-search-table-data");

    const anchor = $(`<a>${label}</a>`);
    anchor.attr("href", key);
    anchor.attr("target", "_blank");

    td.append(anchor);
    tr.append(td);
    return tr;
  }

  /**
   * Click Away Listener
   */
  $(window).click(function () {
    if (searchTable.is(":visible")) searchTable.hide();
  });
  
  // MARK: Search Bar
  const searchInit = [searchBar, searchBarIcon];
  searchInit.forEach(function (init) {
    init.click(function (e) {
      searchTable.show()
      searchBar.focus();
      searchBarIcon.toggleClass('dark-icon');
      // Stop propogation to allow for Click Away
      // Listener to activate
      e.stopPropagation();
    });
  });
  searchBar.focusout(function () {
    searchBarIcon.toggleClass('dark-icon');
  // }, function () {
  //   searchBarIcon.toggleClass('dark-icon');
  })

  // TODO: Use some data attribute to pull down results or
  // use fetch to display
  searchBar.on("change keydown paste input", (e) => {
    createSearchResults(e.target.value, config.search);
  });

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
