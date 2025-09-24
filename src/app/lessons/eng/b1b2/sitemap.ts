import type { MetadataRoute } from 'next';
import { ENG_B1_B2_LESSONS_DATA } from '@/data/lessonsData';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.SITE_URL;
  const currentDate = new Date();

  return ENG_B1_B2_LESSONS_DATA.map(lesson => ({
    url: `${baseUrl}/lessons/eng/b1b2/${lesson.slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
}
