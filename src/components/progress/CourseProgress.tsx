import { BookOpen, Clock, CheckCircle } from 'lucide-react';
import type { CourseProgress as CourseProgressType } from '@/shared/types/progress';

interface CourseProgressProps {
  course: CourseProgressType;
}

export const CourseProgress = ({ course }: CourseProgressProps) => {
  return (
    <div className="bg-muted/20 rounded-2xl p-6 border-0">
      <div className="space-y-4">
        {/* Course Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-medium text-foreground">{course.courseName}</h3>
            <p className="text-sm text-muted-foreground">
              {course.level} • {course.language.toUpperCase()}
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-light text-primary">{course.completionPercentage}%</div>
            <div className="text-xs text-muted-foreground">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Progress</span>
            <span>
              {course.completedLessons} / {course.totalLessons}
            </span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-sm font-medium text-foreground">{course.totalLessons}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-sm font-medium text-green-500">{course.completedLessons}</div>
            <div className="text-xs text-muted-foreground">Done</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-orange-500" />
            </div>
            <div className="text-sm font-medium text-orange-500">{course.inProgressLessons}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
        </div>

        {/* Last Studied */}
        {course.lastStudied && (
          <div className="pt-4 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Last studied:{' '}
              <span className="text-foreground font-medium">{course.lastStudied}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseProgress;
