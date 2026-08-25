import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/components/Providers";
import { SplashScreen } from "@/components/SplashScreen";
import Script from 'next/script';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://maximorashop.com'),
  title: {
    template: '%s | Maximora',
    default: 'Maximora Studio | Yazılım & Web Tasarım Ajansı',
  },
  description: "Maximora Studio ile işletmenizi dijitale taşıyın. Profesyonel web tasarım, e-ticaret paketleri, özel yazılım ve mobil uygulama çözümleri.",
  openGraph: {
    title: 'Maximora Studio | Yazılım & Web Tasarım Ajansı',
    description: "Maximora Studio ile işletmenizi dijitale taşıyın. Profesyonel web tasarım, e-ticaret paketleri, özel yazılım ve mobil uygulama çözümleri.",
    url: 'https://maximorashop.com',
    siteName: 'Maximora Studio',
    locale: 'tr_TR',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://maximorashop.com/#website',
      url: 'https://maximorashop.com/',
      name: 'Maximora Studio'
    },
    {
      '@type': 'Organization',
      '@id': 'https://maximorashop.com/#organization',
      name: 'Maximora Studio',
      url: 'https://maximorashop.com/',
      logo: 'https://maximorashop.com/favicon.png',
      sameAs: [
        'https://www.instagram.com/maximorashop/'
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <meta name="google-site-verification" content="2KXPvTAH7x4gzM1Nn2HSlYSARZPCf7pHYDAawRj3z_U" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18127474381"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18127474381');
            `,
          }}
        />
      </head>
      <body>
        <SplashScreen />
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <Providers />
          {children}
        </GoogleOAuthProvider>

        {/* Zoho SalesIQ Integration */}
        <Script
          id="zsiq-setup"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`
          }}
        />
        <Script
          id="zsiqscript"
          src="https://salesiq.zohopublic.eu/widget?wc=siq29fd88e9bb8b4958a20deefd5a65d1786b037dd062bf291f6503ec4a6a556ff4"
          strategy="lazyOnload"
        />

        {/* Intercom Integration (Commented out for now) */}
        {/* 
          Script id="intercom-settings" ... 
          Script id="intercom-script" ... 
        */}
      </body>
    </html>
  );
}
