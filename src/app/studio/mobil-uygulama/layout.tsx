import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobil Uygulama Geliştirme (iOS & Android) | Maximora Studio",
  description: "Kullanıcı dostu, yüksek performanslı ve modern iOS & Android mobil uygulamaları tasarlıyor ve geliştiriyoruz.",
};

export default function MobilUygulamaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
