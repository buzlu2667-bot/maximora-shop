import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/', 
        '/checkout/',
        '/api/',
        '/login',
        '/register'
      ],
    },
    sitemap: 'https://maximorashop.com/sitemap.xml',
  };
}
