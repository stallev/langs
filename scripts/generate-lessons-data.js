#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to generate lessons data from markdown files for both English and Russian
 * This script parses all lesson markdown files and generates TypeScript constants files
 * with structured data for the lessons.
 */

// Configuration
const CONFIG = {
  eng: {
    lessonsDir: path.join(__dirname, '../texts/courses/eng/b1b2/lessons_list'),
    outputFile: path.join(__dirname, '../texts/courses/eng/b1b2/constants/lessonsData.ts'),
    level: 'B1-B2',
    language: 'en'
  },
  rus: {
    lessonsDir: path.join(__dirname, '../texts/courses/rus/a2/lessonsList'),
    outputFile: path.join(__dirname, '../texts/courses/rus/a2/constants/rus_a1_a2_lessonsData.ts'),
    level: 'A1-A2',
    language: 'ru'
  }
};

/**
 * Parse markdown file and extract structured data
 * @param {string} filePath - Path to the markdown file
 * @param {number} index - Index of the file for ID generation
 * @param {string} language - Language code ('en' or 'ru')
 * @returns {Object} Parsed lesson data
 */
function parseMarkdownFile(filePath, index = 0, language = 'en') {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Normalize line endings to handle Windows CRLF
  const normalizedContent = content.replace(/\r\n/g, '\n');
  
  // Extract filename without extension for slug
  const filename = path.basename(filePath, '.md');
  const slug = filename;
  
  // Extract title from first line (remove # and trim)
  const titleMatch = normalizedContent.match(/^# (.+?)(?:\s*\/\s*(.+))?$/m);
  const title = titleMatch ? titleMatch[1].trim() : filename;
  const titleRu = titleMatch && titleMatch[2] ? titleMatch[2].trim() : '';
  
  // Extract category section
  const categorySection = extractSection(normalizedContent, '## Категория / Category');
  const category = parseCategory(categorySection);
  
  // Extract keywords section
  const keywordsSection = extractSection(normalizedContent, '## Ключевые слова / Key Words');
  const keywords = parseKeywords(keywordsSection);
  
  // Extract main text section
  const mainTextSection = extractSection(normalizedContent, '## Основной текст / Main Text');
  const mainText = mainTextSection ? mainTextSection.trim() : '';
  
  // Extract additional examples section
  const examplesSection = extractSection(normalizedContent, '## Дополнительные примеры / Additional Examples');
  const additionalExamples = parseExamples(examplesSection);
  
  // Extract practical phrases section
  const phrasesSection = extractSection(normalizedContent, '## Практические фразы / Practical Phrases');
  const practicalPhrases = parsePhrases(phrasesSection);
  
  // Extract synonyms section
  const synonymsSection = extractSection(normalizedContent, '## Синонимы и контекстное использование / Synonyms & Contextual Usage');
  const synonyms = parseSynonyms(synonymsSection);
  
  // Extract grammar notes section
  const grammarSection = extractSection(normalizedContent, '## Грамматические заметки / Grammar Notes');
  const grammarNotes = grammarSection ? grammarSection.trim() : '';
  
  // Extract related topics section
  const relatedSection = extractSection(normalizedContent, '## Связанные темы / Related Topics');
  const relatedTopics = parseRelatedTopics(relatedSection, language);
  
  // Generate URL based on language
  const url = language === 'rus' 
    ? `/lessons/rus/a1a2/${slug}`
    : `/lessons/eng/b1b2/${slug}`;

  return {
    id: extractIdFromFilename(filename, index),
    slug,
    title: language === 'ru' ? titleRu : title,
    titleRu: language === 'ru' ? title : titleRu,
    description: generateDescription(language === 'ru' ? titleRu : title, keywords, language),
    keywords,
    mainText,
    additionalExamples,
    practicalPhrases,
    synonyms,
    grammarNotes,
    relatedTopics,
    category: category || extractCategoryFromFilename(filename),
    level: language === 'rus' ? 'A1-A2' : 'B1-B2',
    language,
    url
  };
}

/**
 * Extract section content from markdown
 * @param {string} content - Full markdown content
 * @param {string} sectionTitle - Section title to extract
 * @returns {string} Section content
 */
function extractSection(content, sectionTitle) {
  const lines = content.split('\n');
  let inSection = false;
  let sectionContent = [];
  
  for (const line of lines) {
    if (line.includes(sectionTitle)) {
      inSection = true;
      continue;
    }
    
    if (inSection) {
      // Stop if we hit another ## section
      if (line.startsWith('## ') && !line.includes(sectionTitle)) {
        break;
      }
      sectionContent.push(line);
    }
  }
  
  return sectionContent.join('\n').trim();
}

/**
 * Parse category from section content
 * @param {string} content - Category section content
 * @returns {string} Category value
 */
function parseCategory(content) {
  if (!content) return null;
  
  // Extract category from content (should be a single line with category value)
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine && !trimmedLine.startsWith('[') && !trimmedLine.startsWith('<!--')) {
      // Return the first non-empty line that's not a comment or placeholder
      return trimmedLine;
    }
  }
  
  return null;
}

/**
 * Parse keywords from section content
 * @param {string} content - Keywords section content
 * @returns {Array} Array of keyword objects
 */
function parseKeywords(content) {
  if (!content) return [];
  
  const lines = content.split('\n');
  const keywords = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      // Match pattern: - word (translation) - partOfSpeech
      const match = trimmedLine.match(/^- (.+?) \((.+?)\) - (.+?)$/);
      if (match) {
        keywords.push({
          word: match[1].trim(),
          translation: match[2].trim(),
          partOfSpeech: match[3].trim()
        });
      }
    }
  }
  
  return keywords;
}

/**
 * Parse examples from section content
 * @param {string} content - Examples section content
 * @returns {Array} Array of example objects
 */
function parseExamples(content) {
  if (!content) return [];
  
  const lines = content.split('\n');
  const examples = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- **') && trimmedLine.includes('**:')) {
      // Match pattern: - **word**: "example" (translation)
      const match = trimmedLine.match(/^- \*\*(.+?)\*\*: "(.+?)" \((.+?)\)$/);
      if (match) {
        examples.push({
          word: match[1].trim(),
          example: match[2].trim(),
          translation: match[3].trim()
        });
      }
    } else if (trimmedLine.startsWith('- ')) {
      // Simple example without word reference
      const exampleText = trimmedLine.replace(/^- /, '').trim();
      if (exampleText) {
        examples.push({
          word: null,
          example: exampleText,
          translation: null
        });
      }
    }
  }
  
  return examples;
}

/**
 * Parse phrases from section content
 * @param {string} content - Phrases section content
 * @returns {Array} Array of phrase objects
 */
function parsePhrases(content) {
  if (!content) return [];
  
  const lines = content.split('\n');
  const phrases = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      // Match pattern: - "phrase" - translation
      const match = trimmedLine.match(/^- "(.+?)" - (.+?)$/);
      if (match) {
        phrases.push({
          phrase: match[1].trim(),
          translation: match[2].trim()
        });
      } else {
        // Simple phrase without quotes
        const phraseText = trimmedLine.replace(/^- /, '').trim();
        if (phraseText) {
          phrases.push({
            phrase: phraseText,
            translation: null
          });
        }
      }
    }
  }
  
  return phrases;
}

/**
 * Parse synonyms from section content
 * @param {string} content - Synonyms section content
 * @returns {Array} Array of synonym objects
 */
function parseSynonyms(content) {
  if (!content) return [];
  
  const lines = content.split('\n');
  const synonyms = [];
  let currentWord = null;
  let currentSynonyms = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('- **') && trimmedLine.endsWith('**:')) {
      // Save previous word if exists
      if (currentWord) {
        synonyms.push(...currentSynonyms);
      }
      
      // Start new word
      currentWord = trimmedLine.replace(/^- \*\*(.+?)\*\*:$/, '$1').trim();
      currentSynonyms = [];
    } else if (currentWord && trimmedLine.startsWith('  - ')) {
      // Match synonym pattern: - synonym (context) - "example"
      const match = trimmedLine.match(/^- (.+?) \((.+?)\) - "(.+?)"$/);
      if (match) {
        currentSynonyms.push({
          word: currentWord,
          synonym: match[1].trim(),
          context: match[2].trim(),
          example: match[3].trim()
        });
      }
    }
  }
  
  // Save last word
  if (currentWord) {
    synonyms.push(...currentSynonyms);
  }
  
  return synonyms;
}

/**
 * Parse related topics from section content
 * @param {string} content - Related topics section content
 * @returns {Array} Array of related topic objects
 */
function parseRelatedTopics(content, language = 'en') {
  if (!content) return [];
  
  const lines = content.split('\n');
  const topics = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      const topicTitle = trimmedLine.replace(/^- /, '').trim();
      if (topicTitle) {
        // Convert Russian title to slug for Russian lessons
        const topicSlug = language === 'rus' 
          ? convertRussianTitleToSlug(topicTitle)
          : topicTitle.toLowerCase().replace(/\s+/g, '-');
          
        // Generate URL based on language
        const topicUrl = language === 'rus' 
          ? `/lessons/rus/a1a2/${topicSlug}`
          : `/lessons/eng/b1b2/${topicSlug}`;
          
        topics.push({
          name: topicTitle,
          slug: topicSlug,
          url: topicUrl
        });
      }
    }
  }
  
  return topics;
}

/**
 * Convert Russian lesson titles to file slugs
 * @param {string} russianTitle - Russian title from related topics
 * @returns {string} - Corresponding file slug
 */
function convertRussianTitleToSlug(russianTitle) {
  // Mapping of Russian titles to file slugs
  const titleToSlugMap = {
    'Работа и профессии': 'work-professions',
    'Образование и учеба': 'education-learning',
    'Спорт и фитнес': 'sports-fitness',
    'Проблемы и решения': 'problems-solutions',
    'Семья и отношения': 'family-relationships',
    'Еда и напитки': 'food-drinks',
    'Транспорт и путешествия': 'transport-travel',
    'Дом и жилье': 'home-housing',
    'Одежда и внешность': 'clothing-appearance',
    'Цвета и формы': 'colors-shapes',
    'Числа и количество': 'numbers-quantity',
    'Время и календарь': 'time-calendar',
    'Погода и природа': 'weather-nature',
    'Здоровье и медицина': 'medicine-health',
    'Чувства и эмоции': 'feelings-emotions',
    'Хобби и интересы': 'hobbies-interests',
    'Праздники и традиции': 'holidays-traditions',
    'Город и места': 'city-places',
    'Технологии и компьютеры': 'technology-computers',
    'Наука и исследования': 'science-research',
    'Политика и право': 'politics-law',
    'Религия и духовность': 'religion-spirituality',
    'Искусство и культура': 'art-culture',
    'Развлечения и медиа': 'entertainment-media',
    'Покупки и деньги': 'shopping-money',
    'Тело и здоровье': 'body-health',
    'Звуки и шумы': 'sounds-noises',
    'Вкусы и запахи': 'tastes-smells',
    'Текстуры и ощущения': 'textures-sensations',
    'Движения и направления': 'movement-directions',
    'Действия и движения': 'actions-movements',
    'Описания и качества': 'descriptions-qualities',
    'Описания и сравнения': 'descriptions-comparisons',
    'Измерения и сравнения': 'measurements-comparisons',
    'Направления и местоположения': 'directions-locations',
    'Мнения и убеждения': 'opinions-beliefs',
    'События и случаи': 'events-occasions',
    'Владения и принадлежности': 'possessions-belongings',
    'Социальные взаимодействия': 'social-interactions',
    'Отношения и социальные': 'relationships-social',
    'Коммуникация и взаимодействие': 'communication-interaction',
    'Коммуникация и медиа': 'communication-media',
    'Медицинские состояния': 'medical-conditions',
    'Личные местоимения основы': 'personal-pronouns-basics',
    'Числа и время': 'numbers-time',
    'Размеры и количества': 'numbers-quantities',
    'Думать и понимать': 'thinking-understanding',
    'Чувства эмоции комбинированные': 'feelings-emotions-combined',
    'Транспорт и путешествия': 'transportation-travel'
  };
  
  return titleToSlugMap[russianTitle] || russianTitle.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Extract ID from filename
 * @param {string} filename - Filename
 * @param {number} index - Fallback index
 * @returns {number} ID
 */
function extractIdFromFilename(filename, index) {
  // Try to extract number from filename
  const match = filename.match(/^(\d+)-/);
  if (match) {
    return parseInt(match[1], 10);
  }
  
  // Fallback to index + 1
  return index + 1;
}

/**
 * Extract category from filename
 * @param {string} filename - Filename
 * @returns {string} Category
 */
function extractCategoryFromFilename(filename) {
  // Remove numbers and dashes, capitalize words
  return filename
    .replace(/^\d+-/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

/**
 * Generate description from title and keywords
 * @param {string} title - Lesson title
 * @param {Array} keywords - Array of keywords
 * @param {string} language - Language code
 * @returns {string} Generated description
 */
function generateDescription(title, keywords, language = 'en') {
  const keywordWords = keywords.slice(0, 5).map(k => k.word).join(', ');
  const langText = language === 'rus' ? 'русского языка' : 'English';
  const levelText = language === 'rus' ? 'A1-A2' : 'B1-B2';
  
  return `Learn ${langText} at the ${levelText} level through thematic texts with key words: ${keywordWords} and practical usage examples.`;
}

/**
 * Generate TypeScript file content
 * @param {Array} lessons - Array of lesson objects
 * @param {string} language - Language code
 * @returns {string} TypeScript file content
 */
function generateTypeScriptFile(lessons, language = 'en') {
  const isRussian = language === 'rus';
  const dataName = isRussian ? 'RUS_A1_A2_LESSONS_DATA' : 'ENG_B1_B2_LESSONS_DATA';
  const level = isRussian ? 'A1-A2' : 'B1-B2';
  const langName = isRussian ? 'Russian' : 'English';
  
  const header = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}
// Source: ${isRussian ? CONFIG.rus.lessonsDir : CONFIG.eng.lessonsDir}

import type { LessonData } from '@/shared/types/lesson';

export const ${dataName}: LessonData[] = `;

  const lessonsJson = JSON.stringify(lessons, null, 2);
  
  const footer = `;

export const LESSONS_COUNT = ${lessons.length};

export const LESSONS_BY_CATEGORY = ${dataName}.reduce((acc, lesson) => {
  if (!acc[lesson.category]) {
    acc[lesson.category] = [];
  }
  acc[lesson.category].push(lesson);
  return acc;
}, {} as Record<string, LessonData[]>);

export const LESSONS_BY_ID = ${dataName}.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {} as Record<number, LessonData>);

export const LESSONS_BY_SLUG = ${dataName}.reduce((acc, lesson) => {
  acc[lesson.slug] = lesson;
  return acc;
}, {} as Record<string, LessonData>);
`;

  return header + lessonsJson + footer;
}

/**
 * Generate lessons data for a specific language
 * @param {string} language - Language code ('en' or 'ru')
 */
function generateLessonsData(language = 'en') {
  const config = CONFIG[language];
  
  if (!config) {
    console.error(`❌ Invalid language: ${language}`);
    process.exit(1);
  }
  
  console.log(`🚀 Starting ${language.toUpperCase()} lessons data generation...`);
  
  try {
    // Check if lessons directory exists
    if (!fs.existsSync(config.lessonsDir)) {
      console.error(`❌ Lessons directory not found: ${config.lessonsDir}`);
      process.exit(1);
    }
    
    // Read all markdown files
    const files = fs.readdirSync(config.lessonsDir)
      .filter(file => file.endsWith('.md'))
      .sort();
    
    console.log(`📁 Found ${files.length} lesson files`);
    
    if (files.length === 0) {
      console.error(`❌ No markdown files found in ${config.lessonsDir}`);
      process.exit(1);
    }
    
    // Parse each file
    const lessons = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(config.lessonsDir, file);
      
      console.log(`📖 Parsing ${file}...`);
      
      try {
        const lessonData = parseMarkdownFile(filePath, i, language);
        lessons.push(lessonData);
        console.log(`✅ Successfully parsed ${file}`);
      } catch (error) {
        console.error(`❌ Error parsing ${file}:`, error.message);
        process.exit(1);
      }
    }
    
    // Sort lessons by ID
    lessons.sort((a, b) => a.id - b.id);
    
    // Generate TypeScript file content
    const tsContent = generateTypeScriptFile(lessons, language);
    
    // Ensure output directory exists
    const outputDir = path.dirname(config.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(config.outputFile, tsContent, 'utf-8');
    
    console.log(`✅ Successfully generated ${lessons.length} lessons`);
    console.log(`📄 Output written to: ${config.outputFile}`);
    
  } catch (error) {
    console.error(`❌ Error generating lessons data:`, error.message);
    process.exit(1);
  }
}

/**
 * Generate lessons data for all languages
 */
function generateAllLessonsData() {
  console.log('🚀 Starting lessons data generation for all languages...');
  
  // Generate English lessons
  generateLessonsData('eng');
  
  // Generate Russian lessons
  generateLessonsData('rus');
  
  console.log('✅ All lessons data generated successfully!');
}

// Run the script
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Generate all languages
    generateAllLessonsData();
  } else if (args[0] === 'eng') {
    generateLessonsData('eng');
  } else if (args[0] === 'rus') {
    generateLessonsData('rus');
  } else {
    console.error('❌ Invalid argument. Use: node generate-lessons-data.js [eng|rus]');
    process.exit(1);
  }
}