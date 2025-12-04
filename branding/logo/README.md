# ShieldSign - Logo Assets

## Current Assets

| File | Status | Usage |
|------|--------|-------|
| `favicon-16x16.png` | ✅ Deployed | Browser tab icon (small) |
| `favicon-32x32.png` | ✅ Deployed | Browser tab icon (standard) |
| `shieldsign-logo-transparent.png` | ✅ Deployed | Main logo (transparent bg) |
| `shieldsign-logo-white.png` | ✅ Available | Logo on dark backgrounds |

## TODO: Generate Additional Assets

| File | Size | Usage |
|------|------|-------|
| `android-chrome-192x192.png` | 192x192 | PWA icon |
| `android-chrome-512x512.png` | 512x512 | PWA icon large |
| `apple-touch-icon.png` | 180x180 | iOS home screen |
| `favicon.ico` | multi-size | Legacy browsers |
| `og-image.png` | 1200x630 | Social sharing |

Generate these from `shieldsign-logo-transparent.png` and copy to:
- `packages/assets/`
- `apps/remix/public/`

## Deployment Script

```powershell
# After generating new icons, run:
Copy-Item "branding\logo\favicon-16x16.png" "packages\assets\" -Force
Copy-Item "branding\logo\favicon-32x32.png" "packages\assets\" -Force
Copy-Item "branding\logo\android-chrome-192x192.png" "packages\assets\" -Force
Copy-Item "branding\logo\android-chrome-512x512.png" "packages\assets\" -Force
Copy-Item "branding\logo\apple-touch-icon.png" "packages\assets\" -Force

# Repeat for apps/remix/public/
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
