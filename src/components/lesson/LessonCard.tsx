import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { LessonData } from '@/shared/types/lesson';

interface LessonCardProps {
  lesson: LessonData;
  className?: string;
}

export const LessonCard = ({ lesson, className }: LessonCardProps) => {
  return (
    <Link
      href={lesson.url}
      className={cn(
        'group block bg-muted/20 rounded-2xl p-6 border-0 transition-all duration-200 hover:bg-muted/30 hover:shadow-lg',
        className
      )}
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">Lesson {lesson.id}</span>
              <span className="text-xs bg-foreground/10 px-2 py-1 rounded-full">
                {lesson.level}
              </span>
            </div>
            <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
              {lesson.title}
            </h3>
            {lesson.titleRu && <p className="text-sm text-muted-foreground">{lesson.titleRu}</p>}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
          {lesson.description}
        </p>

        {/* Keywords preview */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Key Words
          </h4>
          <div className="flex flex-wrap gap-1">
            {lesson.keywords.slice(0, 6).map((keyword, index) => (
              <span
                key={index}
                className="text-xs bg-background/60 rounded-full px-2 py-1 text-foreground border border-border/30"
              >
                {keyword.word}
              </span>
            ))}
            {lesson.keywords.length > 6 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{lesson.keywords.length - 6} more
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{lesson.keywords.length} words</span>
            <span>{lesson.additionalExamples.length} examples</span>
            <span>{lesson.practicalPhrases.length} phrases</span>
          </div>
          <div className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            {lesson.category}
          </div>
        </div>
      </div>
    </Link>
  );
};
