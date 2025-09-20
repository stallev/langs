import { existsSync } from 'fs';
import { join } from 'path';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { LessonRenderer } from '@/components/lesson/LessonRenderer';
import type { BreadcrumbItem } from '@/types/navigation';

interface LessonPageProps {
  params: {
    slug: string;
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;

  // Construct the file path for the lesson
  const lessonsDir = join(process.cwd(), 'texts', 'eng', 'b1b2', 'lessons_list');
  const filePath = join(lessonsDir, `${slug}.md`);

  // Check if the file exists
  if (!existsSync(filePath)) {
    notFound();
  }

  // Create breadcrumbs for this page
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Lessons', path: '/lessons' },
    { label: 'English B1-B2', path: '/lessons/eng/b1b2' },
    { label: slug.replace(/-/g, ' '), path: `/lessons/eng/b1b2/${slug}`, isCurrent: true },
  ];

  return (
    <div className="space-y-6">
      <div className="container mx-auto px-4 pt-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      <LessonRenderer filePath={filePath} />
    </div>
  );
}

// Generate static params for all lesson files
export async function generateStaticParams() {
  const lessonsDir = join(process.cwd(), 'texts', 'eng', 'b1b2', 'lessons_list');

  try {
    const { readdirSync } = await import('fs');
    const files = readdirSync(lessonsDir);

    return files
      .filter((file: string) => file.endsWith('.md'))
      .map((file: string) => ({
        slug: file.replace(/\.md$/, ''),
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
    const lessonsDir = join(process.cwd(), 'texts', 'eng', 'b1b2', 'lessons_list');
    const filePath = join(lessonsDir, `${slug}.md`);

    if (existsSync(filePath)) {
      const { parseLessonFile } = await import('@/lib/markdown/md-parser');
      const lesson = await parseLessonFile(filePath);

      return {
        title: `${lesson.content.metadata.title} - LangLearn`,
        description:
          lesson.content.metadata.description ||
          `Learn ${lesson.content.metadata.topic} with LangLearn`,
        keywords: lesson.content.metadata.keywords.join(', '),
      };
    }
  } catch (error) {
    console.error('Error generating metadata:', error);
  }

  return {
    title: 'Lesson - LangLearn',
    description: 'Learn English with LangLearn',
  };
}
