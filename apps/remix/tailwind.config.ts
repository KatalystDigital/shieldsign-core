/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('@shieldsign/tailwind-config');
const path = require('path');

module.exports = {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './app/**/*.{ts,tsx}',
    `${path.join(require.resolve('@shieldsign/ui'), '..')}/components/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@shieldsign/ui'), '..')}/icons/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@shieldsign/ui'), '..')}/lib/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@shieldsign/ui'), '..')}/primitives/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@shieldsign/email'), '..')}/templates/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@shieldsign/email'), '..')}/template-components/**/*.{ts,tsx}`,
    `${path.join(require.resolve('@shieldsign/email'), '..')}/providers/**/*.{ts,tsx}`,
  ],
};
