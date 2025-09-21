// Категории уроков согласно creating_texts_rules.md
export const LESSON_CATEGORIES = [
  'language_basics',
  'daily_life',
  'human_society',
  'nature_environment',
  'science_technology',
  'culture_arts',
  'economics_business',
  'politics_law',
  'health_medicine',
  'education_development',
] as const;

export type LessonCategory = (typeof LESSON_CATEGORIES)[number];

// Описания категорий на русском языке
export const CATEGORY_DESCRIPTIONS: Record<LessonCategory, string> = {
  language_basics: 'Основы языка (грамматика, местоимения, глаголы, предлоги, союзы)',
  daily_life: 'Повседневная жизнь (дом, еда, одежда, покупки, транспорт, время)',
  human_society: 'Человек и общество (семья, отношения, эмоции, общение)',
  nature_environment: 'Природа и окружающая среда (погода, природа, животные, география)',
  science_technology: 'Наука и технологии (наука, компьютеры, интернет, инновации)',
  culture_arts: 'Культура и искусство (искусство, музыка, литература, традиции)',
  economics_business: 'Экономика и бизнес (деньги, бизнес, работа, карьера)',
  politics_law: 'Политика и право (правительство, политика, законы, суды)',
  health_medicine: 'Здоровье и медицина (здоровье, болезни, лечение, фитнес)',
  education_development: 'Образование и развитие (обучение, навыки, личностный рост)',
};

// Описания категорий на английском языке
export const CATEGORY_DESCRIPTIONS_EN: Record<LessonCategory, string> = {
  language_basics: 'Language Basics (grammar, pronouns, verbs, prepositions, conjunctions)',
  daily_life: 'Daily Life (home, food, clothing, shopping, transport, time)',
  human_society: 'Human Society (family, relationships, emotions, communication)',
  nature_environment: 'Nature & Environment (weather, nature, animals, geography)',
  science_technology: 'Science & Technology (science, computers, internet, innovations)',
  culture_arts: 'Culture & Arts (art, music, literature, traditions)',
  economics_business: 'Economics & Business (money, business, work, career)',
  politics_law: 'Politics & Law (government, politics, laws, courts)',
  health_medicine: 'Health & Medicine (health, diseases, treatment, fitness)',
  education_development: 'Education & Development (learning, skills, personal growth)',
};
