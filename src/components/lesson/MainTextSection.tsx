interface MainTextSectionProps {
  content: string;
  title?: string;
}

export const MainTextSection = ({ content, title = 'Main Text' }: MainTextSectionProps) => {
  if (!content) {
    return null;
  }

  return (
    <section className="space-y-6" aria-labelledby="main-text-heading">
      <h2
        id="main-text-heading"
        className="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        {title}
      </h2>

      <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
        <div
          className="prose prose-gray dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
          aria-label="Main lesson content"
        />
      </div>
    </section>
  );
};

export default MainTextSection;
