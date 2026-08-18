import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurumsal SEO Ajansı ve Danışmanlığı | Maximora Studio",
  description: "Google'da üst sıralara çıkarak organik trafiğinizi ve satışlarınızı artırın. Veri odaklı SEO hizmeti ile rakiplerinizi geride bırakın.",
};

export default function SeoHizmetiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
