'use client';

import { useAnalytics } from '@/hooks/use-analytics';

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useAnalytics();
  return <>{children}</>;
};
