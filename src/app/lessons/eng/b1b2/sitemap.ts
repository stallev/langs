import type { MetadataRoute } from 'next';
import { ENG_B1_B2_LESSONS_DATA } from '@/data/lessonsData';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routeEntries = ENG_B1_B2_LESSONS_DATA.map(lesson => ({
    url: `${SEO_CONSTANTS.SITE_URL}/lessons/eng/b1b2/${lesson.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routeEntries];
}
