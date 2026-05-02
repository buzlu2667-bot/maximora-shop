import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Para Kontrol Akıllı Finans Asistanı',
  description: 'Para Kontrol uygulaması gizlilik politikası ve finansal veri güvenliği bilgilendirmesi.',
};

export default function ParaKontrolGizlilikLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
