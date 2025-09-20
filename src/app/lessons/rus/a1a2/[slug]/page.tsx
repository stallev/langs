import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import type { LessonData } from '@/shared/types/lesson';
import type { BreadcrumbItem } from '@/types/navigation';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  // Get lesson data from RUS_A1_A2_LESSONS_DATA
  const { LESSONS_BY_SLUG } = await import('@/data/rusLessonsData');
  const lessonData = LESSONS_BY_SLUG[slug];

  // Check if the lesson exists
  if (!lessonData) {
    notFound();
  }

  // Create breadcrumbs for this page
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Lessons', path: '/lessons' },
    { label: 'Russian A1-A2', path: '/lessons/rus/a1a2' },
    { label: lessonData.title, path: `/lessons/rus/a1a2/${slug}`, isCurrent: true },
  ];

  return (
    <div>
      <div className="pt-4">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <LessonRenderer lessonData={lessonData} />
    </div>
  );
}

// Generate static params for all lessons
export async function generateStaticParams() {
  try {
    // Use RUS_A1_A2_LESSONS_DATA to generate static params
    const { RUS_A1_A2_LESSONS_DATA } = await import('@/data/rusLessonsData');

    return RUS_A1_A2_LESSONS_DATA.map((lesson: LessonData) => ({
      slug: lesson.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for each lesson
export async function generateMetadata({ params }: LessonPageProps) {
  const { slug } = await params;

  try {
    const { LESSONS_BY_SLUG } = await import('@/data/rusLessonsData');
    const lessonData = LESSONS_BY_SLUG[slug];

    if (lessonData) {
      const keywords = lessonData.keywords.map((k: { word: string }) => k.word).join(', ');

      return {
        title: `${lessonData.title} - LangLearn`,
        description: lessonData.description || `Learn ${lessonData.category} with LangLearn`,
        keywords: keywords,
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Lesson - LangLearn',
    description: 'Learn Russian with LangLearn',
  };
}
