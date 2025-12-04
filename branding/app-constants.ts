/**
 * ShieldSign - App Constants
 * 
 * Replace the contents of apps/remix/src/constants/app.ts with this
 */

export const APP_NAME = 'ShieldSign';
export const APP_NAME_SHORT = 'ShieldSign';
export const APP_DESCRIPTION = 'Enterprise E-Signatures Built for Security';
export const APP_TAGLINE = 'Secure Document Signing';

export const APP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || 'https://sign.shieldsign.io';
export const MARKETING_URL = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://shieldsign.io';
export const DOCS_URL = 'https://shieldsign.io/docs';

export const SUPPORT_EMAIL = 'support@shieldsign.io';
export const SALES_EMAIL = 'sales@shieldsign.io';
export const SECURITY_EMAIL = 'security@shieldsign.io';

export const COMPANY_NAME = 'ShieldSign';
export const COMPANY_ADDRESS = ''; // Add your company address

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/shieldsign',
  linkedin: 'https://linkedin.com/company/shieldsign',
  github: 'https://github.com/shieldsign',
};

// Feature flags for ShieldSign integration
export const IS_SHIELDSIGN = true;
export const ENABLE_TRUST_CENTER_INTEGRATION = true;
export const ENABLE_CUSTOM_BRANDING = true;

// API Integration with main ShieldSign app
export const SHIELDSIGN_API_URL = process.env.SHIELDSIGN_API_URL || 'https://app.shieldsign.io/api';
