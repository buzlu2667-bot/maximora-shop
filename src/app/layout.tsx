import type { Metadata } from "next";
import "./globals.css";

import { Providers } from "@/components/Providers";
import Script from 'next/script';
import { GoogleOAuthProvider } from '@react-oauth/google';

export const metadata: Metadata = {
  metadataBase: new URL('https://maximorashop.com'),
  title: {
    template: '%s | Maximora',
    default: 'Maximora | Premium Çanta, Aksesuar ve Özel Tasarım Ürünler',
  },
  description: "Maximora'da premium çanta, aksesuar ve özel tasarım ürünleri en iyi fiyatlarla keşfedin. Hızlı kargo, güvenli ödeme ve %100 müşteri memnuniyeti.",
  openGraph: {
    title: 'Maximora | Premium Çanta, Aksesuar ve Özel Tasarım Ürünler',
    description: "Maximora'da premium çanta, aksesuar ve özel tasarım ürünleri en iyi fiyatlarla keşfedin.",
    url: 'https://maximorashop.com',
    siteName: 'Maximora',
    locale: 'tr_TR',
    type: 'website',
  },
  icons: {
    icon: '/favicon.png',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://maximorashop.com/#website',
      url: 'https://maximorashop.com/',
      name: 'Maximora',
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://maximorashop.com/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'Organization',
      '@id': 'https://maximorashop.com/#organization',
      name: 'Maximora',
      url: 'https://maximorashop.com/',
      logo: 'https://maximorashop.com/logo.png',
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
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Supabase'in "Lock" hatalarını tamamen susturur (siteyi etkilemez, sadece gürültü)
              const _isSbLockErr = function(msg) {
                if (!msg) return false;
                var s = typeof msg === 'string' ? msg : (msg.message || '');
                return s.includes('Lock broken') || s.includes('stole it') || s.includes('Lock "lock:') || s.includes('was released because') || s.includes('released because another');
              };

              const originalError = console.error;
              console.error = function(...args) {
                if (_isSbLockErr(args[0])) return;
                originalError.apply(console, args);
              };

              window.addEventListener('unhandledrejection', function(event) {
                if (event.reason && _isSbLockErr(event.reason.message || event.reason)) {
                  event.preventDefault();
                  event.stopImmediatePropagation();
                }
              }, true);

              window.addEventListener('error', function(event) {
                if (_isSbLockErr(event.message)) {
                  event.preventDefault();
                  event.stopImmediatePropagation();
                }
              }, true);
            `
          }}
        />
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
          <Providers />
          {children}
        </GoogleOAuthProvider>
        
        {/* SEO Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* LiveChat Integration - Sayfa yüklendikten sonra çalışır */}
        <Script id="livechat-script" strategy="lazyOnload">
          {`
            window.__lc = window.__lc || {};
            window.__lc.license = 19631629;
            window.__lc.integration_name = "manual_channels";
            window.__lc.product_name = "livechat";
            ;(function(n,t,c){function i(n){return e._h?e._h.apply(null,n):e._q.push(n)}var e={_q:[],_h:null,_v:"2.0",on:function(){i(["on",c.call(arguments)])},once:function(){i(["once",c.call(arguments)])},off:function(){i(["off",c.call(arguments)])},get:function(){if(!e._h)throw new Error("[LiveChatWidget] You can't use getters before load.");return i(["get",c.call(arguments)])},call:function(){i(["call",c.call(arguments)])},init:function(){var n=t.createElement("script");n.async=!0,n.type="text/javascript",n.src="https://cdn.livechatinc.com/tracking.js",t.head.appendChild(n)}};!n.__lc.asyncInit&&e.init(),n.LiveChatWidget=n.LiveChatWidget||e}(window,document,[].slice))
          `}
        </Script>
      </body>
    </html>
  );
}
