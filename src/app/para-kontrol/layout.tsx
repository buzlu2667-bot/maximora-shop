import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Para Kontrol - Akıllı Finans ve Gider Takibi',
  description: 'Harcamalarınızı yönetin, bütçenizi planlayın ve finansal özgürlüğünüzü kazanın. Para Kontrol ile her kuruşun hesabını tutun.',
};

export default function ParaKontrolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
