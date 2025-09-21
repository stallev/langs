'use client';

import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface LessonFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function LessonFilters({
  categories,
  selectedCategory,
  onCategoryChange,
}: LessonFiltersProps) {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4">
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
                  {category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Active Filters Display */}
      {selectedCategory !== 'all' && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-1">
            <span className="text-sm text-muted-foreground">Category:</span>
            <span className="text-sm font-medium">
              {selectedCategory.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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
        </div>
      )}
    </div>
  );
}
