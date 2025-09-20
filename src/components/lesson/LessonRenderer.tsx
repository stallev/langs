import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { LessonData } from '@/shared/types/lesson';
import { ExamplesSection } from './ExamplesSection';
import { GrammarNotesSection } from './GrammarNotesSection';
import { MainTextSection } from './MainTextSection';
import { RelatedTopicsSection } from './RelatedTopicsSection';
import { SynonymsSection } from './SynonymsSection';
import { WordList } from './WordList';

interface LessonRendererProps {
  lessonData: LessonData;
}

/**
 * Convert markdown text to HTML
 */
async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const processedContent = await remark().use(remarkHtml).process(markdown);
  return processedContent.toString();
}

export const LessonRenderer = async ({ lessonData }: LessonRendererProps) => {
  try {
    // Convert markdown text to HTML
    const mainTextHtml = await convertMarkdownToHtml(lessonData.mainText);
    const grammarNotesHtml = lessonData.grammarNotes
      ? await convertMarkdownToHtml(lessonData.grammarNotes)
      : '';

    return (
      <article
        className="container mx-auto px-4 py-8 max-w-4xl space-y-8"
        role="main"
        aria-label="Lesson content"
      >
        {/* Lesson Header */}
        <header className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-4xl font-light text-foreground leading-tight tracking-tight">
              {lessonData.title}
            </h1>

            {lessonData.description && (
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {lessonData.description}
              </p>
            )}
          </div>

          {/* Lesson Metadata - Apple Books style */}
          <div className="bg-muted/30 rounded-2xl p-8 border-0">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Level
                </span>
                <p className="text-foreground font-medium">{lessonData.level}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Category
                </span>
                <p className="text-foreground font-medium">{lessonData.category}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Language
                </span>
                <p className="text-foreground font-medium">{lessonData.language.toUpperCase()}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Words
                </span>
                <p className="text-foreground font-medium">{lessonData.keywords.length}</p>
              </div>
            </div>

            {/* Keywords */}
            {lessonData.keywords.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-wrap gap-3">
                  {lessonData.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-background/60 text-muted-foreground rounded-full text-sm font-medium border border-border/30"
                    >
                      {keyword.word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Key Words Section */}
        <WordList keywords={lessonData.keywords} />

        {/* Main Text Section */}
        <MainTextSection content={mainTextHtml} />

        {/* Additional Examples Section */}
        <ExamplesSection examples={lessonData.additionalExamples} title="Additional Examples" />

        {/* Practical Phrases Section */}
        <ExamplesSection phrases={lessonData.practicalPhrases} title="Practical Phrases" />

        {/* Synonyms Section */}
        <SynonymsSection synonyms={lessonData.synonyms} />

        {/* Grammar Notes Section */}
        <GrammarNotesSection content={grammarNotesHtml} />

        {/* Related Topics Section */}
        <RelatedTopicsSection topics={lessonData.relatedTopics} />

        {/* Skip to top link for accessibility */}
        <div className="pt-8">
          <a
            href="#main-content"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="Skip to top of page"
          >
            ↑ Back to top
          </a>
        </div>
      </article>
    );
  } catch (error) {
    console.error('Error rendering lesson:', error);

    return (
      <div className="max-w-4xl mx-auto" role="alert" aria-live="polite">
        <div className="rounded-lg border border-destructive bg-destructive/10 p-6">
          <h2 className="text-lg font-semibold text-destructive mb-2">Error Loading Lesson</h2>
          <p className="text-destructive/80">
            Sorry, there was an error loading this lesson. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default LessonRenderer;
