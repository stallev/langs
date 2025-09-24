'use client';

import { useState, useMemo } from 'react';
import type { PaginationState, FilterState } from '@/shared/types/pagination';
import type { VocabularyWord } from '@/shared/types/vocabulary';

interface UseVocabularyPaginationProps {
  words: VocabularyWord[];
  itemsPerPage?: number;
}

export function useVocabularyPagination({
  words,
  itemsPerPage = 20,
}: UseVocabularyPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    searchQuery: '',
  });
  const [sortBy, setSortBy] = useState<'alphabetical' | 'category'>('alphabetical');

  // Filter and sort words
  const filteredWords = useMemo(() => {
    let filtered = words;

    // Apply search filter
    if (filterState.searchQuery) {
      const query = filterState.searchQuery.toLowerCase();
      filtered = filtered.filter(
        word =>
          word.word.toLowerCase().includes(query) ||
          word.translation.toLowerCase().includes(query) ||
          word.partOfSpeech.toLowerCase().includes(query) ||
          word.exampleSentence.toLowerCase().includes(query) ||
          word.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filterState.category !== 'all') {
      filtered = filtered.filter(word => word.category === filterState.category);
    }

    // Apply sorting
    if (sortBy === 'alphabetical') {
      filtered = [...filtered].sort((a, b) => a.word.localeCompare(b.word));
    } else if (sortBy === 'category') {
      filtered = [...filtered].sort((a, b) => {
        const categoryCompare = a.category.localeCompare(b.category);
        if (categoryCompare === 0) {
          return a.word.localeCompare(b.word);
        }
        return categoryCompare;
      });
    }

    return filtered;
  }, [words, filterState.searchQuery, filterState.category, sortBy]);

  // Calculate pagination
  const totalItems = filteredWords.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWords = filteredWords.slice(startIndex, endIndex);

  // Get unique categories for filtering
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(words.map(word => word.category)));
    return uniqueCategories.sort();
  }, [words]);

  // Get unique parts of speech for filtering
  const partsOfSpeech = useMemo(() => {
    const uniqueParts = Array.from(new Set(words.map(word => word.partOfSpeech)));
    return uniqueParts.sort();
  }, [words]);

  // Reset to first page when filters change
  const handleSearchChange = (searchQuery: string) => {
    setFilterState(prev => ({ ...prev, searchQuery }));
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setFilterState(prev => ({ ...prev, category }));
    setCurrentPage(1);
  };

  const handleSortChange = (sortBy: 'alphabetical' | 'category') => {
    setSortBy(sortBy);
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
    currentWords,
    paginationState,
    filterState,
    sortBy,
    categories,
    partsOfSpeech,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
  };
}
