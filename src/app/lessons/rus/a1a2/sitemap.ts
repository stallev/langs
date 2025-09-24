import type { MetadataRoute } from 'next';
import { RUS_A1_A2_LESSONS_DATA } from '@/data/rusLessonsData';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.SITE_URL;
  const currentDate = new Date();

  return RUS_A1_A2_LESSONS_DATA.map(lesson => ({
    url: `${baseUrl}/lessons/rus/a1a2/${lesson.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
}
