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
    <section className="space-y-8" aria-labelledby="synonyms-heading">
      <h2 id="synonyms-heading" className="text-3xl font-light text-foreground tracking-tight">
        {title}
      </h2>

      <div className="space-y-8">
        {synonyms.map((synonymGroup, index) => (
          <div
            key={`${synonymGroup.word}-${index}`}
            className="bg-muted/20 rounded-2xl p-8 border-0"
          >
            <h3 className="text-2xl font-light text-foreground mb-6">{synonymGroup.word}</h3>

            <div className="space-y-6">
              {synonymGroup.synonyms.map((synonym, synonymIndex) => (
                <div key={`${synonym.synonym}-${synonymIndex}`} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-medium text-foreground">{synonym.synonym}</span>
                    <span className="text-sm text-muted-foreground bg-foreground/10 px-3 py-1.5 rounded-full font-medium">
                      {synonym.context}
                    </span>
                  </div>

                  <blockquote className="text-lg text-muted-foreground italic border-l-4 border-foreground/20 pl-4 py-2 bg-foreground/5 rounded-r-lg">
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
