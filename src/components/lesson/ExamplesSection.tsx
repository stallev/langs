import type { LessonExample, LessonPhrase } from '@/types/lessons';

interface ExamplesSectionProps {
  examples?: LessonExample[];
  phrases?: LessonPhrase[];
  title: string;
  className?: string;
}

export const ExamplesSection = ({
  examples,
  phrases,
  title,
  className = '',
}: ExamplesSectionProps) => {
  // Check if we have either examples or phrases
  if ((!examples || examples.length === 0) && (!phrases || phrases.length === 0)) {
    return null;
  }

  // Determine which data to use
  const items = examples || phrases || [];

  return (
    <section
      className={`space-y-8 ${className}`}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
    >
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
        className="text-3xl font-light text-foreground tracking-tight"
      >
        {title}
      </h2>

      <div
        className={`${title === 'Practical Phrases' ? 'grid grid-cols-1 xl:grid-cols-2 gap-4' : 'space-y-4'}`}
      >
        {items.map((item, index) => {
          // Determine the text to display based on whether it's an example or phrase
          const displayText = 'example' in item ? item.example : item.phrase;
          const translation = 'translation' in item ? item.translation : null;
          const word = 'word' in item ? item.word : null;

          return (
            <div key={index} className="bg-muted/20 rounded-2xl p-4 border-0" role="listitem">
              <div className="flex items-start gap-4">
                <span className="flex-shrink-0 w-8 h-8 bg-foreground/10 text-foreground rounded-full flex items-center justify-center text-sm font-medium">
                  {index + 1}
                </span>
                <div className="space-y-2 pt-1">
                  {word && <span className="text-sm font-medium text-primary">{word}</span>}
                  <p className="text-foreground leading-relaxed text-lg font-light">
                    {displayText}
                  </p>
                  {translation && (
                    <p className="text-muted-foreground text-sm italic">{translation}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExamplesSection;
