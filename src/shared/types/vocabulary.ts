export interface VocabularyWord {
  id: number;
  word: string;
  partOfSpeech: string;
  translation: string;
  exampleSentence: string;
  category: string;
}

export interface VocabularyData {
  words: VocabularyWord[];
  totalWords: number;
  language: 'en' | 'ru';
  level: string;
}
