const config = {
  company_name: "Acme Vineyards",

  accounts: [
    {
      id: 1,
      name: "Dev Vineyards",
    },
    {
      id: 2,
      name: "Victor Vineyards",
    },
    {
      id: 3,
      name: "Figure Vineyards",
    },
  ],

  links: [
    { 
      key: "dashboard", 
      label: "Dashboard", 
      order_index: 0,
    },
    { 
      key: "customers", 
      label: "Customers", 
      order_index: 2,
    },
    { 
      key: "commerce",
      label: "Commerce",
      children: [
        { key: "commerce_orders", label: "Orders", },
        { key: "commerce_wish_requests", label: "Wish Requests", },
        { key: "commerce_products", label: "Products", },
        { key: "commerce_promos", label: "Promos", },
      ],
      order_index: 1,
    },
    { 
      key: "appointments", 
      label: "Appointments", 
      order_index: 3,
     },
    {
      key: "content",
      label: "Content",
      order_index: 4,
      children: [
        { 
          key: "analytics", 
          label: "Analytics",
          order_index: 0,
        },
        {
          key: "pages",
          label: "Pages",
          order_index: 1,
          children: [
            {
              key: "content_about",
              label: "About",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
            },
            {
              key: "content_homepage",
              label: "Homepage",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
              order_index: 0,
            },
            {
              key: "content_club",
              label: "Club",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
            },
            {
              key: "content_concierge",
              label: "Concierge",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
            {
              key: "content_people",
              label: "People",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
            },
            {
              key: "content_vineyards",
              label: "Vineyards",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
            },
            {
              key: "content_visit",
              label: "Visit",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
            },
            {
              key: "content_wine_making",
              label: "Wine Making",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: true,
            },
            {
              key: "content_collection",
              label: "Collections",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              order_index: 50,
              isAvailable: true,
            },
            {
              key: "content_wines",
              label: "Wines",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              order_index: 51,
              isAvailable: true,
            },
            {
              key: "content_careers",
              label: "Careers",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
            {
              key: "content_events",
              label: "Events",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
            {
              key: "content_gallery",
              label: "Gallery",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
            {
              key: "content_locations",
              label: "Locations",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
            {
              key: "content_recipes",
              label: "Recipes",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
            {
              key: "content_timeline",
              label: "Timeline",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              isAvailable: false,
            },
          ],
        },
        { 
          key: "publishing", 
          label: "Publishing", 
          order_index: 2,
        },
        { 
          key: "business", 
          label: "Business",
          order_index: 3, 
        },
        { 
          key: "resources", 
          label: "Resources",
          order_index: 4, 
          children: [
            {
              key: "content_trade",
              label: "Trade",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              tags: ["trade"],
              order_index: 0,
            }, 
            {
              key: "resources_bottleshots",
              label: "Bottle Shots",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              tags: ["trade", "bottleshots", "photos"],
            },
            {
              key: "resources_product_sheets",
              label: "Product Sheets",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              tags: ["trade"],
            },
            {
              key: "resources_gallery_images",
              label: "Gallery Images",
              children: [
                { key: "overview", label: "Overview", },
                { key: "listings", label: "Listings", },
                { key: "settings", label: "Settings", },
              ],
              tags: ["trade", "photos"],
            },
          ],
        },
        { 
          key: "locator", 
          label: "Locator",
          order_index: 4, 
        },
      ],
    },
  ],

  search: [
    
    { key: "results", label: "Results" },
    { key: "are", label: "Are" },
    { key: "generated", label: "Generated" },
    { key: "here", label: "Here" },
  ],

  notifications_list: [
    {
      id: 1,
      name: "Sidebar animations geared towards guiding customer through dashboard.",
      date: "8/25/2020",
    },
    {
      id: 2,
      name: "Search Bar tied to config.",
      date: "8/27/2020",
    },
    {
      id: 3,
      name: "Updated Notifications List.",
      date: "8/31/2020",
    },
    {
      id: 4,
      name: "Notifications alert icon connected with 5 day window and notifications sorted by date.",
      date: "9/1/2020",
    },
  ],
};
