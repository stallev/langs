interface GrammarNotesSectionProps {
  content: string;
  title?: string;
}

export const GrammarNotesSection = ({
  content,
  title = 'Grammar Notes',
}: GrammarNotesSectionProps) => {
  if (!content) {
    return null;
  }

  return (
    <section className="space-y-6" aria-labelledby="grammar-notes-heading">
      <h2
        id="grammar-notes-heading"
        className="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        {title}
      </h2>

      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
          aria-label="Grammar notes and explanations"
        />
      </div>
    </section>
  );
};

export default GrammarNotesSection;
