import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { VocabularyPageContent } from '@/components/vocabulary/VocabularyPageContent';
import { RUS_VOCABULARY_DATA } from '@/data/rusVocabularyData';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';
import type { BreadcrumbItem } from '@/types/navigation';

export const metadata: Metadata = generateSEOMetadata(
  'Russian A1-A2 Vocabulary - LangLearn',
  'Learn Russian at the beginner level with essential vocabulary including translations, examples, and categorized learning paths. Perfect for English speakers.',
  'russian vocabulary, russian a1, russian a2, beginner russian, russian words, russian dictionary, russian learning',
  '/vocabulary/ru/a1a2',
  SEO_CONSTANTS.ROBOTS_INDEX
);

export default function RussianVocabularyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Vocabulary', path: '/vocabulary' },
    { label: 'Russian A1-A2', path: '/vocabulary/ru/a1a2', isCurrent: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-4 mb-12">
        <h1 className="text-4xl font-light text-foreground">Russian A1-A2 Vocabulary</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Explore {RUS_VOCABULARY_DATA.totalWords} essential Russian words at the A1-A2 level. Each
          word includes part of speech, translation, and usage examples.
        </p>
      </header>

      <VocabularyPageContent words={RUS_VOCABULARY_DATA.words} />
    </div>
  );
}
