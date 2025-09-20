'use client';

import { ChevronRight, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ACCESSIBILITY, NAVIGATION } from '@/shared/constants/navigation';
import type { BreadcrumbItem } from '@/types/navigation';

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  const pathname = usePathname();

  // If no items are provided, generate them from the current path
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname);

  return (
    <nav aria-label={ACCESSIBILITY.BREADCRUMBS.ARIA_LABEL} className="py-2">
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center gap-1 text-sm">
          <li>
            <Link
              href={NAVIGATION.HOME.PATH}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">{ACCESSIBILITY.BREADCRUMBS.HOME}</span>
            </Link>
          </li>

          {breadcrumbItems.map(item => (
            <li key={item.path} className="flex items-center">
              <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" aria-hidden="true" />
              {item.isCurrent ? (
                <span aria-current="page" className="font-medium">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-current={item.isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

// Helper function to generate breadcrumbs from the current path
const generateBreadcrumbsFromPath = (pathname: string): BreadcrumbItem[] => {
  if (pathname === '/') return [];

  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      // Create a path up to the current segment
      const path = '/' + array.slice(0, index + 1).join('/');

      // Convert segment to a more readable label (capitalize, replace hyphens)
      const label = segment
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      return {
        label,
        path,
        isCurrent: index === array.length - 1,
      };
    });

  return segments;
};

export default Breadcrumbs;
