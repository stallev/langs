import { Trophy, Clock, Target, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PracticeStats } from '@/shared/types/practice';

interface PracticeResultsProps {
  stats: PracticeStats;
  onRestart: () => void;
}

export const PracticeResults = ({ stats, onRestart }: PracticeResultsProps) => {
  const getPerformanceMessage = () => {
    if (stats.accuracy >= 90) return 'Excellent work! You&apos;re doing great!';
    if (stats.accuracy >= 70) return 'Good job! Keep practicing to improve further.';
    if (stats.accuracy >= 50) return 'Not bad! A bit more practice will help.';
    return 'Keep studying! Practice makes perfect.';
  };

  const getPerformanceColor = () => {
    if (stats.accuracy >= 90) return 'text-green-500';
    if (stats.accuracy >= 70) return 'text-blue-500';
    if (stats.accuracy >= 50) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="bg-muted/20 rounded-2xl p-8 border-0 text-center">
      <div className="space-y-6">
        {/* Trophy Icon */}
        <div className="flex justify-center">
          <Trophy className={`h-16 w-16 ${getPerformanceColor()}`} />
        </div>

        {/* Performance Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-light text-foreground">Practice Complete!</h2>
          <p className={`text-lg font-medium ${getPerformanceColor()}`}>
            {getPerformanceMessage()}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-muted/30 rounded-lg p-4">
            <Target className="h-6 w-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-light text-primary mb-1">{stats.accuracy}%</div>
            <div className="text-xs text-muted-foreground">Accuracy</div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-2xl font-light text-green-500 mb-1">{stats.correctAnswers}</div>
            <div className="text-xs text-muted-foreground">Correct</div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <div className="text-2xl font-light text-red-500 mb-1">{stats.incorrectAnswers}</div>
            <div className="text-xs text-muted-foreground">Incorrect</div>
          </div>

          <div className="bg-muted/30 rounded-lg p-4">
            <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-light text-orange-500 mb-1">{stats.timeSpent}</div>
            <div className="text-xs text-muted-foreground">Minutes</div>
          </div>
        </div>

        {/* Detailed Stats */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>Total exercises: {stats.totalExercises}</p>
          <p>Average time per exercise: {stats.averageTimePerExercise} minutes</p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button onClick={onRestart} size="lg">
            <RotateCcw className="h-4 w-4 mr-2" />
            Practice Again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticeResults;
