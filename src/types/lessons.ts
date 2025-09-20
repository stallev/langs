export interface LessonKeyword {
  word: string;
  translation: string;
  partOfSpeech: string;
}

export interface LessonExample {
  word: string | null;
  example: string;
  translation: string | null;
}

export interface LessonPhrase {
  phrase: string;
  translation: string | null;
}

export interface LessonSynonym {
  word: string;
  synonym: string;
  context: string;
  example: string;
}

export interface RelatedTopic {
  name: string;
  slug: string;
}

export interface LessonData {
  id: number;
  slug: string;
  title: string;
  titleRu: string;
  description: string;
  keywords: LessonKeyword[];
  mainText: string;
  additionalExamples: LessonExample[];
  practicalPhrases: LessonPhrase[];
  synonyms: LessonSynonym[];
  grammarNotes: string;
  relatedTopics: RelatedTopic[];
  category: string;
  level: string;
  language: string;
}
