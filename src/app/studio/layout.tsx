import React from 'react';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          background-color: #050508 !important;
          margin: 0;
          padding: 0;
        }
      `}} />
      <div style={{ position: 'relative', width: '100%', backgroundColor: '#050508' }}>
        {children}
      </div>
    </>
  );
}
