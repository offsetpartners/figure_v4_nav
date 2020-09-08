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
              isAvailable: true,
            },
            {
              key: "content_homepage",
              label: "Homepage",
              isAvailable: true,
              order_index: 0,
            },
            {
              key: "content_club",
              label: "Club",
              isAvailable: true,
            },
            {
              key: "content_concierge",
              label: "Concierge",
              isAvailable: false,
            },
            {
              key: "content_people",
              label: "People",
              isAvailable: true,
            },
            {
              key: "content_vineyards",
              label: "Vineyards",
              isAvailable: true,
            },
            {
              key: "content_visit",
              label: "Visit",
              isAvailable: true,
            },
            {
              key: "content_wine_making",
              label: "Wine Making",
              isAvailable: true,
            },
            {
              key: "content_collection",
              label: "Collections",
              order_index: 50,
              isAvailable: true,
            },
            {
              key: "content_wines",
              label: "Wines",
              order_index: 51,
              isAvailable: true,
            },
            {
              key: "content_careers",
              label: "Careers",
              isAvailable: false,
            },
            {
              key: "content_events",
              label: "Events",
              isAvailable: false,
            },
            {
              key: "content_gallery",
              label: "Gallery",
              isAvailable: false,
            },
            {
              key: "content_locations",
              label: "Locations",
              isAvailable: false,
            },
            {
              key: "content_recipes",
              label: "Recipes",
              isAvailable: false,
            },
            {
              key: "content_timeline",
              label: "Timeline",
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
              tags: ["trade"],
              order_index: 0,
            }, 
            {
              key: "resources_bottleshots",
              label: "Bottle Shots",
              tags: ["trade", "bottleshots", "photos"],
            },
            {
              key: "resources_product_sheets",
              label: "Product Sheets",
              tags: ["trade"],
            },
            {
              key: "resources_gallery_images",
              label: "Gallery Images",
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
    {
      id: 5,
      name: "Formatted Sidebar with more custom styles to reflect Content designs. Also, revised top-nav with new icons and simplified user icon.",
      date: "9/2/2020",
    },
    {
      id: 6,
      name: "Replacing iconography to match feather icons.",
      date: "9/8/2020",
    },
  ],
  help_doc: [
    {
      key: "documentation", 
      label: "Documentation",
      order_index: 0, 
    },
    {
      key: "support", 
      label: "Support",
      order_index: 1, 
    },
  ],
  user_info: [
    {
      key: "user_details",
      label: "User Details",
      details: {
        first_name: "Jane",
        last_name: "Richards",
        position: "Sale Manager",
        email: "jane.richards@josephphelpsvineyards.com",
      },
    },    
    {
      key: "profile", 
      label: "Profile", 
    },
    {
      key: "sign_out", 
      label: "Sign out", 
    },
  ],
};
