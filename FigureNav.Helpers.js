FigureNav.Helpers = {
  /**
   * @description Checks if there are active link
   * @returns {Bool}
   */
  hasActiveLink: function () {
    return Boolean(
      FigureNav.State.activeLink &&
        Array.isArray(FigureNav.State.activeLink) &&
        FigureNav.State.activeLink.length > 0
    );
  },
  /**
   * @description Creates a URL from Active Links Array
   */
  createURL: function () {
    if (!this.hasActiveLink()) return null;

    return "/" + FigureNav.State.activeLink.join("/");
  },
  /**
   * @description Updates the Nav depending on the local state
   * @param {("forward"|"backward")} direction
   */
  updateSidebar: function (direction = "forward") {
    const { label, children, prevItem } = this.getSideBarData(
      config.links,
      FigureNav.State.activeLink
    );

    const Component = FigureNav.Components.SideBar.Container;
    // If it has children then
    // render them
    if (children) {
      FigureNav.Animations.sharedX(Component, direction, function () {
        // Render new nav
        FigureNav.Components.SideBar.Body(children, label, prevItem);
        // console.log(FigureNav.State.activeLink)
      });
      return;
    }

    // TODO: Actually push to URL
    alert("URL: " + this.createURL());

    // Reset
    FigureNav.State.activeLink = [];
    FigureNav.Components.SideBar.Body(config.links);
  },
  /**
   * @description Recursive function that finds the current key and returns relevant
   * data to render Sidebar
   * @param {Array.<{key: String, label: String, children: []|null}>} array
   * @param {Array.<String>} keys
   * @param {Number} count
   * @returns { { label: String, children: Array<{key: String, label: String, children: Array}>, previousItem: String } }
   */
  getSideBarData: function (array, keys, count = 0, prev = null) {
    let label = null;
    let prevItem = null;
    let children = array;

    if (count === keys.length - 1) {
      prevItem = prev;
    }

    array.forEach(function (val) {
      if (val.key === keys[count]) {
        if (val.children) {
          const item = FigureNav.Helpers.getSideBarData(
            val.children,
            keys,
            ++count,
            val.label
          );
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
  },
  /**
   * navItem interjecting custom formatting 
   * @param {Object[]} link - config destination.
   * @param {String} link[].key - config key.
   * @param {String} link[].label - config label.
   * @param {callback} navItem
   */
  navItemFormatting: function (link, navItem) {
    if (FigureNav.State.activeLink[0] == "content") {
      if (FigureNav.State.activeLink.length === 1) {
        // console.log(link.key)
        if (link.key === "analytics") {
          navItem.css("margin-bottom", "20px");
        }
      // } else if (FigureNav.State.activeLink[1] == "pages") {
        // if (link.isAvailable) {
        //   console.log(link);
        // }
      } else if (FigureNav.State.activeLink.length === 2) {
        // console.log(link.key)
        if (link.key === "content_trade") {
          navItem.css("margin-bottom", "20px");
        }
      }
    }
  },
    /**
   * Sorts Content array based on order preference and availability (isAvailable) 
   * @param {Array.<{key: String, label: String, children: []|null, available: Boolean, order: Number}>y} array
   */
  contentSort: function (array) {
    /** Sorting function if order is preset **/
    function array_move(arr, old_index, new_index) {
      if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
          arr.push(undefined);
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
      return arr; // for testing
    };
    /** Sorts alphabetically by label to start **/
    array.sort(function(a, b){
      if(a.label < b.label) { return -1; }
      if(a.label > b.label) { return 1; }
      return 0;
    })
    /** Checks if array has any calls for sorting via order_index **/
    arrayEnd = [];
    array.forEach(item => {
      if (item.order_index >= 0) {
        if(item.order_index > array.length - 1) {
          arrayEnd.push(item);
        } else {
          let order = array.length - 1;
          item.order_index > (array.length - 1) ? order = array.length - 1 : order = item.order_index;
          array_move(array, array.indexOf(item), order);
        }
      }
    });
    array.forEach(item => {
      if (item.order_index >= 0) {
        let order = array.length - 1;
        item.order_index > (array.length - 1) ? order = array.length - 1 : order = item.order_index;
        array_move(array, array.indexOf(item), order);
      }
    });
    /** Checks if array key is an available product and separates into 2 arrays if so **/
    let arrayAvailable = [];
    const arrayNotAvailable = [];
    const available = (avail) => avail.isAvailable;
    // console.log(array.some(available));
    if (array.some(available)) {
      array.forEach(e => {
        e.isAvailable ? arrayAvailable.push(e) : arrayNotAvailable.push(e);
      })
    }
    let newArray = []
    arrayNotAvailable.length > 0 ? newArray = [arrayAvailable, arrayNotAvailable] : newArray = [arrayAvailable];
    return newArray;
  },
  /**
   * Toggle Search Component State
   * @param {Boolean} active
   */
  toggleSearchState: function (active) {
    const SEARCH_DURATION = 120;
    const { Search } = FigureNav.Components;
    if (active) {
      Search.List.slideDown(SEARCH_DURATION);
      if (!Search.Bar.is(":focus")) Search.Bar.focus();
      if (!Search.Icon.hasClass("dark-icon")) Search.Icon.addClass("dark-icon");
      if (!Search.Bar.hasClass("active")) {
        Search.Package.addClass("active");
        Search.Icon.addClass("active");
        Search.Bar.addClass("active");
        Search.List.addClass("active");
        Search.Backdrop.addClass("active");
      }
    } else {
      Search.List.slideUp(SEARCH_DURATION);
      if (Search.List.is(":visible")) Search.List.hide();
      if (Search.Bar.hasClass("active")) {
        Search.Package.removeClass("active");
        Search.Icon.removeClass("active");
        Search.Bar.removeClass("active");
        Search.List.removeClass("active");
        Search.Backdrop.removeClass("active");
      }
      if (Search.Bar.is(":focus")) {
        Search.Icon.removeClass("dark-icon");
        Search.Bar.blur();
      }
    }
  },
  /**
   * @param {String} input
   * @param {Array} searchData
   */
  renderSearchResult: function (input, searchData) {
    const searchTable = searchData.links;
    // console.log(searchTable);
    let searchFilter = searchTable.filter(
      (search) => search.key != "dashboard"
    );
    let searchResults = !searchFilter ? searchFilter : searchTable;
    let tableLength = searchResults.length > 10 ? 10 : searchResults.length;
    FigureNav.Components.Search.List.empty();
    const SearchEnd = FigureNav.Components.Search.AdvancedSearch();
    SearchEnd.addClass("advanced-search");

    if (input.length <= 0) {
      FigureNav.Components.Search.List.append(SearchEnd);
      return;
    }

    const data = [];
    for (i = 0; i < tableLength; i++) {
      data.push(searchResults[i]);
    }
    // console.log(data);

    // console.log(data);
    const results = [];
    const filter = input.toUpperCase();
    // console.log(filter, input);
    for (let i = 0; i < data.length; i++) {
      const comp = data[i].label;
      var validity = 0;
      if (comp.toUpperCase().indexOf(filter) > -1) {
        validity = 1;
      } else {
        validity = checkSimilarity(comp, filter);
      }
      // Here is where we adjust the percent of closeness for input and resulting search content
      if (validity > 0.45) {
        results.push(data[i]);
        // console.log(validity);
      }
    }

    // Levenshtein distance formula for similarity in character structure, so we can account for misspellings
    function checkSimilarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (
        (longerLength - editDistance(longer, shorter)) /
        parseFloat(longerLength)
      );
    }

    function editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    };

    if (results.length > 0) {
      FigureNav.Components.Search.List.prepend(FigureNav.Components.Search.SeeAll(input));
    };

    results.forEach(function (tableData) {
      const row = FigureNav.Components.Search.ListItem(
        tableData.key,
        tableData.label
      );
      FigureNav.Components.Search.List.append(row);
    });

    FigureNav.Components.Search.List.append(SearchEnd);
  },
};
