import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { BreadcrumbItem } from '@/types/navigation';

export default function EnglishB1B2Page() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Lessons', path: '/lessons' },
    { label: 'English B1-B2', path: '/lessons/eng/b1b2', isCurrent: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
        <header className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">English B1-B2 Lessons</h1>
          <p className="text-lg text-muted-foreground">
            Learn English at the intermediate level through thematic texts with the most common
            words.
          </p>
        </header>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground mb-4">Coming Soon</h2>
            <p className="text-muted-foreground">
              The lesson list is currently being prepared. Individual lessons are available through
              direct links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'English B1-B2 Lessons - LangLearn',
  description:
    'Learn English at the intermediate level through thematic texts with the most common words.',
};
