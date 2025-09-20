import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LessonCard } from '@/components/lesson/LessonCard';
import { RUS_A1_A2_LESSONS_DATA, LESSONS_BY_CATEGORY } from '@/data/rusLessonsData';
import type { LessonData } from '@/shared/types/lesson';
import type { BreadcrumbItem } from '@/types/navigation';

export default function RussianA1A2Page() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Lessons', path: '/lessons' },
    { label: 'Russian A1-A2', path: '/lessons/rus/a1a2', isCurrent: true },
  ];

  const categories = Object.keys(LESSONS_BY_CATEGORY).sort();

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-6xl mx-auto">
        <header className="space-y-4 mb-12">
          <h1 className="text-4xl font-light text-foreground">Russian A1-A2 Lessons</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Learn Russian at the beginner level through {RUS_A1_A2_LESSONS_DATA.length} carefully
            crafted thematic texts with the most common words and practical usage examples.
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
            <div className="text-3xl font-light text-primary mb-2">
              {RUS_A1_A2_LESSONS_DATA.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Lessons</div>
          </div>
          <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
            <div className="text-3xl font-light text-primary mb-2">
              {RUS_A1_A2_LESSONS_DATA.reduce(
                (sum: number, lesson: LessonData) => sum + lesson.keywords.length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Key Words</div>
          </div>
          <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
            <div className="text-3xl font-light text-primary mb-2">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>

        {/* All Lessons Section */}
        <section className="mt-16 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-foreground">All Lessons</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {RUS_A1_A2_LESSONS_DATA.map((lesson: LessonData) => (
              <LessonCard key={lesson.id} lesson={lesson} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Russian A1-A2 Lessons - LangLearn',
  description:
    'Learn Russian at the beginner level through thematic texts with the most common words.',
};
