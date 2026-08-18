import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hemen Projeye Başla & Teklif Al | Maximora Studio",
  description: "Web tasarım, e-ticaret veya özel yazılım projeniz için bize ulaşın. Ücretsiz danışmanlık ve fiyat teklifi alın.",
};

export default function TeklifAlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
