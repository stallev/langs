export interface LessonMetadata {
  title: string;
  description: string;
  keywords: string[];
  level: string;
  topic: string;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LessonWord {
  word: string;
  translation: string;
  partOfSpeech: string;
  example?: string;
}

export interface LessonSynonym {
  word: string;
  synonyms: Array<{
    synonym: string;
    context: string;
    example: string;
  }>;
}

export interface LessonContent {
  metadata: LessonMetadata;
  words: LessonWord[];
  mainText: string;
  additionalExamples: string[];
  practicalPhrases: string[];
  synonyms: LessonSynonym[];
  grammarNotes: string;
  relatedTopics: string[];
}

export interface ParsedLesson {
  content: LessonContent;
  slug: string;
  filePath: string;
}
