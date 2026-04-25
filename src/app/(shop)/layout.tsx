import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import MaintenanceGuard from '@/components/Maintenance/MaintenanceGuard';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <MaintenanceGuard>
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </MaintenanceGuard>
  );
}
