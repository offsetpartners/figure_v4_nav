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
      const arrow = 
        $(`<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg"> 
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

      // For Custom Content Pages separation:
      // if NewArray available for Content separation, then run this:
      const newArray = FigureNav.Helpers.contentSort(array);
      if (newArray.length === 2 && FigureNav.State.activeLink[1] === "pages") {
        // console.log(newArray);      
        // Available Content  
        newArray[0].map(function (link) {
          const { key, label } = link;
          const navItem = FigureNav.Components.SideBar.Item(key, label);
          FigureNav.Helpers.navItemFormatting(link, navItem)
          FigureNav.Components.SideBar.Container.append(navItem);
        })
        // Unavailable Content Title
        const subDiv1 = FigureNav.Components.SideBar.SubDiv("inline-flex unavailable");
        const subLabel = FigureNav.Components.SideBar.SubLabel("unavailable");
        const infoButton = $(`<a></a>`).addClass("unavailable-info")
        const infoCon = FigureNav.Components.Notifications.InfoCon().removeClass("ml-2");
        infoButton.append(infoCon);
        subDiv1
          .append(subLabel)
          .append(infoButton);
        FigureNav.Components.SideBar.Container.append(subDiv1);
        const subDiv2 = FigureNav.Components.SideBar.SubDiv();
        // Unavailable Content
        newArray[1].map(function (link) {
          const { key, label } = link;
            
          const navItem = FigureNav.Components.SideBar.Item(key, label);
          FigureNav.Helpers.navItemFormatting(link, navItem)
          // console.log(navItem);
          navItem.find('.nav-link').attr('disabled', 'true');
          subDiv2.append(navItem);
        })
        FigureNav.Components.SideBar.Container.append(subDiv2);
      } else {
        return array.map(function (link) {
          const { key, label } = link;
           
          const navItem = FigureNav.Components.SideBar.Item(key, label);
          FigureNav.Helpers.navItemFormatting(link, navItem);
          FigureNav.Components.SideBar.Container.append(navItem);
        });
      }
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
  
  Notifications: {
    /**
     * @param {String} label
     */
    Title: function (label) {
      const anchor = $('<div></div>');
      anchor.addClass('dropdown-menu-title');
      const p = $(`<p>${label}</p>`);
      p.addClass('nav-sub-label');
      const title = anchor.append(p);
      return title;
    },
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
     * @param {String} alert - if "info-con-path" goes from gray to orange
     */
    InfoCon: function (alert = "") {
      return (
        $(`<svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="feather feather-alert-circle info-con ${alert}"
        >
          <circle 
            cx="12" 
            cy="12" 
            r="10"
          ></circle>
          <line 
            x1="12" 
            y1="8" 
            x2="12" 
            y2="12"
          ></line>
          <line 
            x1="12" 
            y1="16" 
            x2="12.01" 
            y2="16"
          ></line>
        </svg>`)
      );
    },
    /**
     * @param {String} id
     * @param {String} name
     * @param {String} date - slashes and dashes work
     */
    DropdownItem: function (id, name, date) {
      const inline = $(`<div></div>`);
      inline.addClass('notification-inline');
      let infoConAlert = "";
      this.DayCheck(date) ? infoConAlert = "" : infoConAlert = "info-con-alert";
      const infoCon = this.InfoCon(infoConAlert);
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

  Help: {
    Button: $("#figure-nav-help-links"),
    Icon:   $(".dashboard-help-icon"),
    /**
     * @param {Number} size - likely just bigger than font size
     * @param {String} color - css color
     */
    HelpIcon: function (size) {
      return $(`<svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="${size}" 
        height="${size}" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="feather feather-help-circle dropdown-icons dropdown-help-icon mr-2"
      >
        <circle 
          cx="12" 
          cy="12" 
          r="10"
        ></circle>
        <path 
          d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
        ></path>
        <line 
          x1="12" 
          y1="17" 
          x2="12.01" 
          y2="17"
        ></line>
      </svg>`)
    },
    /**
     * @param {Number} size - likely just bigger than font size
     * @param {String} color - css color
     */
    DocumentIcon: function (size) { 
      return $(`<svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="${size}" 
        height="${size}" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        stroke-width="2" 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        class="feather feather-book-open dropdown-icons dropdown-help-icon mr-2"
      >
        <path 
          d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
        ></path>
        <path 
          d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
        ></path>
      </svg>`)
    },
    Dropdown: $(".figure-nav-help-dropdown"),
    DropdownMenu: $(".figure-nav-help-dropdown .dropdown-menu"),
    DropdownMenuList: $(".figure-nav-help-dropdown .dropdown-menu .figure-nav-help-links"),
    /**
     * @param {String} label
     */
    Title: function (label) {
      const anchor = $('<div></div>');
      anchor.addClass('dropdown-menu-title');
      const p = $(`<p>${label}</p>`);
      p.addClass('nav-sub-label');
      const title = anchor.append(p);
      return title;
    },
    /**
     * @param {String} key
     * @param {String} label
     */
    DropdownItem: function (key, label) {
      const inline = $(`<div></div>`);
      inline.addClass('help-inline');
      let menuIcon = "";
      switch(key) {
        case "documentation":
          menuIcon = this.DocumentIcon(16);
          break;
        case "support":
          menuIcon = this.HelpIcon(16);
          break;
      }
      const link = $(`<a></a>`);
      link.append(menuIcon)
      link.addClass(key);
      link.append(label);
      // link.click(function (e) {
      //   if(FigureNav.State.activeLink.length > 0) FigureNav.State.activeLink = [];
      //   FigureNav.State.activeLink.push(key);
      //   console.log(FigureNav.State.activeLink);
      //   FigureNav.Helpers.updateSidebar("forward");
      // });
      inline.append(link);
      return inline;
    },
  },

  Profile: {
    Button: $("#figure-nav-profile-details"),
    Icon:   $(".dashboard-profile-icon"),
    Dropdown: $(".figure-nav-profile-dropdown"),
    DropdownMenu: $(".figure-nav-profile-dropdown .dropdown-menu"),
    DropdownMenuList: $(".figure-nav-profile-dropdown .dropdown-menu .figure-nav-profile-details"),
    UserDetails: function(first_name, last_name, email, position) {
      const anchor = $('<div></div>');
      anchor.addClass('dropdown-menu-title user-details');
      const nameP = $(`<p></p>`);
      const emailP = $(`<p></p>`);
      const posP = $(`<p></p>`);
      const emailS = $(`<small></small>`);
      const posS = $(`<small></small>`);
      const nameR = nameP.append(first_name + " " + last_name);
      nameR.addClass('profile-name');
      const emailR = emailP.append(emailS.append(email));
      emailR.addClass('profile-email');
      const posR = posP.append(posS.append(position));
      posR.addClass('profile-position');
      const title = anchor.append(nameR).append(emailR).append(posR);
      return title;
    },
    DropdownItem: function (key, label) {
      const inline = $(`<div></div>`);
      inline.addClass('profile-inline');
      const link = $('<a></a>');
      link.addClass(key);
      link.append(label);
      // link.click(function (e) {
      //   if(FigureNav.State.activeLink.length > 0) FigureNav.State.activeLink = [];
      //   FigureNav.State.activeLink.push(key);
      //   console.log(FigureNav.State.activeLink);
      //   FigureNav.Helpers.updateSidebar("forward");
      // });
      inline.append(link);
      return inline;
    },
  },
};
