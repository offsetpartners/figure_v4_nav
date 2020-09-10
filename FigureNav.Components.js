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
      const arrow = $(`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> 
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/> 
        </svg>`);
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
     * @param {String} label
     */
    SubLabel: function (label) {
      let text;
      if (!FigureNav.Helpers.hasActiveLink()) {
        text = $("<h5></h5>");
      } else {
        text = $("<p></p>");
      }
      text.addClass("nav-sub-label");
      text.append(`<span>${label}</span>`);

      return text;
    },
    SubLink: function (label) {
      let text;
      if (!FigureNav.Helpers.hasActiveLink()) {
        text = $("<h5></h5>");
      } else {
        text = $("<p></p>");
      }
      text.addClass("nav-sub-label");
      text.append(`<span>${label}</span>`);

      return text;
    },
    /**
     * @param {String} style - additional classes
     */
    SubDiv: function (style = "") {
      let div = $("<div></div>");
      div.addClass(`nav-sub-div ${style}`);
      return div;
    },
    /**
     * @param {Array.<{key: String, label: String}>} array
     * @param {String} label
     * @param {String} previousItem
     */
    Body: function (array, label, previousItem) {
      const { Item, Container } = FigureNav.Components.SideBar;
      if (!array || !Array.isArray(array)) {
        return FigureNav.Helpers.resetSidebar();
      }

      if (FigureNav.Helpers.hasActiveLink()) {
        this.Container.css({ marginTop: "22px" });
      } else {
        this.Container.css({ marginTop: "92px" });
      }

      // Empty Links
      this.Container.empty();
      if (previousItem) {
        const button = this.PreviousButton(previousItem);
        this.Container.append(button);
      }

      if (label) {
        const title = $(`<h5>${label}</h5>`);
        title.addClass("nav-prev-header");
        this.Container.append(title);
      }

      // For Custom Content Pages separation:
      // if NewArray available for Content separation, then run this:
      const newArray = FigureNav.Helpers.contentSort(array);
      const isInPages = FigureNav.State.activeLink[1] === "pages";
      const hasUnavailableArray =
        newArray.unavailable && newArray.unavailable.length > 0;

      if (!isInPages && !hasUnavailableArray) {
        const navItems = array.map(function (link) {
          const { key, label } = link;

          const navItem = Item(key, label);
          FigureNav.Helpers.navItemFormatting(link, navItem);
          return navItem;
        });

        if (navItems.length <= 1) {
          FigureNav.Helpers.resetSidebar();
        } else {
          this.Container.append(navItems);
        }
      } else {
        // Available Content
        newArray.available.map(function (link) {
          const { key, label } = link;
          const navItem = Item(key, label);
          FigureNav.Helpers.navItemFormatting(link, navItem);
          Container.append(navItem);
        });

        // Unavailable Content Title
        const unavailableDiv = this.SubDiv("inline-flex unavailable");
        const subLabel = this.SubLabel("Add-Ons");
        const infoButton = $(`<a></a>`).addClass("unavailable-info");
        const infoCon = FigureNav.Components.Notifications.InfoCon().removeClass(
          "ml-2"
        );
        infoButton.append(infoCon);
        unavailableDiv.append(subLabel).append(infoButton);

        this.Container.append(unavailableDiv);
        const unavailableSubDiv = this.SubDiv();
        // Unavailable Content
        newArray.unavailable.map(function (link) {
          const { key, label } = link;

          const navItem = Item(key, label);
          FigureNav.Helpers.navItemFormatting(link, navItem);
          // console.log(navItem);
          navItem.find(".nav-link").attr("disabled", "true");
          unavailableSubDiv.append(navItem);
        });
        this.Container.append(unavailableSubDiv);
      }
    },
    /**
     * @param {String} key
     * @param {String} label
     */
    Item: function (key, label) {
      const { Label } = FigureNav.Components.SideBar;
      const item = $(`<li></li>`);
      item.addClass("nav-item");
      const link = $(`<a></a>`);
      link.addClass("nav-link");
      const text = Label(label);
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
      const listStart = this.ListItem(
        "#",
        "See all ",
        "see-all",
        '"' + input + '"'
      );
      return listStart;
    },
    AdvancedSearch: function () {
      const listEnd = this.ListItem("#", "Advanced Search", "advanced-link");
      return listEnd;
    },
  },

  Notifications: {
    /**
     * @param {String} label
     */
    Title: function (label) {
      const anchor = $("<div></div>");
      anchor.addClass("dropdown-menu-title");
      const p = $(`<p>${label}</p>`);
      p.addClass("nav-sub-label");
      const title = anchor.append(p);
      return title;
    },
    DayCheck: function (date) {
      var n = Date.now();
      var day = 86400000;
      // Notifications if <= 5 days out
      return n - Date.parse(date) > day * 5;
    },
    Button: $("#figure-nav-notifications-list"),
    Icon: $(".dashboard-notifications-icon"),
    Alert: $(`<svg class="dashboard-notifications-icon-alert" width="7" height="6" viewBox="0 0 7 6" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="3.76194" cy="3" rx="2.85984" ry="3" fill="#FF7358" />
      </svg>`),
    Dropdown: $(".figure-nav-notifications-dropdown"),
    DropdownMenu: $(".figure-nav-notifications-dropdown .dropdown-menu"),
    DropdownMenuList: $(
      ".figure-nav-notifications-dropdown .dropdown-menu .figure-nav-notifications-list"
    ),
    /**
     * @param {String} alert - if "info-con-path" goes from gray to orange
     */
    InfoCon: function (alert = "") {
      return $(`<svg class="info-con" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="${alert}" d="M8.00002 15.3333C12.0501 15.3333 15.3334 12.05 15.3334 7.99996C15.3334 3.94987 12.0501 0.666626 8.00002 0.666626C3.94993 0.666626 0.666687 3.94987 0.666687 7.99996C0.666687 12.05 3.94993 15.3333 8.00002 15.3333Z" stroke="#4F5268" stroke-miterlimit="10" stroke-linecap="square"/>
          <path class="${alert}" d="M7.99994 8V11.5" stroke="#4F5268" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
          <path class="${alert}" d="M7.99994 5L7.99994 6" stroke="#4F5268" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`);
    },
    /**
     * @param {String} id
     * @param {String} name
     * @param {String} date - slashes and dashes work
     */
    DropdownItem: function (id, name, date) {
      const inline = $(`<div></div>`);
      inline.addClass("notification-inline");
      let infoConAlert = "";
      this.DayCheck(date)
        ? (infoConAlert = "")
        : (infoConAlert = "info-con-path");
      const infoCon = this.InfoCon(infoConAlert);
      const months = [
        "Jan",
        "Feb",
        "March",
        "April",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];
      const thisDate = new Date(date);
      const m = months[thisDate.getMonth(date)];
      const d = thisDate.getDate(date);
      const useDate = m + " " + d;
      const anchor = $(
        `<div class="" id="${id}">${name}<p class="notification-date">${useDate}</p></div>`
      );
      anchor.addClass("dropdown-item");
      inline.append(infoCon).append(anchor);
      return inline;
    },
  },

  Help: {
    Button: $("#figure-nav-help-links"),
    Icon: $(".dashboard-help-icon"),
    /**
     * @param {Number} size - likely just bigger than font size
     * @param {String} color - css color
     */
    HelpIcon: function (size) {
      return $(`<svg class="dropdown-icons dropdown-help-icon mr-2" width="${size}" height="${size}" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0)">
        <path d="M10.6219 19.1666C15.6845 19.1666 19.7885 15.0625 19.7885 9.99992C19.7885 4.93731 15.6845 0.833252 10.6219 0.833252C5.55926 0.833252 1.4552 4.93731 1.4552 9.99992C1.4552 15.0625 5.55926 19.1666 10.6219 19.1666Z" stroke="#2a2f56" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="square"/>
        <path d="M8.2218 7.60261C8.2218 4.84361 12.8202 4.84356 12.8202 8.17736C12.8202 8.98209 12.4057 9.75844 11.4407 10.3616C10.4756 10.9648 10.6 11.7668 10.6 11.7668" stroke="#2a2f56" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="10.5219" cy="14.5669" r="1" fill="#2a2f56"/>
        </g>
        <defs>
        <clipPath id="clip0">
        <rect width="20" height="20" fill="white" transform="translate(0.621826)"/>
        </clipPath>
        </defs>
      </svg>`);
    },
    /**
     * @param {Number} size - likely just bigger than font size
     * @param {String} color - css color
     */
    DocumentIcon: function (size) {
      return $(`<svg class="dropdown-icons dropdown-help-icon mr-2" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 6H8V11H16V6Z" stroke="#2a2f56" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M21 18V1H5C3.895 1 3 1.895 3 3V20.5" stroke="#2a2f56" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5.5 18H21V23H5.5C4.119 23 3 21.881 3 20.5C3 19.119 4.119 18 5.5 18Z" stroke="#2a2f56" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`);
    },
    Dropdown: $(".figure-nav-help-dropdown"),
    DropdownMenu: $(".figure-nav-help-dropdown .dropdown-menu"),
    DropdownMenuList: $(
      ".figure-nav-help-dropdown .dropdown-menu .figure-nav-help-links"
    ),
    /**
     * @param {String} label
     */
    Title: function (label) {
      const anchor = $("<div></div>");
      anchor.addClass("dropdown-menu-title");
      const p = $(`<p>${label}</p>`);
      p.addClass("nav-sub-label");
      const title = anchor.append(p);
      return title;
    },
    /**
     * @param {String} key
     * @param {String} label
     */
    DropdownItem: function (key, label) {
      const inline = $(`<div></div>`);
      inline.addClass("help-inline");
      let menuIcon = "";
      switch (key) {
        case "documentation":
          menuIcon = this.DocumentIcon(16);
          break;
        case "support":
          menuIcon = this.HelpIcon(16);
          break;
      }
      const link = $(`<a></a>`);
      link.append(menuIcon);
      link.addClass(key);
      link.append(label);
      inline.append(link);
      return inline;
    },
  },

  Profile: {
    Button: $("#figure-nav-profile-details"),
    Icon: $(".dashboard-profile-icon"),
    Dropdown: $(".figure-nav-profile-dropdown"),
    DropdownMenu: $(".figure-nav-profile-dropdown .dropdown-menu"),
    DropdownMenuList: $(
      ".figure-nav-profile-dropdown .dropdown-menu .figure-nav-profile-details"
    ),
    UserDetails: function (first_name, last_name, email, position) {
      const anchor = $("<div></div>");
      anchor.addClass("dropdown-menu-title user-details");
      const nameP = $(`<p></p>`);
      const emailP = $(`<p></p>`);
      const posP = $(`<p></p>`);
      const emailS = $(`<small></small>`);
      const posS = $(`<small></small>`);
      const nameR = nameP.append(first_name + " " + last_name);
      nameR.addClass("profile-name");
      const emailR = emailP.append(emailS.append(email));
      emailR.addClass("profile-email");
      const posR = posP.append(posS.append(position));
      posR.addClass("profile-position");
      const title = anchor.append(nameR).append(emailR).append(posR);
      return title;
    },
    DropdownItem: function (key, label) {
      const inline = $(`<div></div>`);
      inline.addClass("profile-inline");
      const link = $("<a></a>");
      link.addClass(key);
      link.append(label);
      inline.append(link);
      return inline;
    },
  },
};
