import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Harcama Rehberi Bütçe & Gider',
  description: 'Harcama Rehberi uygulaması gizlilik politikası ve finansal veri güvenliği bilgilendirmesi.',
};

export default function ParaKontrolGizlilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
