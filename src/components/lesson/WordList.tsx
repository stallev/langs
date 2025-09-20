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
    <section className="space-y-8" aria-labelledby="words-heading">
      <h2 id="words-heading" className="text-3xl font-light text-foreground tracking-tight">
        {title}
      </h2>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {words.map((word, index) => (
          <div
            key={`${word.word}-${index}`}
            className="bg-muted/20 rounded-2xl p-4 border-0"
            role="listitem"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-foreground">{word.word}</h3>
                <span className="text-xs text-muted-foreground bg-foreground/10 px-3 py-1.5 rounded-full font-medium">
                  {word.partOfSpeech}
                </span>
              </div>

              <p className="text-muted-foreground font-light">{word.translation}</p>

              {word.example && (
                <blockquote className="text-sm italic text-foreground/80 border-l-4 border-foreground/20 pl-4 py-2 bg-foreground/5 rounded-r-lg">
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
