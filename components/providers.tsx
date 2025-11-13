'use client';

import React from 'react';

// Simplified Providers component without SessionProvider to avoid SSR/SSG errors
// All session management is now handled via useClientSession hook which fetches
// session data client-side only
export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
