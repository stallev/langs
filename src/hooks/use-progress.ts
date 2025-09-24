'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProgress, ProgressStats } from '@/shared/types/progress';

const PROGRESS_STORAGE_KEY = 'language-learning-progress';

const defaultProgress: UserProgress = {
  studiedLessons: [],
  lastStudied: null,
  totalTimeSpent: 0,
  completedLessons: [],
  inProgressLessons: [],
  accessibilitySettings: {
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
  },
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoading, setIsLoading] = useState(true);

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PROGRESS_STORAGE_KEY);
      if (stored) {
        const parsedProgress = JSON.parse(stored);
        setProgress({ ...defaultProgress, ...parsedProgress });
      }
    } catch (error) {
      console.error('Error loading progress from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
      } catch (error) {
        console.error('Error saving progress to localStorage:', error);
      }
    }
  }, [progress, isLoading]);

  // Mark lesson as completed
  const markLessonCompleted = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      completedLessons: [...new Set([...prev.completedLessons, lessonId])],
      inProgressLessons: prev.inProgressLessons.filter(id => id !== lessonId),
      studiedLessons: [...new Set([...prev.studiedLessons, lessonId])],
      lastStudied: lessonId,
    }));
  }, []);

  // Mark lesson as in progress
  const markLessonInProgress = useCallback((lessonId: string) => {
    setProgress(prev => ({
      ...prev,
      inProgressLessons: [...new Set([...prev.inProgressLessons, lessonId])],
      studiedLessons: [...new Set([...prev.studiedLessons, lessonId])],
      lastStudied: lessonId,
    }));
  }, []);

  // Add time spent
  const addTimeSpent = useCallback((minutes: number) => {
    setProgress(prev => ({
      ...prev,
      totalTimeSpent: prev.totalTimeSpent + minutes,
    }));
  }, []);

  // Update accessibility settings
  const updateAccessibilitySettings = useCallback(
    (settings: Partial<UserProgress['accessibilitySettings']>) => {
      setProgress(prev => ({
        ...prev,
        accessibilitySettings: { ...prev.accessibilitySettings, ...settings },
      }));
    },
    []
  );

  // Reset progress
  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
  }, []);

  // Get progress stats
  const getProgressStats = useCallback((): ProgressStats => {
    const totalLessons = progress.studiedLessons.length;
    const completedLessons = progress.completedLessons.length;
    const inProgressLessons = progress.inProgressLessons.length;
    const completionPercentage =
      totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    const averageTimePerLesson =
      completedLessons > 0 ? Math.round(progress.totalTimeSpent / completedLessons) : 0;

    return {
      totalLessons,
      completedLessons,
      inProgressLessons,
      completionPercentage,
      totalTimeSpent: progress.totalTimeSpent,
      averageTimePerLesson,
      streak: 0, // TODO: Implement streak calculation
      lastActivity: progress.lastStudied,
    };
  }, [progress]);

  // Check if lesson is completed
  const isLessonCompleted = useCallback(
    (lessonId: string): boolean => {
      return progress.completedLessons.includes(lessonId);
    },
    [progress.completedLessons]
  );

  // Check if lesson is in progress
  const isLessonInProgress = useCallback(
    (lessonId: string): boolean => {
      return progress.inProgressLessons.includes(lessonId);
    },
    [progress.inProgressLessons]
  );

  return {
    progress,
    isLoading,
    markLessonCompleted,
    markLessonInProgress,
    addTimeSpent,
    updateAccessibilitySettings,
    resetProgress,
    getProgressStats,
    isLessonCompleted,
    isLessonInProgress,
  };
}
