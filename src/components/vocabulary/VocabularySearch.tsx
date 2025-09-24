'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface VocabularySearchProps {
  searchQuery: string;
  onSearchChange: (searchQuery: string) => void;
  placeholder?: string;
}

export const VocabularySearch = ({
  searchQuery,
  onSearchChange,
  placeholder = 'Search words, translations, or examples...',
}: VocabularySearchProps) => {
  return (
    <div className="space-y-4 mb-8">
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="max-w-md"
        />
      </div>

      {/* Active Search Display */}
      {searchQuery && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2 bg-muted/50 rounded-lg px-3 py-1">
            <span className="text-sm text-muted-foreground">Search:</span>
            <span className="text-sm font-medium">&ldquo;{searchQuery}&rdquo;</span>
            <button
              onClick={() => onSearchChange('')}
              className="h-6 w-6 p-0 hover:bg-muted rounded flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VocabularySearch;
