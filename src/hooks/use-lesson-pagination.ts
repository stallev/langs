'use client';

import { useState, useMemo } from 'react';
import { LESSON_CATEGORIES, type LessonCategory } from '@/shared/constants/lessonCategories';
import type { LessonData } from '@/shared/types/lesson';
import type { PaginationState, FilterState } from '@/shared/types/pagination';

interface UseLessonPaginationProps {
  lessons: LessonData[];
  itemsPerPage?: number;
}

export function useLessonPagination({ lessons, itemsPerPage = 8 }: UseLessonPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
  });

  // Filter lessons based on category and search query
  const filteredLessons = useMemo(() => {
    return lessons.filter(lesson => {
      const matchesCategory =
        filterState.category === 'all' || lesson.category === filterState.category;

      const matchesSearch =
        filterState.searchQuery === '' ||
        lesson.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        lesson.titleRu.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
        lesson.keywords.some(
          keyword =>
            keyword.word.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
            keyword.translation.toLowerCase().includes(filterState.searchQuery.toLowerCase())
        ) ||
        lesson.category.toLowerCase().includes(filterState.searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [lessons, filterState]);

  // Calculate pagination
  const totalItems = filteredLessons.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLessons = filteredLessons.slice(startIndex, endIndex);

  // Get only valid categories that exist in lessons
  const categories = useMemo(() => {
    const lessonCategories = Array.from(new Set(lessons.map(lesson => lesson.category)));
    // Filter to only include categories that are defined in creating_texts_rules.md
    return lessonCategories
      .filter(category => LESSON_CATEGORIES.includes(category as LessonCategory))
      .sort();
  }, [lessons]);

  // Reset to first page when filters change
  const handleCategoryChange = (category: string) => {
    setFilterState(prev => ({ ...prev, category }));
    setCurrentPage(1);
  };

  const handleSearchChange = (searchQuery: string) => {
    setFilterState(prev => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginationState: PaginationState = {
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
  };

  return {
    currentLessons,
    paginationState,
    filterState,
    categories,
    handleCategoryChange,
    handleSearchChange,
    handlePageChange,
  };
}
