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
        <header className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{lesson.content.metadata.title}</h1>

            {lesson.content.metadata.description && (
              <p className="text-lg text-muted-foreground">{lesson.content.metadata.description}</p>
            )}
          </div>

          {/* Lesson Metadata */}
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <span className="font-medium">Level:</span>
                {lesson.content.metadata.level}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Topic:</span>
                {lesson.content.metadata.topic}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Time:</span>
                {lesson.content.metadata.estimatedTime}
              </span>
              <span className="flex items-center gap-1">
                <span className="font-medium">Difficulty:</span>
                <span className="capitalize">{lesson.content.metadata.difficulty}</span>
              </span>
            </div>

            {/* Keywords */}
            {lesson.content.metadata.keywords.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {lesson.content.metadata.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
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
