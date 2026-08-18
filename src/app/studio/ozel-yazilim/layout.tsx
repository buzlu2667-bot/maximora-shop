import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Özel Yazılım Geliştirme Hizmetleri | Maximora Studio",
  description: "İşletmenizin ihtiyaçlarına tam uyan, ölçeklenebilir ve güvenli özel web tabanlı yazılım (SaaS, CRM, ERP) çözümleri geliştiriyoruz.",
};

export default function OzelYazilimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
