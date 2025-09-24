import type { VocabularyWord } from '@/shared/types/vocabulary';

interface VocabularyCardProps {
  word: VocabularyWord;
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

export const VocabularyCard = ({ word }: VocabularyCardProps) => {
  return (
    <div className="bg-muted/20 rounded-2xl p-6 border-0 hover:bg-muted/30 transition-colors">
      <div className="space-y-4">
        {/* Word and Part of Speech */}
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-medium text-foreground">{word.word}</h3>
          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
            {word.partOfSpeech}
          </span>
        </div>

        {/* Category */}
        {word.category && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground font-medium">Category:</span>
            <span className="px-2 py-1 bg-secondary/20 text-secondary-foreground text-xs font-medium rounded-md">
              {CATEGORY_DISPLAY_NAMES[word.category] ||
                word.category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
          </div>
        )}

        {/* Translation */}
        {word.translation && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground font-medium">Translation:</span>
            <p className="text-foreground">{word.translation}</p>
          </div>
        )}

        {/* Example */}
        {word.exampleSentence && (
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground font-medium">Example:</span>
            <p className="text-muted-foreground italic">&ldquo;{word.exampleSentence}&rdquo;</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VocabularyCard;
