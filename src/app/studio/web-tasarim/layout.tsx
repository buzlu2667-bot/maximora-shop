import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Premium Web Tasarım Ajansı | Maximora Studio",
  description: "Sadece estetik değil, satış odaklı ve dönüşüm getiren özel web tasarım (UI/UX) hizmetleri. Markanızı dijitalde zirveye taşıyın.",
};

export default function WebTasarimLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
