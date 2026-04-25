"use client";

import { Toaster } from 'react-hot-toast';

export function Providers() {
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
