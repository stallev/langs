'use client';

import { useState, useCallback } from 'react';
import type { PracticeExercise, PracticeSession, PracticeStats } from '@/shared/types/practice';

// Sample exercises for demonstration
const sampleExercises: PracticeExercise[] = [
  {
    id: '1',
    type: 'multiple-choice',
    question: 'What is the English translation of "привет"?',
    options: ['Hello', 'Goodbye', 'Thank you', 'Please'],
    correctAnswer: 'Hello',
    explanation: '"Привет" is a casual way to say "hello" in Russian.',
    difficulty: 'easy',
    category: 'greetings',
    language: 'ru',
    level: 'A1-A2',
  },
  {
    id: '2',
    type: 'fill-blank',
    question: 'Complete the sentence: "I _____ to school every day."',
    correctAnswer: 'go',
    explanation: 'The verb "go" is used with "to" to indicate movement towards a place.',
    difficulty: 'easy',
    category: 'verbs',
    language: 'en',
    level: 'B1-B2',
  },
  {
    id: '3',
    type: 'translation',
    question: 'Translate to English: "Как дела?"',
    correctAnswer: 'How are you?',
    explanation:
      '&ldquo;Как дела?&rdquo; is a common Russian greeting meaning &ldquo;How are you?&rdquo; or &ldquo;How are things?&rdquo;',
    difficulty: 'medium',
    category: 'greetings',
    language: 'ru',
    level: 'A1-A2',
  },
  {
    id: '4',
    type: 'multiple-choice',
    question: 'Which word means "book" in Russian?',
    options: ['книга', 'дом', 'машина', 'вода'],
    correctAnswer: 'книга',
    explanation: '&ldquo;Книга&rdquo; is the Russian word for &ldquo;book&rdquo;.',
    difficulty: 'easy',
    category: 'vocabulary',
    language: 'ru',
    level: 'A1-A2',
  },
  {
    id: '5',
    type: 'fill-blank',
    question: 'Complete the sentence: "She _____ a beautiful song yesterday."',
    correctAnswer: 'sang',
    explanation: 'The past tense of "sing" is "sang".',
    difficulty: 'medium',
    category: 'verbs',
    language: 'en',
    level: 'B1-B2',
  },
];

export function usePractice() {
  const [currentSession, setCurrentSession] = useState<PracticeSession | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Start a new practice session
  const startPractice = useCallback((exerciseCount: number = 5) => {
    setIsLoading(true);

    // Shuffle and select exercises
    const shuffled = [...sampleExercises].sort(() => Math.random() - 0.5);
    const selectedExercises = shuffled.slice(0, Math.min(exerciseCount, sampleExercises.length));

    const newSession: PracticeSession = {
      id: Date.now().toString(),
      exercises: selectedExercises,
      currentExerciseIndex: 0,
      answers: {},
      score: 0,
      completed: false,
      startedAt: new Date(),
    };

    setCurrentSession(newSession);
    setIsLoading(false);
  }, []);

  // Submit an answer for the current exercise
  const submitAnswer = useCallback(
    (answer: string | string[]) => {
      if (!currentSession) return;

      const currentExercise = currentSession.exercises[currentSession.currentExerciseIndex];
      const isCorrect = Array.isArray(currentExercise.correctAnswer)
        ? JSON.stringify(answer) === JSON.stringify(currentExercise.correctAnswer)
        : answer === currentExercise.correctAnswer;

      setCurrentSession(prev => {
        if (!prev) return null;

        const newAnswers = { ...prev.answers, [currentExercise.id]: answer };
        const newScore = isCorrect ? prev.score + 1 : prev.score;

        return {
          ...prev,
          answers: newAnswers,
          score: newScore,
        };
      });
    },
    [currentSession]
  );

  // Move to the next exercise
  const nextExercise = useCallback(() => {
    if (!currentSession) return;

    const nextIndex = currentSession.currentExerciseIndex + 1;

    if (nextIndex >= currentSession.exercises.length) {
      // Session completed
      setCurrentSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          completed: true,
          completedAt: new Date(),
        };
      });
    } else {
      // Move to next exercise
      setCurrentSession(prev => {
        if (!prev) return null;
        return {
          ...prev,
          currentExerciseIndex: nextIndex,
        };
      });
    }
  }, [currentSession]);

  // Get current exercise
  const getCurrentExercise = useCallback((): PracticeExercise | null => {
    if (!currentSession) return null;
    return currentSession.exercises[currentSession.currentExerciseIndex] || null;
  }, [currentSession]);

  // Get practice stats
  const getPracticeStats = useCallback((): PracticeStats | null => {
    if (!currentSession || !currentSession.completed) return null;

    const totalExercises = currentSession.exercises.length;
    const correctAnswers = currentSession.score;
    const incorrectAnswers = totalExercises - correctAnswers;
    const accuracy = Math.round((correctAnswers / totalExercises) * 100);
    const timeSpent = currentSession.completedAt
      ? Math.round(
          (currentSession.completedAt.getTime() - currentSession.startedAt.getTime()) / 1000 / 60
        )
      : 0;
    const averageTimePerExercise = totalExercises > 0 ? Math.round(timeSpent / totalExercises) : 0;

    return {
      totalExercises,
      correctAnswers,
      incorrectAnswers,
      accuracy,
      timeSpent,
      averageTimePerExercise,
    };
  }, [currentSession]);

  // Reset practice session
  const resetPractice = useCallback(() => {
    setCurrentSession(null);
  }, []);

  return {
    currentSession,
    isLoading,
    startPractice,
    submitAnswer,
    nextExercise,
    getCurrentExercise,
    getPracticeStats,
    resetPractice,
  };
}
