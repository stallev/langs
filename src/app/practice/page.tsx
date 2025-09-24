'use client';

import { Play, BookOpen, Target } from 'lucide-react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PracticeExercise } from '@/components/practice/PracticeExercise';
import { PracticeResults } from '@/components/practice/PracticeResults';
import { Button } from '@/components/ui/button';
import { usePractice } from '@/hooks/use-practice';
import type { BreadcrumbItem } from '@/types/navigation';

export default function PracticePage() {
  const breadcrumbs: BreadcrumbItem[] = [{ label: 'Practice', path: '/practice', isCurrent: true }];

  const {
    currentSession,
    isLoading,
    startPractice,
    submitAnswer,
    nextExercise,
    getCurrentExercise,
    getPracticeStats,
    resetPractice,
  } = usePractice();

  const currentExercise = getCurrentExercise();
  const practiceStats = getPracticeStats();

  const handleStartPractice = (exerciseCount: number) => {
    startPractice(exerciseCount);
  };

  const handleAnswer = (answer: string | string[]) => {
    submitAnswer(answer);
  };

  const handleNext = () => {
    nextExercise();
  };

  const handleRestart = () => {
    resetPractice();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={breadcrumbs} />
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Preparing your practice session...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
        <header className="space-y-4 mb-12">
          <h1 className="text-4xl font-light text-foreground">Practice Exercises</h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Test your knowledge with interactive exercises covering vocabulary, grammar, and
            translations.
          </p>
        </header>

        {!currentSession ? (
          /* Practice Selection */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
                <Play className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Quick Practice</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  5 exercises to test your skills
                </p>
                <Button onClick={() => handleStartPractice(5)}>Start Practice</Button>
              </div>

              <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
                <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Standard Practice</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  10 exercises for a thorough review
                </p>
                <Button onClick={() => handleStartPractice(10)}>Start Practice</Button>
              </div>

              <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
                <Target className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Intensive Practice</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  15 exercises for maximum challenge
                </p>
                <Button onClick={() => handleStartPractice(15)}>Start Practice</Button>
              </div>
            </div>

            {/* Practice Info */}
            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h2 className="text-xl font-medium text-foreground mb-4">About Practice Exercises</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">Exercise Types</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Multiple choice questions</li>
                    <li>• Fill in the blank exercises</li>
                    <li>• Translation challenges</li>
                    <li>• Vocabulary matching</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h3 className="font-medium text-foreground">Features</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Instant feedback</li>
                    <li>• Detailed explanations</li>
                    <li>• Progress tracking</li>
                    <li>• Adaptive difficulty</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : practiceStats ? (
          /* Practice Results */
          <PracticeResults stats={practiceStats} onRestart={handleRestart} />
        ) : currentExercise ? (
          /* Current Exercise */
          <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Progress</span>
                <span>
                  {currentSession.currentExerciseIndex + 1} / {currentSession.exercises.length}
                </span>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentSession.currentExerciseIndex + 1) / currentSession.exercises.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Current Exercise */}
            <PracticeExercise
              exercise={currentExercise}
              onAnswer={handleAnswer}
              onNext={handleNext}
              isLast={currentSession.currentExerciseIndex === currentSession.exercises.length - 1}
            />

            {/* Session Stats */}
            <div className="bg-muted/20 rounded-2xl p-6 border-0">
              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  Score: <span className="text-foreground font-medium">{currentSession.score}</span>
                </div>
                <Button variant="outline" onClick={handleRestart}>
                  End Practice
                </Button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
