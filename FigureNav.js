$(document).ready(function () {
  // State
  const figureNavState = {
    activeLink: [],
  };

  // Activates Search Bar
  var searchStarters = ['.btn-dashboard-search', '.search-icon'];
  searchStarters.forEach(search => {
    $(search).click(e => {
      console.log(e)
      var $this = $(e.target).closest('.figure-dashboard-search').find('.btn-dashboard-search');
      var $figSearchInput = $this.closest('.figure-dashboard-search').find('.dashboard-search-bar');
      var $figSearchTable = $this.closest('.figure-dashboard-search').find('#dashboard-search-table');
      var $figSearchButton = $this;
      if($figSearchInput.hasClass('d-none')) {
        $figSearchInput.removeClass('d-none');
      }
      if($figSearchTable.hasClass('d-none')) {
        $figSearchTable.removeClass('d-none');
      }
      if(!$figSearchButton.hasClass('d-none')) {
        $figSearchButton.addClass('d-none');
      }
      $figSearchInput.focus();
    })
  })
  // Deactivates Search Bar
  $('.dashboard-search-bar').focusout(e => {
    var text = $(e.target).val();
    if(text == ""){
      text = "Search...";
    }
    var $searchButton = $(e.target).siblings('.btn-dashboard-search');
    var $searchTable = $(e.target).siblings('#dashboard-search-table');
    $searchButton.text(text);
    if($(e.target.nextElementSibling).closest('table').attr('id') == 'dashboard-search-table') {
      console.log('stay')
    } else {
      console.log($(e.target.nextElementSibling))
      if(!$(e.target).hasClass('d-none')){
        $(e.target).addClass('d-none');
      }
      if($searchButton.hasClass('d-none')){
        $searchButton.removeClass('d-none');
      }
      if(!$searchTable.hasClass('d-none')){
        $searchTable.addClass('d-none');
      }
    }
  })

  function createSearchResults(input, searchData) {
    var tableLength;
    if(searchData.length > 10) {
      tableLength = 10;
    } else {
      tableLength = searchData.length;
    }
    var data = [];
    data.length = tableLength;
    if(input.length > 0){
      for(i = 0; i < tableLength; i++) {
        data[i] = searchData[i];
      }
    }
    $('#dashboard-search-table').empty();
    data.forEach(tableData => {
      const searchTableRow = $(`
      <tr class="dashboard-search-table-row">
        <td class="dashboard-search-table-data">
          <a target="_blank" href="${tableData.key}">${tableData.label}</a>
        </td>
      </tr>`);
      $('#dashboard-search-table').append(searchTableRow);
    })
  }
  $('.dashboard-search-bar').on('change keydown paste input', e => {
    console.log('hit')
    createSearchResults($(e.target).val(), config.search)
  })
  $('.dashboard-search-table-data').click(e => {
    var link = $(e.target).find('a').attr('href');
    window.open(link);
  })

  // Components
  const dropdownDivider = $('<div class="dropdown-divider"></div>');

  const accountChooserButton = $("#figure-nav-account-chooser");
  const accountChooserDropdown = $(
    ".figure-nav-account-dropdown .dropdown-menu"
  );
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
    const arrow = $(
      '<i class="fas fa-chevron-left nav-previous-arrow"></i>'
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
