/**
 * ShieldSign - App Constants
 * 
 * Customize these values for your deployment
 */

export const APP_NAME = 'ShieldSign';
export const APP_NAME_SHORT = 'ShieldSign';
export const APP_DESCRIPTION = 'Open Source E-Signatures';
export const APP_TAGLINE = 'Secure Document Signing';

export const APP_URL = process.env.NEXT_PUBLIC_WEBAPP_URL || 'http://localhost:3000';
export const DOCS_URL = process.env.NEXT_PUBLIC_DOCS_URL || 'http://localhost:3001';

export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || 'support@your-domain.com';
export const COMPANY_NAME = process.env.COMPANY_NAME || 'Your Company';
export const COMPANY_ADDRESS = process.env.COMPANY_ADDRESS || '';

export const SOCIAL_LINKS = {
  github: 'https://github.com/KatalystDigital/shieldsign-core',
};

// Feature flags
export const ENABLE_CUSTOM_BRANDING = true;
