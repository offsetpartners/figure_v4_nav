# Figure v4 Nav Component

## Inputs

### Config File (Should be passed down from PHP Controller)

```
    company_name: String,

    accounts: [
        id: Int,
        name: String
    ],

    links: [
        {
            key: String,
            label: String,
            children: [
                {
                    key: String,
                    label: String,
                    children: [{ key: String, label: String }]?
                }
            ]?
        }
    ],

    footer: DOMNode
```

### State (Local State)

```
    activeLink: String[]
```
