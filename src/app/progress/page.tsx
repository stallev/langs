'use client';

import { Trash2, BookOpen } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { CourseProgress } from '@/components/progress/CourseProgress';
import { ProgressStats } from '@/components/progress/ProgressStats';
import { Button } from '@/components/ui/button';
import { ENG_B1_B2_LESSONS_DATA } from '@/data/lessonsData';
import { RUS_A1_A2_LESSONS_DATA } from '@/data/rusLessonsData';
import { useProgress } from '@/hooks/use-progress';
import type { CourseProgress as CourseProgressType } from '@/shared/types/progress';
import type { BreadcrumbItem } from '@/types/navigation';

export default function ProgressPage() {
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Progress', path: '/progress', isCurrent: true }];

  const { progress, isLoading, getProgressStats, resetProgress, isLessonCompleted } = useProgress();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your progress...</p>
          </div>
        </div>
      </div>
    );
  }

  const stats = getProgressStats();

  // Calculate course progress
  const courses: CourseProgressType[] = [
    {
      courseId: 'eng-b1b2',
      courseName: 'English B1-B2',
      level: 'B1-B2',
      language: 'en',
      totalLessons: ENG_B1_B2_LESSONS_DATA.length,
      completedLessons: ENG_B1_B2_LESSONS_DATA.filter(lesson => isLessonCompleted(lesson.slug))
        .length,
      inProgressLessons: 0, // TODO: Implement in-progress tracking
      completionPercentage: Math.round(
        (ENG_B1_B2_LESSONS_DATA.filter(lesson => isLessonCompleted(lesson.slug)).length /
          ENG_B1_B2_LESSONS_DATA.length) *
          100
      ),
      lastStudied: null, // TODO: Implement last studied tracking
    },
    {
      courseId: 'rus-a1a2',
      courseName: 'Russian A1-A2',
      level: 'A1-A2',
      language: 'ru',
      totalLessons: RUS_A1_A2_LESSONS_DATA.length,
      completedLessons: RUS_A1_A2_LESSONS_DATA.filter(lesson => isLessonCompleted(lesson.slug))
        .length,
      inProgressLessons: 0, // TODO: Implement in-progress tracking
      completionPercentage: Math.round(
        (RUS_A1_A2_LESSONS_DATA.filter(lesson => isLessonCompleted(lesson.slug)).length /
          RUS_A1_A2_LESSONS_DATA.length) *
          100
      ),
      lastStudied: null, // TODO: Implement last studied tracking
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-6xl mx-auto">
        <header className="space-y-4 mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-light text-foreground">Your Progress</h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mt-2">
                Track your learning journey and see how much you&apos;ve accomplished.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={resetProgress}
                className="text-muted-foreground hover:text-foreground"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Reset Progress
              </Button>
            </div>
          </div>
        </header>

        {/* Overall Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-foreground mb-6">Overall Statistics</h2>
          <ProgressStats stats={stats} />
        </section>

        {/* Course Progress */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-foreground mb-6">Course Progress</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map(course => (
              <CourseProgress key={course.courseId} course={course} />
            ))}
          </div>
        </section>

        {/* Recent Activity */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-foreground mb-6">Recent Activity</h2>
          <div className="bg-muted/20 rounded-2xl p-8 border-0">
            {progress.studiedLessons.length > 0 ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  You&apos;ve studied {progress.studiedLessons.length} lessons so far.
                </p>
                <div className="flex flex-wrap gap-2">
                  {progress.studiedLessons.slice(-10).map(lessonId => (
                    <span
                      key={lessonId}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        isLessonCompleted(lessonId)
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-orange-500/10 text-orange-500'
                      }`}
                    >
                      {lessonId}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No lessons studied yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your learning journey by exploring our lessons.
                </p>
                <Button asChild>
                  <a href="/lessons">Browse Lessons</a>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Accessibility Settings */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-foreground mb-6">Accessibility Settings</h2>
          <div className="bg-muted/20 rounded-2xl p-8 border-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">High Contrast</h3>
                <p className="text-sm text-muted-foreground">
                  {progress.accessibilitySettings.highContrast ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Reduced Motion</h3>
                <p className="text-sm text-muted-foreground">
                  {progress.accessibilitySettings.reducedMotion ? 'Enabled' : 'Disabled'}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-foreground">Screen Reader</h3>
                <p className="text-sm text-muted-foreground">
                  {progress.accessibilitySettings.screenReader ? 'Enabled' : 'Disabled'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
