import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { VocabularyPageContent } from '@/components/vocabulary/VocabularyPageContent';
import { ENG_VOCABULARY_DATA } from '@/data/engVocabularyData';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';
import type { BreadcrumbItem } from '@/types/navigation';

export const metadata: Metadata = generateSEOMetadata(
  'English B1-B2 Vocabulary - LangLearn',
  'Master English at the intermediate level with comprehensive vocabulary including translations, examples, and categorized learning paths. Based on the Oxford 3000 word list.',
  'english vocabulary, english b1, english b2, intermediate english, english words, english dictionary, oxford 3000, english learning',
  '/vocabulary/en/b1b2',
  SEO_CONSTANTS.ROBOTS_INDEX
);

export default function EnglishVocabularyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Vocabulary', path: '/vocabulary' },
    { label: 'English B1-B2', path: '/vocabulary/en/b1b2', isCurrent: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <header className="space-y-4 mb-12">
        <h1 className="text-4xl font-light text-foreground">English B1-B2 Vocabulary</h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
          Explore {ENG_VOCABULARY_DATA.totalWords} essential English words at the B1-B2 level. Each
          word includes part of speech, translation, and usage examples.
        </p>
      </header>

      <VocabularyPageContent words={ENG_VOCABULARY_DATA.words} />
    </div>
  );
}
