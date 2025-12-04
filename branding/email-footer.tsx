/**
 * ShieldSign - Email Footer Component
 * 
 * Replace email footer in packages/email/templates/ files
 */

import { Hr, Link, Section, Text } from '@react-email/components';

export const ShieldSignEmailFooter = () => {
  return (
    <Section style={footerStyle}>
      <Hr style={hrStyle} />
      <Text style={footerTextStyle}>
        Sent by{' '}
        <Link href="https://shieldsign.io" style={linkStyle}>
          ShieldSign
        </Link>
        {' '}- Enterprise E-Signatures Built for Security
      </Text>
      <Text style={footerSubTextStyle}>
        Part of the ShieldSign Platform
      </Text>
      <Text style={footerSubTextStyle}>
        <Link href="https://shieldsign.io/privacy" style={linkStyle}>
          Privacy Policy
        </Link>
        {' · '}
        <Link href="https://shieldsign.io/terms" style={linkStyle}>
          Terms of Service
        </Link>
        {' · '}
        <Link href="mailto:support@shieldsign.io" style={linkStyle}>
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

export default ShieldSignEmailFooter;
