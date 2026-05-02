import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Namaz Vakti Osmanlı Zümrüt Serisi',
  description: 'Namaz Vakti uygulaması gizlilik politikası ve veri kullanım detayları.',
};

export default function GizlilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
