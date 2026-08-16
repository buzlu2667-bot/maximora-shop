import React from 'react';
import styles from './page.module.css';

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
      {children}
    </div>
  );
}
