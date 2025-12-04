import type { NextConfig } from 'next';

import nextra from 'nextra';

const nextConfig: NextConfig = {
  transpilePackages: [
    '@shieldsign/assets',
    '@shieldsign/lib',
    '@shieldsign/tailwind-config',
    '@shieldsign/trpc',
    '@shieldsign/ui',
  ],
};

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  codeHighlight: true,
});

export default withNextra(nextConfig);
