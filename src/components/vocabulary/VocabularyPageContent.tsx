'use client';

import { Pagination } from '@/components/ui/pagination';
import { VocabularyCard } from '@/components/vocabulary/VocabularyCard';
import { VocabularyFilters } from '@/components/vocabulary/VocabularyFilters';
import { useVocabularyPagination } from '@/hooks/use-vocabulary-pagination';
import type { VocabularyWord } from '@/shared/types/vocabulary';

interface VocabularyPageContentProps {
  words: VocabularyWord[];
}

export function VocabularyPageContent({ words }: VocabularyPageContentProps) {
  const {
    currentWords,
    paginationState,
    filterState,
    sortBy,
    categories,
    handleSearchChange,
    handleCategoryChange,
    handleSortChange,
    handlePageChange,
  } = useVocabularyPagination({ words });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
          <div className="text-3xl font-light text-primary mb-2">{paginationState.totalItems}</div>
          <div className="text-sm text-muted-foreground">
            {filterState.searchQuery || filterState.category !== 'all'
              ? 'Filtered Words'
              : 'Total Words'}
          </div>
        </div>
        <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
          <div className="text-3xl font-light text-primary mb-2">{categories.length}</div>
          <div className="text-sm text-muted-foreground">Categories</div>
        </div>
        <div className="bg-muted/20 rounded-2xl p-6 border-0 text-center">
          <div className="text-3xl font-light text-primary mb-2">{paginationState.totalPages}</div>
          <div className="text-sm text-muted-foreground">Pages</div>
        </div>
      </div>

      {/* Filters Section */}
      <VocabularyFilters
        categories={categories}
        selectedCategory={filterState.category}
        searchQuery={filterState.searchQuery}
        sortBy={sortBy}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />

      {/* Words Section */}
      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-light text-foreground">
            {filterState.searchQuery || filterState.category !== 'all'
              ? 'Search Results'
              : 'Vocabulary Words'}
          </h2>
          <p className="text-muted-foreground">
            Showing {currentWords.length} of {paginationState.totalItems} words
            {paginationState.totalPages > 1 &&
              ` (Page ${paginationState.currentPage} of ${paginationState.totalPages})`}
          </p>
        </div>

        {currentWords.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentWords.map((word, index) => (
                <VocabularyCard key={`${word.word}-${index}`} word={word} />
              ))}
            </div>

            {paginationState.totalPages > 1 && (
              <Pagination
                currentPage={paginationState.currentPage}
                totalPages={paginationState.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No words found matching your search.</p>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </section>
    </div>
  );
}
