import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Ticaret Sitesi Kurulumu & Danışmanlık | Maximora Studio",
  description: "Satışlarınızı katlayacak, güvenli, hızlı ve SEO uyumlu profesyonel e-ticaret altyapıları kuruyoruz. Hemen işinizi internete taşıyın.",
};

export default function ETicaretLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
