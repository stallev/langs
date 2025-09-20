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
      className={`space-y-6 ${className}`}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
    >
      <h2
        id={`${title.toLowerCase().replace(/\s+/g, '-')}-heading`}
        className="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        {title}
      </h2>

      <ul className="space-y-4" role="list">
        {examples.map((example, index) => (
          <li
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card shadow-sm"
            role="listitem"
          >
            <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <p className="text-foreground leading-relaxed">{example}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ExamplesSection;
