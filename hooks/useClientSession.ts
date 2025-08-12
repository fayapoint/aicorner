'use client';

import { useState, useEffect } from 'react';
import { Session } from 'next-auth';

type SessionStatus = 'loading' | 'authenticated' | 'unauthenticated';

// This hook safely handles session data without calling useSession during SSR
export function useClientSession() {
  const [isClient, setIsClient] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState<SessionStatus>('loading');
  
  // Only run on client-side
  useEffect(() => {
    // Set client flag immediately
    setIsClient(true);
    
    // Only fetch session after we're definitely on the client
    const fetchSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const sessionData = await response.json();
          setSession(sessionData || null);
          setStatus(sessionData ? 'authenticated' : 'unauthenticated');
        } else {
          setSession(null);
          setStatus('unauthenticated');
        }
      } catch (error) {
        console.error('Failed to fetch session:', error);
        setSession(null);
        setStatus('unauthenticated');
      }
    };
    
    fetchSession();
  }, []);

  return {
    data: session,
    status,
    isClient
  };
}
