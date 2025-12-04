# ShieldSign - Logo Assets

Place the following logo files in this directory:

## Required Files

| File | Size | Usage |
|------|------|-------|
| `logo.svg` | Vector | Primary logo (web) |
| `logo-dark.svg` | Vector | Logo for dark backgrounds |
| `logo-light.svg` | Vector | Logo for light backgrounds |
| `logo-icon.svg` | Vector | Icon only (no text) |
| `logo-32.png` | 32x32 | Favicon |
| `logo-192.png` | 192x192 | PWA icon |
| `logo-512.png` | 512x512 | PWA icon large |
| `og-image.png` | 1200x630 | Social sharing |

## Destination Paths

After creating the logos, copy them to:

```
apps/remix/public/
├── favicon.ico          (from logo-32.png, converted)
├── logo.svg             (from logo.svg)
├── logo-dark.svg        (from logo-dark.svg)
├── apple-touch-icon.png (from logo-192.png)
└── og-image.png         (from og-image.png)

apps/remix/public/icons/
├── icon-192.png
└── icon-512.png
```

## Design Guidelines

- **Primary Color**: Teal #14b8a6
- **Secondary Color**: Dark slate #0d1117
- **Style**: Modern, professional, security-focused
- **Icon**: Shield with document/signature element
- **Text**: "ShieldSign" or "ShieldSign" (short form)

## Logo Concept

The logo should incorporate:
1. A shield (security/trust)
2. A document or signature element
3. The teal brand color
4. Clean, modern lines

Example SVG placeholder (replace with actual design):

```svg
<svg viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg">
  <!-- Shield Icon -->
  <path d="M20 5 L35 10 L35 25 C35 35 27.5 42 20 45 C12.5 42 5 35 5 25 L5 10 Z" 
        fill="#14b8a6"/>
  <!-- Checkmark -->
  <path d="M13 25 L18 30 L28 18" 
        stroke="white" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Text -->
  <text x="45" y="32" font-family="Inter, sans-serif" font-size="20" font-weight="600" fill="#e6edf3">
    ShieldSign
  </text>
</svg>
```
