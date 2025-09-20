interface ExamplesSectionProps {
  examples: string[];
  title: string;
  className?: string;
}

export const ExamplesSection = ({ examples, title, className = '' }: ExamplesSectionProps) => {
  if (!examples || examples.length === 0) {
    return null;
  }

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

      <div>
        {examples.map((example, index) => (
          <div key={index} className="bg-muted/20 rounded-2xl p-4 border-0" role="listitem">
            <div className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 bg-foreground/10 text-foreground rounded-full flex items-center justify-center text-sm font-medium">
                {index + 1}
              </span>
              <p className="text-foreground leading-relaxed text-lg font-light pt-1">{example}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExamplesSection;
