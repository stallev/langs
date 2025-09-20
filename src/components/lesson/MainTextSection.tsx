interface MainTextSectionProps {
  content: string;
  title?: string;
}

export const MainTextSection = ({ content, title = 'Main Text' }: MainTextSectionProps) => {
  if (!content) {
    return null;
  }

  return (
    <section className="space-y-8" aria-labelledby="main-text-heading">
      <h2 id="main-text-heading" className="text-3xl font-light text-foreground tracking-tight">
        {title}
      </h2>

      <div className="bg-muted/20 rounded-2xl p-8 border-0">
        <div
          className="prose prose-lg prose-gray dark:prose-invert max-w-none leading-relaxed [&>p]:mb-6 [&>p:last-child]:mb-0"
          style={{
            lineHeight: '1.7',
            fontSize: '1.125rem',
          }}
          dangerouslySetInnerHTML={{ __html: content }}
          role="article"
          aria-label="Main lesson content"
        />
      </div>
    </section>
  );
};

export default MainTextSection;
