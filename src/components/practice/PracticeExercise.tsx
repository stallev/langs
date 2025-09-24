'use client';

import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { PracticeExercise as PracticeExerciseType } from '@/shared/types/practice';

interface PracticeExerciseProps {
  exercise: PracticeExerciseType;
  onAnswer: (answer: string | string[]) => void;
  onNext: () => void;
  isLast: boolean;
}

export const PracticeExercise = ({ exercise, onAnswer, onNext, isLast }: PracticeExerciseProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | string[] | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = Array.isArray(exercise.correctAnswer)
      ? Array.isArray(selectedAnswer)
        ? JSON.stringify(selectedAnswer.sort()) === JSON.stringify(exercise.correctAnswer.sort())
        : false
      : selectedAnswer === exercise.correctAnswer;

    setIsCorrect(correct);
    setShowResult(true);
    onAnswer(selectedAnswer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    setIsCorrect(false);
    onNext();
  };

  const renderExercise = () => {
    switch (exercise.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <p className="text-lg text-foreground">{exercise.question}</p>
            <div className="space-y-2">
              {exercise.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded-lg border transition-colors ${
                    selectedAnswer === option
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  } ${showResult ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <p className="text-lg text-foreground">{exercise.question}</p>
            <Input
              value={(selectedAnswer as string) || ''}
              onChange={e => setSelectedAnswer(e.target.value)}
              placeholder="Type your answer here..."
              disabled={showResult}
              className="max-w-md"
            />
          </div>
        );

      case 'translation':
        return (
          <div className="space-y-4">
            <p className="text-lg text-foreground">{exercise.question}</p>
            <Input
              value={(selectedAnswer as string) || ''}
              onChange={e => setSelectedAnswer(e.target.value)}
              placeholder="Type your translation here..."
              disabled={showResult}
              className="max-w-md"
            />
          </div>
        );

      default:
        return <p>Unsupported exercise type</p>;
    }
  };

  return (
    <div className="bg-muted/20 rounded-2xl p-8 border-0">
      <div className="space-y-6">
        {/* Exercise Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              {exercise.difficulty}
            </span>
            <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-sm font-medium rounded-full">
              {exercise.category}
            </span>
          </div>
          {showResult && (
            <div className="flex items-center gap-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span
                className={`text-sm font-medium ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
              >
                {isCorrect ? 'Correct!' : 'Incorrect'}
              </span>
            </div>
          )}
        </div>

        {/* Exercise Content */}
        {renderExercise()}

        {/* Result and Explanation */}
        {showResult && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Correct answer:</p>
              <p className="text-foreground font-medium">
                {Array.isArray(exercise.correctAnswer)
                  ? exercise.correctAnswer.join(', ')
                  : exercise.correctAnswer}
              </p>
            </div>
            {exercise.explanation && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Explanation:</p>
                <p className="text-foreground">{exercise.explanation}</p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedAnswer(null);
              setShowResult(false);
              setIsCorrect(false);
            }}
            disabled={!showResult}
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>

          {!showResult ? (
            <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
              Submit Answer
            </Button>
          ) : (
            <Button onClick={handleNext}>{isLast ? 'Finish Practice' : 'Next Exercise'}</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PracticeExercise;
