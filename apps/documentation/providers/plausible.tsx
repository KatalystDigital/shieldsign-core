import React from 'react';

import NextPlausibleProvider from 'next-plausible';

export type PlausibleProviderProps = {
  children: React.ReactNode;
};

export const PlausibleProvider = ({ children }: PlausibleProviderProps) => {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || 'your-domain.com';
  return <NextPlausibleProvider domain={domain}>{children}</NextPlausibleProvider>;
};
