import React from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import MaintenanceGuard from '@/components/Maintenance/MaintenanceGuard';
import AnnouncementPopup from '@/components/AnnouncementPopup/AnnouncementPopup';
import Newsletter from '@/components/Newsletter/Newsletter';

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <MaintenanceGuard>
      <AnnouncementPopup />
      <Header />
      <main style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </MaintenanceGuard>
  );
}
