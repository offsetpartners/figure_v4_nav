FigureNav.Components = {
  AccountChooser: {
    Button: $("#figure-nav-account-chooser"),
    Dropdown: $(".figure-nav-account-dropdown"),
    DropdownMenu: $(".figure-nav-account-dropdown .dropdown-menu"),
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
      const arrow = $(
        '<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/> </svg>'
      );
      arrow.addClass("nav-previous-arrow ");
      button.addClass("nav-prev-button");
      button.addClass("d-flex");
      button.addClass("align-items-center");
      button.append(arrow);
      button.append(label);

      button.click(function () {
        FigureNav.State.activeLink.pop();
        FigureNav.Helpers.updateSidebar("backward");
      });

      return button;
    },
    /**
     * @param {String} label
     */
    Label: function (label) {
      let text;
      if (!FigureNav.Helpers.hasActiveLink()) {
        text = $("<h5></h5>");
      } else {
        text = $("<p></p>");
      }
      text.addClass("nav-label");
      text.append(`<span>${label}</span>`);

      return text;
    },
    /**
     * @param {Array.<{key: String, label: String}> array
     * @param {String} label
     * @param {String} previousItem
     */
    Body: function (array, label, previousItem) {
      if (!array || !Array.isArray(array)) return;
      if (FigureNav.Helpers.hasActiveLink()) {
        this.Container.css({ marginTop: "22px" });
      } else {
        this.Container.css({ marginTop: "92px" });
      }

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
      const text = this.Label(label);
      item.append(link);
      link.append(text);

      link.click(function (e) {
        FigureNav.State.activeLink.push(key);
        FigureNav.Helpers.updateSidebar("forward");
      });

      return item;
    },
  },

  Search: {
    Package: $(".figure-dashboard-search"),
    Icon: $(".figure-dashboard-search .search-icon"),
    Bar: $(".dashboard-search-bar"),
    List: $("#dashboard-search-list"),
    Backdrop: $(".search-backdrop"),
    /**
     * @param {String} key
     * @param {String} label
     * @param {String} class
     */
    ListItem: function (key, label) {
      const li = $("<li></li>");
      li.addClass("dashboard-search-list-item");

      const anchor = $(`<a>${label}</a>`);
      anchor.attr("href", key);
      anchor.attr("target", "_blank");

      li.append(anchor);
      return li;
    },
    AdvancedSearch: function () {
      const listEnd = this.ListItem("#", "Advanced Search");
      return listEnd;
    },
  },
};
