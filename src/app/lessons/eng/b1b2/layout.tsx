import type { Metadata } from 'next';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.ENGLISH_B1B2_TITLE,
  SEO_CONSTANTS.ENGLISH_B1B2_DESCRIPTION,
  SEO_CONSTANTS.ENGLISH_B1B2_KEYWORDS,
  '/lessons/eng/b1b2',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function EnglishB1B2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
