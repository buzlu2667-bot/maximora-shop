import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Namaz Vakti - Osmanlı Zümrüt Temalı Dualar ve Vakitler',
  description: 'En şık ve modern namaz vakitleri uygulaması. Osmanlı zümrüt temasıyla huzurlu bir ibadet deneyimi.',
};

export default function NamazLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
