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
   * @param {String} input
   * @param {Array} searchData
   */
  renderSearchResult: function (input, searchData) {
    const tableLength = searchData.length > 10 ? 10 : searchData.length;
    FigureNav.Components.Search.List.empty();

    if (input.length <= 0) return;

    const data = [];
    for (i = 0; i < tableLength; i++) {
      data.push(searchData[i]);
    }

    data.forEach(function (tableData) {
      const row = FigureNav.Components.Search.ListItem(
        tableData.key,
        tableData.label
      );
      FigureNav.Components.Search.List.append(row);
    });
  },
};
