'use client';

import { Filter, Search, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface VocabularyFiltersProps {
  categories: string[];
  selectedCategory: string;
  searchQuery: string;
  sortBy: 'alphabetical' | 'category';
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchQuery: string) => void;
  onSortChange: (sortBy: 'alphabetical' | 'category') => void;
}

// Category display names mapping
const CATEGORY_DISPLAY_NAMES: Record<string, string> = {
  language_basics: 'Language Basics',
  daily_life: 'Daily Life',
  human_society: 'Human Society',
  nature_environment: 'Nature & Environment',
  science_technology: 'Science & Technology',
  culture_arts: 'Culture & Arts',
  economics_business: 'Economics & Business',
  politics_law: 'Politics & Law',
  health_medicine: 'Health & Medicine',
  education_development: 'Education & Development',
};

export function VocabularyFilters({
  categories,
  selectedCategory,
  searchQuery,
  sortBy,
  onCategoryChange,
  onSearchChange,
  onSortChange,
}: VocabularyFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search words, translations, or categories..."
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {CATEGORY_DISPLAY_NAMES[category] ||
                    category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort Options */}
        <div className="flex items-center space-x-2">
          <SortAsc className="h-4 w-4 text-muted-foreground" />
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alphabetical">Alphabetical</SelectItem>
              <SelectItem value="category">By Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory !== 'all' || searchQuery || sortBy !== 'alphabetical') && (
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== 'all' && (
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-1">
              <span className="text-sm text-muted-foreground">Category:</span>
              <span className="text-sm font-medium">
                {CATEGORY_DISPLAY_NAMES[selectedCategory] ||
                  selectedCategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onCategoryChange('all')}
                className="h-6 w-6 p-0 hover:bg-muted"
              >
                ×
              </Button>
            </div>
          )}
          {searchQuery && (
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-1">
              <span className="text-sm text-muted-foreground">Search:</span>
              <span className="text-sm font-medium">&ldquo;{searchQuery}&rdquo;</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSearchChange('')}
                className="h-6 w-6 p-0 hover:bg-muted"
              >
                ×
              </Button>
            </div>
          )}
          {sortBy !== 'alphabetical' && (
            <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-1">
              <span className="text-sm text-muted-foreground">Sort:</span>
              <span className="text-sm font-medium">
                {sortBy === 'category' ? 'By Category' : 'Alphabetical'}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSortChange('alphabetical')}
                className="h-6 w-6 p-0 hover:bg-muted"
              >
                ×
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
