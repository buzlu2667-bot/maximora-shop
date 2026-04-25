"use client";

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';

export function Providers() {
  const { syncUserData, setUser } = useStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // OAuth veya normal giriş sonrası store'u senkronize et
        await syncUserData(session.user.id);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [syncUserData, setUser]);

  return (
    <>
      <Toaster 
        position="top-center" 
        toastOptions={{
          style: {
             background: '#333',
             color: '#fff',
             borderRadius: '8px',
             fontFamily: 'var(--font-sans)',
             fontSize: '0.875rem'
          }
        }} 
      />
    </>
  );
}
