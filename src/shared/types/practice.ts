export interface PracticeExercise {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'matching';
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  language: 'en' | 'ru';
  level: string;
}

export interface PracticeSession {
  id: string;
  exercises: PracticeExercise[];
  currentExerciseIndex: number;
  answers: Record<string, string | string[]>;
  score: number;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

export interface PracticeStats {
  totalExercises: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  timeSpent: number;
  averageTimePerExercise: number;
}
