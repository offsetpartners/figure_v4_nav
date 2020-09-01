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
    },
    {
      key: "customers",
      label: "Customers",
    },
    {
      key: "commerce",
      label: "Commerce",
    },
    {
      key: "appointments",
      label: "Appointments",
    },
    {
      key: "content",
      label: "Content",
      children: [
        { key: "analytics", label: "Analytics" },
        {
          key: "marketing",
          label: "Marketing",
          children: [
            {
              key: "content_homepage",
              label: "Homepage",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
            },
            {
              key: "content_about",
              label: "About",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
            },
          ],
        },
        { key: "wine", label: "Wine" },
        { key: "publishing", label: "Publishing" },
        { key: "business", label: "Business" },
        { 
          key: "resources", 
          label: "Resources",
          children: [
            {
              key: "content_trade",
              label: "Trade",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
              tags: ["trade"],
            }, 
            {
              key: "resources_bottleshots",
              label: "Bottle Shots",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
              tags: ["trade", "bottleshots", "photos"],
            },
            {
              key: "resources_product_sheets",
              label: "Product Sheets",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
              tags: ["trade"],
            },
            {
              key: "resources_gallery_images",
              label: "Gallery Images",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
              tags: ["trade", "photos"],
            },
          ],
        },
        { key: "locator", label: "Locator" },
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
