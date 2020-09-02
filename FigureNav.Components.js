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
     * @param {Array.<{key: String, label: String}>} array
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

  Notifications: {
    DayCheck: function(date) {
      var n = Date.now();
      var day = 86400000;
      // Notifications if <= 5 days out 
      return ((n - Date.parse(date)) > (day * 5));
    },
    Button: $("#figure-nav-notifications-list"),
    Icon:   $(".dashboard-notifications-icon"),
    Alert:  
      $(`<svg class="dashboard-notifications-icon-alert" width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="3.76194" cy="3" rx="2.85984" ry="3" fill="#FF7358" />
      </svg>`),
    Dropdown: $(".figure-nav-notifications-dropdown"),
    DropdownMenu: $(".figure-nav-notifications-dropdown .dropdown-menu"),
    DropdownMenuList: $(".figure-nav-notifications-dropdown .dropdown-menu .figure-nav-notifications-list"),
    /**
     * @param {String} id
     * @param {String} name
     */
    DropdownItem: function (id, name, date) {
      const inline = $(`<div></div>`);
      inline.addClass('notification-inline');
      let infoConAlert = "";
      this.DayCheck(date) ? infoConAlert = "" : infoConAlert = "info-con-path";
      const infoCon = 
        $(`<svg class="info-con ml-2" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="${infoConAlert}" d="M8.00002 15.3333C12.0501 15.3333 15.3334 12.05 15.3334 7.99996C15.3334 3.94987 12.0501 0.666626 8.00002 0.666626C3.94993 0.666626 0.666687 3.94987 0.666687 7.99996C0.666687 12.05 3.94993 15.3333 8.00002 15.3333Z" stroke="#4F5268" stroke-miterlimit="10" stroke-linecap="square"/>
          <path class="${infoConAlert}" d="M7.99994 8V11.5" stroke="#4F5268" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="${infoConAlert}" d="M7.99994 5L7.99994 6" stroke="#4F5268" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`);
      const months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"];
      const thisDate = new Date(date);
      const m = months[thisDate.getMonth(date)];
      const d = thisDate.getDate(date);
      const useDate = m + " " + d;
      const anchor = $(`<div class="" id="${id}">${name}<p class="notification-date">${useDate}</p></div>`);
      anchor.addClass("dropdown-item");
      inline.append(infoCon).append(anchor);
      return inline;
    },
  },

  Search: {
    Package: $(".figure-dashboard-search"),
    Icon: $(".figure-dashboard-search .search-icon"),
    Bar: $(".dashboard-search-bar"),
    List: $("#dashboard-search-list"),
    ListItemLink: $("#dashboard-search-list .dashboard-search-list-item a"),
    Backdrop: $(".search-backdrop"),
    /**
     * @param {String} key
     * @param {String} label
     * @param {String} style
     * @param {String} span
     */
    ListItem: function (key, label, style = "search-results", span = "") {
      const li = $("<li></li>");
      li.addClass("dashboard-search-list-item");

      const anchor = $(`<a class="${style}">${label}<span>${span}</span></a>`);
      anchor.attr("href", key);
      anchor.attr("target", "_blank");

      li.append(anchor);
      return li;
    },
    /**
     * @param {String} input
     */
    SeeAll: function (input) {
      const listStart = this.ListItem("#", 'See all ',"see-all", '"' + input + '"');
      return listStart;
    },
    AdvancedSearch: function () {
      const listEnd = this.ListItem("#", "Advanced Search", "advanced-link");
      return listEnd;
    },
  },
};
