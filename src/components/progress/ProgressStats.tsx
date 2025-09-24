import { Clock, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';
import type { ProgressStats as ProgressStatsType } from '@/shared/types/progress';

interface ProgressStatsProps {
  stats: ProgressStatsType;
}

export const ProgressStats = ({ stats }: ProgressStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {/* Total Lessons */}
      <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
        <BookOpen className="h-8 w-8 text-primary mx-auto mb-3" />
        <div className="text-3xl font-light text-primary mb-2">{stats.totalLessons}</div>
        <div className="text-sm text-muted-foreground">Total Lessons</div>
      </div>

      {/* Completed Lessons */}
      <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
        <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
        <div className="text-3xl font-light text-green-500 mb-2">{stats.completedLessons}</div>
        <div className="text-sm text-muted-foreground">Completed</div>
      </div>

      {/* Completion Percentage */}
      <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
        <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-3" />
        <div className="text-3xl font-light text-blue-500 mb-2">{stats.completionPercentage}%</div>
        <div className="text-sm text-muted-foreground">Completion</div>
      </div>

      {/* Time Spent */}
      <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
        <Clock className="h-8 w-8 text-orange-500 mx-auto mb-3" />
        <div className="text-3xl font-light text-orange-500 mb-2">
          {Math.round(stats.totalTimeSpent)}
        </div>
        <div className="text-sm text-muted-foreground">Minutes</div>
      </div>
    </div>
  );
};

export default ProgressStats;
