export interface UserProgress {
  studiedLessons: string[];
  lastStudied: string | null;
  totalTimeSpent: number;
  completedLessons: string[];
  inProgressLessons: string[];
  accessibilitySettings: {
    highContrast: boolean;
    reducedMotion: boolean;
    screenReader: boolean;
  };
}

export interface ProgressStats {
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  completionPercentage: number;
  totalTimeSpent: number;
  averageTimePerLesson: number;
  streak: number;
  lastActivity: string | null;
}

export interface CourseProgress {
  courseId: string;
  courseName: string;
  level: string;
  language: string;
  totalLessons: number;
  completedLessons: number;
  inProgressLessons: number;
  completionPercentage: number;
  lastStudied: string | null;
}
