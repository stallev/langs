'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationProps } from '@/shared/types/pagination';
import { Button } from './button';

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center space-x-1 cursor-pointer"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Previous</span>
      </Button>

      <div className="flex items-center space-x-1">
        {getVisiblePages().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-muted-foreground">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isCurrentPage = pageNumber === currentPage;

          return (
            <Button
              key={pageNumber}
              variant={isCurrentPage ? 'default' : 'outline'}
              size="sm"
              onClick={() => onPageChange(pageNumber)}
              className="min-w-[40px]"
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center space-x-1"
      >
        <span>Next</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
