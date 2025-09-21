import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  CATEGORY_DESCRIPTIONS,
  CATEGORY_DESCRIPTIONS_EN,
} from '@/shared/constants/lessonCategories';
import type { LessonData } from '@/shared/types/lesson';

interface LessonCardProps {
  lesson: LessonData;
  className?: string;
  categoryLanguage?: 'ru' | 'en';
}

export const LessonCard = ({ lesson, className, categoryLanguage = 'ru' }: LessonCardProps) => {
  // Получаем читабельное название категории
  const getCategoryDisplayName = (category: string) => {
    const categoryKey = category as keyof typeof CATEGORY_DESCRIPTIONS;
    const descriptions =
      categoryLanguage === 'en' ? CATEGORY_DESCRIPTIONS_EN : CATEGORY_DESCRIPTIONS;

    if (descriptions[categoryKey]) {
      return descriptions[categoryKey].split(' (')[0]; // Берем только основную часть без описания в скобках
    }
    return category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Link
      href={lesson.url}
      className={cn(
        'group block bg-card rounded-xl border border-border/50 shadow-sm transition-all duration-300',
        'hover:shadow-md hover:border-border hover:-translate-y-1',
        'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
        className
      )}
    >
      <div className="p-6 space-y-5">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Lesson {lesson.id}</span>
              <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full font-medium">
                {lesson.level}
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
              {lesson.title}
            </h3>
            {lesson.titleRu && (
              <p className="text-sm text-muted-foreground font-medium">{lesson.titleRu}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {lesson.description}
        </p>

        {/* Keywords preview */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Key Words
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {lesson.keywords.slice(0, 6).map((keyword, index) => (
              <span
                key={index}
                className="text-xs bg-muted/60 text-foreground rounded-md px-2.5 py-1 border border-border/40 font-medium"
              >
                {keyword.word}
              </span>
            ))}
            {lesson.keywords.length > 6 && (
              <span className="text-xs text-muted-foreground px-2.5 py-1 font-medium">
                +{lesson.keywords.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Footer with stats and category */}
        <div className="pt-4 border-t border-border/40 space-y-3">
          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="font-medium">{lesson.keywords.length} words</span>
              <span className="font-medium">{lesson.additionalExamples.length} examples</span>
              <span className="font-medium">{lesson.practicalPhrases.length} phrases</span>
            </div>
          </div>

          {/* Category */}
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-medium">Category:</span>
            <span className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-md font-medium group-hover:bg-primary/20 transition-colors">
              {getCategoryDisplayName(lesson.category)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
