"use client";

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { supabase } from '@/lib/supabase';
import { useStore } from '@/store/useStore';

export function Providers() {
  const { syncUserData, setUser } = useStore();

  // Next.js kendi console.error'ını hidrasyon SONRASI sarmalıyor.
  // Bu yüzden biz de hidrasyon sonrası tekrar sarmalıyoruz → Lock hatası overlay'e ulaşamaz.
  useEffect(() => {
    const isSbLockErr = (v: any) => {
      if (v && (v.name === 'AbortError' || v instanceof DOMException)) return true;
      const s = typeof v === 'string' ? v : (v?.message ?? '');
      return (
        s.includes('Lock broken') ||
        s.includes('stole it') ||
        s.includes('was released because') ||
        s.includes('released because another') ||
        s.includes('steal') ||
        s.includes('Lock "lock:') ||
        s.includes('Invalid Refresh Token')
      );
    };

    const originalError = console.error.bind(console);
    console.error = (...args: any[]) => {
      if (isSbLockErr(args[0])) return;
      originalError(...args);
    };

    const originalWarn = console.warn.bind(console);
    console.warn = (...args: any[]) => {
      const s = typeof args[0] === 'string' ? args[0] : (args[0]?.message ?? '');
      if (s.includes('was preloaded using link preload but not used')) return;
      originalWarn(...args);
    };

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
    };
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
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
