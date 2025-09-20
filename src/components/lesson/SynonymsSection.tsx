import type { LessonSynonym } from '@/types/lesson';

interface SynonymsSectionProps {
  synonyms: LessonSynonym[];
  title?: string;
}

export const SynonymsSection = ({
  synonyms,
  title = 'Synonyms & Contextual Usage',
}: SynonymsSectionProps) => {
  if (!synonyms || synonyms.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6" aria-labelledby="synonyms-heading">
      <h2
        id="synonyms-heading"
        className="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        {title}
      </h2>

      <div className="space-y-6">
        {synonyms.map((synonymGroup, index) => (
          <div
            key={`${synonymGroup.word}-${index}`}
            className="rounded-lg border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">{synonymGroup.word}</h3>

            <div className="space-y-4">
              {synonymGroup.synonyms.map((synonym, synonymIndex) => (
                <div key={`${synonym.synonym}-${synonymIndex}`} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">{synonym.synonym}</span>
                    <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                      {synonym.context}
                    </span>
                  </div>

                  <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3">
                    &ldquo;{synonym.example}&rdquo;
                  </blockquote>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SynonymsSection;
