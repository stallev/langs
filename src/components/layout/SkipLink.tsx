'use client';

import { ACCESSIBILITY } from '@/shared/constants/navigation';

export const SkipLink = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {ACCESSIBILITY.SKIP_LINK}
    </a>
  );
};

export default SkipLink;
