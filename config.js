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
              key: "homepage",
              label: "Homepage",
              children: [
                { key: "overview", label: "Overview" },
                { key: "listings", label: "Listings" },
                { key: "settings", label: "Settings" },
              ],
            },
            {
              key: "about",
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
        { key: "resources", label: "Resources" },
        { key: "locator", label: "Locator" },
      ],
    },
  ],
  search: [
    
    { key: "results.com", label: "Results" },
    { key: "are.com", label: "Are" },
    { key: "generated.com", label: "Generated" },
    { key: "here.com", label: "Here" },
  ],
};
