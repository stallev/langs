import Link from 'next/link';

interface RelatedTopicsSectionProps {
  topics: string[];
  title?: string;
}

export const RelatedTopicsSection = ({
  topics,
  title = 'Related Topics',
}: RelatedTopicsSectionProps) => {
  if (!topics || topics.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8" aria-labelledby="related-topics-heading">
      <h2
        id="related-topics-heading"
        className="text-3xl font-light text-foreground tracking-tight"
      >
        {title}
      </h2>

      <div className="bg-muted/20 rounded-2xl p-8 border-0">
        <div className="flex flex-wrap gap-4">
          {topics.map((topic, index) => (
            <Link
              key={index}
              href={`/lessons/eng/b1b2/${topic.toLowerCase().replace(/\s+/g, '-')}`}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-foreground/10 text-foreground hover:bg-foreground/20 transition-colors focus:outline-none focus:ring-2 focus:ring-foreground/30 focus:ring-offset-2"
              aria-label={`Go to lesson: ${topic}`}
            >
              {topic}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTopicsSection;
