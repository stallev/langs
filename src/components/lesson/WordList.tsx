import type { LessonKeyword } from '@/types/lessons';

interface WordListProps {
  keywords: LessonKeyword[];
  title?: string;
}

export const WordList = ({ keywords, title = 'Key Words' }: WordListProps) => {
  if (!keywords || keywords.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8" aria-labelledby="words-heading">
      <h2 id="words-heading" className="text-3xl font-light text-foreground tracking-tight">
        {title}
      </h2>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        {keywords.map((keyword, index) => (
          <div
            key={`${keyword.word}-${index}`}
            className="bg-muted/20 rounded-2xl p-4 border-0"
            role="listitem"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-medium text-foreground">{keyword.word}</h3>
                <span className="text-xs text-muted-foreground bg-foreground/10 px-3 py-1.5 rounded-full font-medium">
                  {keyword.partOfSpeech}
                </span>
              </div>

              <p className="text-muted-foreground font-light">{keyword.translation}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WordList;
