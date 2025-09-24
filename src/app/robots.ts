import type { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SEO_CONSTANTS.SITE_URL;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
        crawlDelay: 1,
      },
      {
        userAgent: ['Bingbot', 'Slurp'],
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/', '/private/'],
        crawlDelay: 2,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemapindex.xml`],
    host: baseUrl,
  };
}
