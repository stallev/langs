// Google Analytics 4 utilities

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID || '', {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track lesson views
export const trackLessonView = (lessonSlug: string, language: string) => {
  trackEvent('lesson_view', 'engagement', `${language}_${lessonSlug}`);
};

// Track vocabulary searches
export const trackVocabularySearch = (query: string, language: string) => {
  trackEvent('vocabulary_search', 'engagement', `${language}_${query}`);
};

// Track vocabulary filter usage
export const trackVocabularyFilter = (filterType: string, value: string, language: string) => {
  trackEvent('vocabulary_filter', 'engagement', `${language}_${filterType}_${value}`);
};

// Track practice sessions
export const trackPracticeStart = (difficulty: string, exerciseCount: number) => {
  trackEvent('practice_start', 'engagement', difficulty, exerciseCount);
};

// Track practice completion
export const trackPracticeComplete = (score: number) => {
  trackEvent('practice_complete', 'engagement', 'completion', score);
};

// Track progress updates
export const trackProgressUpdate = (action: string, lessonId: string) => {
  trackEvent('progress_update', 'engagement', `${action}_${lessonId}`);
};
