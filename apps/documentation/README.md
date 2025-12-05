# @shieldsign/documentation

ShieldSign documentation site built with [Nextra](https://nextra.site/).

## Documentation Structure

```
pages/
├── index.mdx              # Home page
├── users/                 # User documentation
│   ├── get-started/       # Account creation, security
│   ├── documents/         # Sending, fields, preferences
│   ├── organisations/     # Teams, members, groups, SSO
│   ├── compliance/        # Standards, signature levels
│   └── licenses/          # Community & Enterprise editions
└── developers/            # Developer documentation
    ├── self-hosting/      # Deployment guides
    ├── public-api/        # API documentation
    └── webhooks.mdx       # Webhook integration
```

## Development

```bash
# From workspace root
npm run dev -w @shieldsign/documentation
```

## Building

```bash
npm run build -w @shieldsign/documentation
```

## Notes

- Documentation uses MDX format
- Internal links use full GitHub repository paths for GitHub rendering
- Callouts have been converted to markdown blockquotes for compatibility

## License

AGPL-3.0 - See [LICENSE](../../LICENSE) for details.
