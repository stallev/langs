'use client';

import Link from 'next/link';
import { NAVIGATION } from '@/shared/constants/navigation';
import { Navigation, MobileNavigation } from './Navigation';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href={NAVIGATION.HOME.PATH} className="flex items-center space-x-2">
            <span className="font-bold text-xl">LangLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <Navigation />
        </div>

        <div className="flex items-center gap-4">
          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Settings Link (Desktop) */}
          <Link
            href={NAVIGATION.SETTINGS.PATH}
            className="hidden md:inline-flex items-center justify-center text-sm font-medium transition-colors hover:text-primary"
          >
            {NAVIGATION.SETTINGS.LABEL}
          </Link>

          {/* Mobile Navigation */}
          <MobileNavigation />
        </div>
      </div>
    </header>
  );
};

export default Header;
