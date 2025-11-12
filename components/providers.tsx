'use client';

import React from 'react';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children }: { children: React.ReactNode }) {
  // Always render SessionProvider to avoid useContext errors
  // The session prop can be undefined/null during SSR and will be populated on client
  return (
    <SessionProvider 
      session={undefined}
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}
