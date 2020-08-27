FigureNav.Components = {
  DropdownDivider: $('<div class="dropdown-divider"></div>'),

  AccountChooser: {
    Button: $("#figure-nav-account-chooser"),
    Dropdown: $(".figure-nav-account-dropdown .dropdown-menu"),
    /**
     * @param {String} id
     * @param {String} name
     */
    DropdownItem: function (id, name) {
      const anchor = $(`<a href="/switch-account/${id}">${name}</a>`);
      anchor.addClass("dropdown-item");
      return anchor;
    },
  },

  SideBar: {
    Container: $(".figure-nav-links .nav"),
    /**
     * @param {String} label
     */
    PreviousButton: function (label) {
      const button = $("<span></span>");
      const arrow = $('<i class="fas fa-chevron-left nav-previous-arrow"></i>');
      button.addClass("nav-prev-button");
      button.append(arrow);
      button.append(label);

      button.click(function () {
        FigureNav.State.activeLink.pop();
        FigureNav.Helpers.updateSidebar();
      });

      return button;
    },
    /**
     * @param {String} label
     */
    Header: function (label) {
      let text;
      if (!FigureNav.Helpers.hasActiveLink()) {
        text = $(`<h5><span>${label}</span></h5>`);
      } else {
        text = $(`<p><span>${label}</span></p>`);
      }
      text.addClass("nav-label");

      return text;
    },
    /**
     * @param {Array.<{key: String, label: String}> array
     * @param {String} label
     * @param {String} previousItem
     */
    Body: function (array, label, previousItem) {
      if (!array || !Array.isArray(array)) return;
      // Empty Links
      this.Container.empty();
      if (previousItem) {
        const button = FigureNav.Components.SideBar.PreviousButton(
          previousItem
        );
        this.Container.append(button);
      }

      if (label) {
        const title = $(`<h5>${label}</h5>`);
        title.addClass("nav-prev-header");
        this.Container.append(title);
      }

      return array.map(function (link) {
        const { key, label } = link;

        const navItem = FigureNav.Components.SideBar.Item(key, label);

        FigureNav.Components.SideBar.Container.append(navItem);
      });
    },
    /**
     * @param {String} key
     * @param {String} label
     */
    Item: function (key, label) {
      const item = $(`<li></li>`);
      item.addClass("nav-item");
      const link = $(`<a></a>`);
      link.addClass("nav-link");
      const text = this.Header(label);
      item.append(link);
      link.append(text);

      item.click(function (e) {
        FigureNav.State.activeLink.push(key);
        FigureNav.Helpers.updateSidebar();
      });

      return item;
    },
  },

  Search: {
    Icon: $(".figure-dashboard-search .search-icon"),
    Bar: $(".dashboard-search-bar"),
    Table: $("#dashboard-search-table"),
    /**
     * @param {String} key
     * @param {String} label
     */
    TableRow: function (key, label) {
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
  },
};
