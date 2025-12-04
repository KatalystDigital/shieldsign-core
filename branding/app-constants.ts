/**
 * ShieldDocs Sign - App Constants
 * 
 * Replace the contents of apps/remix/src/constants/app.ts with this
 */

export const APP_NAME = 'ShieldDocs Sign';
export const APP_NAME_SHORT = 'ShieldDocs';
export const APP_DESCRIPTION = 'Enterprise E-Signatures for Trust Centers';
export const APP_TAGLINE = 'Secure Document Signing';

export const APP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || 'https://sign.shielddocs.io';
export const MARKETING_URL = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://shielddocs.io';
export const DOCS_URL = 'https://shielddocs.io/docs';

export const SUPPORT_EMAIL = 'support@shielddocs.io';
export const SALES_EMAIL = 'sales@shielddocs.io';
export const SECURITY_EMAIL = 'security@shielddocs.io';

export const COMPANY_NAME = 'ShieldDocs';
export const COMPANY_ADDRESS = ''; // Add your company address

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/shielddocs',
  linkedin: 'https://linkedin.com/company/shielddocs',
  github: 'https://github.com/shielddocs',
};

// Feature flags for ShieldDocs integration
export const IS_SHIELDDOCS = true;
export const ENABLE_TRUST_CENTER_INTEGRATION = true;
export const ENABLE_CUSTOM_BRANDING = true;

// API Integration with main ShieldDocs app
export const SHIELDDOCS_API_URL = process.env.SHIELDDOCS_API_URL || 'https://app.shielddocs.io/api';
