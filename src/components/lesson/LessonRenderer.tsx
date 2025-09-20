import { parseLessonFile } from '@/lib/markdown/md-parser';
import type { ParsedLesson } from '@/types/lesson';
import { ExamplesSection } from './ExamplesSection';
import { GrammarNotesSection } from './GrammarNotesSection';
import { MainTextSection } from './MainTextSection';
import { RelatedTopicsSection } from './RelatedTopicsSection';
import { SynonymsSection } from './SynonymsSection';
import { WordList } from './WordList';

interface LessonRendererProps {
  filePath: string;
}

export const LessonRenderer = async ({ filePath }: LessonRendererProps) => {
  try {
    // Parse the lesson file
    const lesson: ParsedLesson = await parseLessonFile(filePath);

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
              {lesson.content.metadata.title}
            </h1>

            {lesson.content.metadata.description && (
              <p className="text-xl text-muted-foreground leading-relaxed font-light">
                {lesson.content.metadata.description}
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
                <p className="text-foreground font-medium">{lesson.content.metadata.level}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Topic
                </span>
                <p className="text-foreground font-medium">{lesson.content.metadata.topic}</p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Time
                </span>
                <p className="text-foreground font-medium">
                  {lesson.content.metadata.estimatedTime}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-muted-foreground font-medium uppercase tracking-wide text-xs">
                  Difficulty
                </span>
                <p className="text-foreground font-medium capitalize">
                  {lesson.content.metadata.difficulty}
                </p>
              </div>
            </div>

            {/* Keywords */}
            {lesson.content.metadata.keywords.length > 0 && (
              <div className="mt-8 pt-6 border-t border-border/50">
                <div className="flex flex-wrap gap-3">
                  {lesson.content.metadata.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-background/60 text-muted-foreground rounded-full text-sm font-medium border border-border/30"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Key Words Section */}
        <WordList words={lesson.content.words} />

        {/* Main Text Section */}
        <MainTextSection content={lesson.content.mainText} />

        {/* Additional Examples Section */}
        <ExamplesSection examples={lesson.content.additionalExamples} title="Additional Examples" />

        {/* Practical Phrases Section */}
        <ExamplesSection examples={lesson.content.practicalPhrases} title="Practical Phrases" />

        {/* Synonyms Section */}
        <SynonymsSection synonyms={lesson.content.synonyms} />

        {/* Grammar Notes Section */}
        <GrammarNotesSection content={lesson.content.grammarNotes} />

        {/* Related Topics Section */}
        <RelatedTopicsSection topics={lesson.content.relatedTopics} />

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
