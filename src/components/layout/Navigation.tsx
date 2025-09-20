'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { NAVIGATION, ACCESSIBILITY } from '@/shared/constants/navigation';
import type { NavItem } from '@/types/navigation';

export const Navigation = () => {
  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      <MainNavItems />
    </nav>
  );
};

export const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center p-2 rounded-md text-foreground"
        aria-expanded={isOpen}
        aria-label={isOpen ? ACCESSIBILITY.MOBILE_MENU.CLOSE : ACCESSIBILITY.MOBILE_MENU.OPEN}
      >
        <svg
          className="h-6 w-6"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border z-50 p-4">
          <div className="flex flex-col space-y-4">
            <MobileNavItems closeMenu={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const MainNavItems = () => {
  const pathname = usePathname();

  // Convert navigation constants to NavItem array
  const navItems: NavItem[] = [
    {
      label: NAVIGATION.HOME.LABEL,
      path: NAVIGATION.HOME.PATH,
    },
    {
      label: NAVIGATION.LESSONS.LABEL,
      path: NAVIGATION.LESSONS.PATH,
      submenu: [
        {
          label: NAVIGATION.LESSONS.SUBMENU.ENGLISH_B1B2.LABEL,
          path: NAVIGATION.LESSONS.SUBMENU.ENGLISH_B1B2.PATH,
        },
        {
          label: NAVIGATION.LESSONS.SUBMENU.RUSSIAN.LABEL,
          path: NAVIGATION.LESSONS.SUBMENU.RUSSIAN.PATH,
          disabled: NAVIGATION.LESSONS.SUBMENU.RUSSIAN.DISABLED,
        },
      ],
    },
    {
      label: NAVIGATION.VOCABULARY.LABEL,
      path: NAVIGATION.VOCABULARY.PATH,
      submenu: [
        {
          label: NAVIGATION.VOCABULARY.SUBMENU.ENGLISH.LABEL,
          path: NAVIGATION.VOCABULARY.SUBMENU.ENGLISH.PATH,
        },
        {
          label: NAVIGATION.VOCABULARY.SUBMENU.RUSSIAN.LABEL,
          path: NAVIGATION.VOCABULARY.SUBMENU.RUSSIAN.PATH,
          disabled: NAVIGATION.VOCABULARY.SUBMENU.RUSSIAN.DISABLED,
        },
      ],
    },
    {
      label: NAVIGATION.PRACTICE.LABEL,
      path: NAVIGATION.PRACTICE.PATH,
    },
    {
      label: NAVIGATION.PROGRESS.LABEL,
      path: NAVIGATION.PROGRESS.PATH,
    },
    {
      label: NAVIGATION.ABOUT.LABEL,
      path: NAVIGATION.ABOUT.PATH,
    },
  ];

  return (
    <>
      {navItems.map(item => (
        <NavItem key={item.path} item={item} pathname={pathname} />
      ))}
    </>
  );
};

const MobileNavItems = ({ closeMenu }: { closeMenu: () => void }) => {
  const pathname = usePathname();

  // Convert navigation constants to NavItem array (same as MainNavItems)
  const navItems: NavItem[] = [
    {
      label: NAVIGATION.HOME.LABEL,
      path: NAVIGATION.HOME.PATH,
    },
    {
      label: NAVIGATION.LESSONS.LABEL,
      path: NAVIGATION.LESSONS.PATH,
      submenu: [
        {
          label: NAVIGATION.LESSONS.SUBMENU.ENGLISH_B1B2.LABEL,
          path: NAVIGATION.LESSONS.SUBMENU.ENGLISH_B1B2.PATH,
        },
        {
          label: NAVIGATION.LESSONS.SUBMENU.RUSSIAN.LABEL,
          path: NAVIGATION.LESSONS.SUBMENU.RUSSIAN.PATH,
          disabled: NAVIGATION.LESSONS.SUBMENU.RUSSIAN.DISABLED,
        },
      ],
    },
    {
      label: NAVIGATION.VOCABULARY.LABEL,
      path: NAVIGATION.VOCABULARY.PATH,
      submenu: [
        {
          label: NAVIGATION.VOCABULARY.SUBMENU.ENGLISH.LABEL,
          path: NAVIGATION.VOCABULARY.SUBMENU.ENGLISH.PATH,
        },
        {
          label: NAVIGATION.VOCABULARY.SUBMENU.RUSSIAN.LABEL,
          path: NAVIGATION.VOCABULARY.SUBMENU.RUSSIAN.PATH,
          disabled: NAVIGATION.VOCABULARY.SUBMENU.RUSSIAN.DISABLED,
        },
      ],
    },
    {
      label: NAVIGATION.PRACTICE.LABEL,
      path: NAVIGATION.PRACTICE.PATH,
    },
    {
      label: NAVIGATION.PROGRESS.LABEL,
      path: NAVIGATION.PROGRESS.PATH,
    },
    {
      label: NAVIGATION.ABOUT.LABEL,
      path: NAVIGATION.ABOUT.PATH,
    },
    {
      label: NAVIGATION.SETTINGS.LABEL,
      path: NAVIGATION.SETTINGS.PATH,
    },
  ];

  return (
    <>
      {navItems.map(item => (
        <MobileNavItem key={item.path} item={item} pathname={pathname} closeMenu={closeMenu} />
      ))}
    </>
  );
};

const NavItem = ({ item, pathname }: { item: NavItem; pathname: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

  if (item.submenu) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className={cn(
            'flex items-center text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary' : 'text-foreground'
          )}
          aria-expanded={isOpen}
          aria-label={isOpen ? ACCESSIBILITY.SUBMENU.COLLAPSE : ACCESSIBILITY.SUBMENU.EXPAND}
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.label}
          <ChevronDown className="ml-1 h-4 w-4" aria-hidden="true" />
        </button>
        {isOpen && (
          <div className="absolute left-0 mt-2 w-48 origin-top-left bg-background border border-border rounded-md shadow-lg z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {item.submenu.map(subItem => (
                <Link
                  key={subItem.path}
                  href={subItem.disabled ? '#' : subItem.path}
                  className={cn(
                    'block px-4 py-2 text-sm',
                    subItem.disabled
                      ? 'text-muted-foreground cursor-not-allowed'
                      : 'text-foreground hover:bg-muted hover:text-primary'
                  )}
                  role="menuitem"
                  aria-disabled={subItem.disabled}
                  onClick={() => {
                    if (!subItem.disabled) {
                      setIsOpen(false);
                    }
                  }}
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.disabled ? '#' : item.path}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary' : 'text-foreground',
        item.disabled && 'text-muted-foreground cursor-not-allowed'
      )}
      aria-disabled={item.disabled}
    >
      {item.label}
    </Link>
  );
};

const MobileNavItem = ({
  item,
  pathname,
  closeMenu,
}: {
  item: NavItem;
  pathname: string;
  closeMenu: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isActive = pathname === item.path || pathname.startsWith(`${item.path}/`);

  if (item.submenu) {
    return (
      <div className="space-y-2">
        <button
          className={cn(
            'flex items-center justify-between w-full text-left text-sm font-medium transition-colors hover:text-primary',
            isActive ? 'text-primary' : 'text-foreground'
          )}
          aria-expanded={isOpen}
          aria-label={isOpen ? ACCESSIBILITY.SUBMENU.COLLAPSE : ACCESSIBILITY.SUBMENU.EXPAND}
          onClick={() => setIsOpen(!isOpen)}
        >
          {item.label}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', isOpen && 'transform rotate-180')}
            aria-hidden="true"
          />
        </button>
        {isOpen && (
          <div className="pl-4 space-y-2 border-l border-border">
            {item.submenu.map(subItem => (
              <Link
                key={subItem.path}
                href={subItem.disabled ? '#' : subItem.path}
                className={cn(
                  'block text-sm',
                  subItem.disabled
                    ? 'text-muted-foreground cursor-not-allowed'
                    : 'text-foreground hover:text-primary'
                )}
                aria-disabled={subItem.disabled}
                onClick={() => {
                  if (!subItem.disabled) {
                    closeMenu();
                  }
                }}
              >
                {subItem.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.disabled ? '#' : item.path}
      className={cn(
        'block text-sm font-medium transition-colors hover:text-primary',
        isActive ? 'text-primary' : 'text-foreground',
        item.disabled && 'text-muted-foreground cursor-not-allowed'
      )}
      aria-disabled={item.disabled}
      onClick={() => {
        if (!item.disabled) {
          closeMenu();
        }
      }}
    >
      {item.label}
    </Link>
  );
};

export default Navigation;
