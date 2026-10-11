import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Harcama Rehberi - Bütçe & Gider Takibi',
  description: 'Harcamalarınızı yönetin, bütçenizi planlayın ve finansal özgürlüğünüzü kazanın. Harcama Rehberi ile her kuruşun hesabını tutun.',
};

export default function ParaKontrolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
