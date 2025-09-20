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
    <section className="space-y-6" aria-labelledby="related-topics-heading">
      <h2
        id="related-topics-heading"
        className="text-2xl font-semibold text-foreground border-b border-border pb-2"
      >
        {title}
      </h2>

      <div className="flex flex-wrap gap-2">
        {topics.map((topic, index) => (
          <Link
            key={index}
            href={`/lessons/eng/b1b2/${topic.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Go to lesson: ${topic}`}
          >
            {topic}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedTopicsSection;
