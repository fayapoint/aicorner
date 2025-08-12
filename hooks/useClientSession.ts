'use client';

import { useState, useEffect } from 'react';
import { Session } from 'next-auth';

type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

// This hook safely handles useSession to prevent SSR errors
export function useClientSession() {
  const [isClient, setIsClient] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>('loading');
  
  // Only run on client-side
  useEffect(() => {
    setIsClient(true);
    
    // Only import and call useSession after we're on the client
    if (typeof window !== 'undefined') {
      import('next-auth/react').then(({ useSession }) => {
        // This is a hack but necessary to avoid SSR issues
        // We'll manually fetch the session on the client
        fetch('/api/auth/session')
          .then(res => res.json())
          .then(sessionData => {
            setSession(sessionData || null);
            setStatus(sessionData ? 'authenticated' : 'unauthenticated');
          })
          .catch(() => {
            setSession(null);
            setStatus('unauthenticated');
          });
      });
    }
  }, []);

  return {
    data: session,
    status,
    isClient
  };
}
