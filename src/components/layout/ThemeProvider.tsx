'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';

type ThemeProviderProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
