'use client';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LessonCard } from '@/components/lesson/LessonCard';
import { LessonFilters } from '@/components/lesson/LessonFilters';
import { Pagination } from '@/components/ui/pagination';
import { RUS_A1_A2_LESSONS_DATA } from '@/data/rusLessonsData';
import { useLessonPagination } from '@/hooks/use-lesson-pagination';
import type { LessonData } from '@/shared/types/lesson';
import type { BreadcrumbItem } from '@/types/navigation';

export default function RussianA1A2Page() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Lessons', path: '/lessons' },
    { label: 'Russian A1-A2', path: '/lessons/rus/a1a2', isCurrent: true },
  ];

  const {
    currentLessons,
    paginationState,
    filterState,
    categories,
    handleCategoryChange,
    handlePageChange,
  } = useLessonPagination({ lessons: RUS_A1_A2_LESSONS_DATA });

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
              {paginationState.totalItems}
            </div>
            <div className="text-sm text-muted-foreground">
              {filterState.category === 'all' ? 'Total Lessons' : 'Filtered Lessons'}
            </div>
          </div>
          <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
            <div className="text-3xl font-light text-primary mb-2">
              {currentLessons.reduce(
                (sum: number, lesson: LessonData) => sum + lesson.keywords.length,
                0
              )}
            </div>
            <div className="text-sm text-muted-foreground">Key Words (Current Page)</div>
          </div>
          <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
            <div className="text-3xl font-light text-primary mb-2">{categories.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>

        {/* Filters Section */}
        <LessonFilters
          categories={categories}
          selectedCategory={filterState.category}
          onCategoryChange={handleCategoryChange}
        />

        {/* Lessons Section */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-light text-foreground">
              {filterState.category === 'all' ? 'All Lessons' : 'Filtered Lessons'}
            </h2>
            <p className="text-muted-foreground">
              Showing {currentLessons.length} of {paginationState.totalItems} lessons
              {paginationState.totalPages > 1 &&
                ` (Page ${paginationState.currentPage} of ${paginationState.totalPages})`}
            </p>
          </div>

          {currentLessons.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentLessons.map((lesson: LessonData) => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>

              <Pagination
                currentPage={paginationState.currentPage}
                totalPages={paginationState.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                No lessons found matching your criteria.
              </p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
