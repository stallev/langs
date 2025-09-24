import type { MetadataRoute } from 'next';
import { RUS_A1_A2_LESSONS_DATA } from '@/data/rusLessonsData';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routeEntries = RUS_A1_A2_LESSONS_DATA.map(lesson => ({
    url: `${SEO_CONSTANTS.SITE_URL}/lessons/rus/a1a2/${lesson.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routeEntries];
}
