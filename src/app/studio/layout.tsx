import React from 'react';
import styles from './page.module.css';
import StudioTopBar from '@/components/TopBar/StudioTopBar';
import StudioAnnouncementPopup from '@/components/AnnouncementPopup/StudioAnnouncementPopup';
import StudioHeader from '@/components/Studio/StudioHeader';
import StudioFooter from '@/components/Studio/StudioFooter';

export const metadata = {
  title: 'Maximora Studio | Dijital Mükemmellik',
  description: 'Modern tasarım, güçlü yazılım ve kusursuz deneyimle markanızı bir adım öne çıkarıyoruz.',
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.studioLayoutWrapper}>
      <StudioTopBar />
      <StudioHeader />
      <main style={{ minHeight: 'calc(100vh - 400px)' }}>
        {children}
      </main>
      <StudioFooter />
      <StudioAnnouncementPopup />
    </div>
  );
}
