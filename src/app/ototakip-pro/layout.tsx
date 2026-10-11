import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'OtoTakip Pro - Dijital Garaj, Yakıt ve Bakım Asistanı',
  description: 'Aracınızın yakıt tüketimini, periyodik bakımlarını, muayene ve sigorta tarihlerini kolayca takip edin. OtoTakip Pro ile aracınızın tüm kontrolü cebinizde.',
};

export default function OtoTakipProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
