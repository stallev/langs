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
    <section className="space-y-8" aria-labelledby="grammar-notes-heading">
      <h2 id="grammar-notes-heading" className="text-3xl font-light text-foreground tracking-tight">
        {title}
      </h2>

      <div className="bg-muted/20 rounded-2xl p-8 border-0">
        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none leading-relaxed [&>p]:mb-6 [&>p:last-child]:mb-0 [&>ul]:mb-6 [&>ul:last-child]:mb-0 [&>li]:mb-2"
          style={{
            lineHeight: '1.7',
            fontSize: '1.125rem',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
          aria-label="Grammar notes and explanations"
        />
      </div>
    </section>
  );
};

export default GrammarNotesSection;
