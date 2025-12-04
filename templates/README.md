# ShieldSign Templates

This directory contains document template foundations for common enterprise agreements.

## Available Templates

### Non-Disclosure Agreement (NDA)
- `nda-mutual.md` - Mutual NDA template
- `nda-unilateral.md` - One-way NDA template

### Data Processing Agreement (DPA)
- `dpa-standard.md` - GDPR-compliant DPA template
- `dpa-ccpa.md` - CCPA-specific DPA addendum

### Master Service Agreement (MSA)
- `msa-saas.md` - SaaS subscription MSA
- `msa-professional.md` - Professional services MSA

## Template Structure

Each template includes:
- **Header fields**: Company names, dates, addresses
- **Signature blocks**: Multiple party signatures
- **Date fields**: Effective date, signature dates
- **Optional fields**: Title, email, witness signatures

## Usage

Templates can be loaded into ShieldSign via:
1. Web UI upload
2. API template creation
3. Direct database seeding

## Customization

Templates use placeholder syntax:
- `{{COMPANY_NAME}}` - Variable replacement
- `[[SIGNATURE:party1]]` - Signature field marker
- `[[DATE:signed]]` - Date field marker
- `[[TEXT:optional_field]]` - Optional text input

## API Integration

```typescript
// Create document from template
POST /api/v1/templates/{templateId}/create-document
{
  "recipients": [...],
  "variables": {
    "COMPANY_NAME": "Acme Corp"
  }
}
```

---

© 2025 ShieldSign - Enterprise E-Signatures Built for Security
