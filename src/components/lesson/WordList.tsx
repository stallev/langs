import type { LessonWord } from '@/types/lesson';

interface WordListProps {
  words: LessonWord[];
  title?: string;
}

export const WordList = ({ words, title = 'Key Words' }: WordListProps) => {
  if (!words || words.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6" aria-labelledby="words-heading">
      <h2
        id="words-heading"
        className="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        {title}
      </h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {words.map((word, index) => (
          <div
            key={`${word.word}-${index}`}
            className="rounded-lg border border-border bg-card p-4 shadow-sm"
            role="listitem"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-foreground">{word.word}</h3>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                  {word.partOfSpeech}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">{word.translation}</p>

              {word.example && (
                <blockquote className="text-sm italic text-foreground border-l-2 border-primary pl-3">
                  &ldquo;{word.example}&rdquo;
                </blockquote>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WordList;
