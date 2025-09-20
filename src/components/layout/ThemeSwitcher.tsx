'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ACCESSIBILITY } from '@/shared/constants/navigation';

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after component is mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDarkTheme = theme === 'dark';
  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark');
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={
        isDarkTheme ? ACCESSIBILITY.THEME_SWITCHER.LIGHT : ACCESSIBILITY.THEME_SWITCHER.DARK
      }
    >
      {isDarkTheme ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
