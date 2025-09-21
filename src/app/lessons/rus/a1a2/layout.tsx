import type { Metadata } from 'next';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.RUSSIAN_A1A2_TITLE,
  SEO_CONSTANTS.RUSSIAN_A1A2_DESCRIPTION,
  SEO_CONSTANTS.RUSSIAN_A1A2_KEYWORDS,
  '/lessons/rus/a1a2',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function RussianA1A2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
