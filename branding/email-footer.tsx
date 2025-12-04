/**
 * ShieldDocs Sign - Email Footer Component
 * 
 * Replace email footer in packages/email/templates/ files
 */

import { Hr, Link, Section, Text } from '@react-email/components';

export const ShieldDocsEmailFooter = () => {
  return (
    <Section style={footerStyle}>
      <Hr style={hrStyle} />
      <Text style={footerTextStyle}>
        Sent by{' '}
        <Link href="https://shielddocs.io" style={linkStyle}>
          ShieldDocs Sign
        </Link>
        {' '}- Enterprise E-Signatures for Trust Centers
      </Text>
      <Text style={footerSubTextStyle}>
        Part of the ShieldDocs Trust Center Platform
      </Text>
      <Text style={footerSubTextStyle}>
        <Link href="https://shielddocs.io/privacy" style={linkStyle}>
          Privacy Policy
        </Link>
        {' · '}
        <Link href="https://shielddocs.io/terms" style={linkStyle}>
          Terms of Service
        </Link>
        {' · '}
        <Link href="mailto:support@shielddocs.io" style={linkStyle}>
          Contact Support
        </Link>
      </Text>
    </Section>
  );
};

const footerStyle = {
  marginTop: '32px',
  textAlign: 'center' as const,
};

const hrStyle = {
  borderColor: '#30363d',
  margin: '24px 0',
};

const footerTextStyle = {
  color: '#7d8590',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};

const footerSubTextStyle = {
  color: '#7d8590',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0',
};

const linkStyle = {
  color: '#14b8a6',
  textDecoration: 'none',
};

export default ShieldDocsEmailFooter;
