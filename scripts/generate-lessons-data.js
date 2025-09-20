#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to generate ENG_B1_B2_LESSONS_DATA from markdown files
 * This script parses all lesson markdown files and generates a TypeScript constants file
 * with structured data for the lessons.
 */

// Configuration
const LESSONS_DIR = path.join(__dirname, '../texts/eng/b1b2/lessons_list');
const OUTPUT_FILE = path.join(__dirname, '../texts/eng/b1b2/constants/lessonsData.ts');

/**
 * Parse markdown file and extract structured data
 * @param {string} filePath - Path to the markdown file
 * @param {number} index - Index of the file for ID generation
 * @returns {Object} Parsed lesson data
 */
function parseMarkdownFile(filePath, index = 0) {
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
  const relatedTopics = parseRelatedTopics(relatedSection);
  
  return {
    id: extractIdFromFilename(filename, index),
    slug,
    title,
    titleRu,
    description: generateDescription(title, keywords),
    keywords,
    mainText,
    additionalExamples,
    practicalPhrases,
    synonyms,
    grammarNotes,
    relatedTopics,
    category: extractCategoryFromFilename(filename),
    level: 'B1-B2',
    language: 'en'
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
      // Stop at next main section (starts with ## but not ###)
      if (line.startsWith('##') && !line.startsWith('###') && !line.includes(sectionTitle)) {
        break;
      }
      sectionContent.push(line);
    }
  }
  
  return sectionContent.join('\n').trim();
}

/**
 * Parse keywords from the keywords section
 * @param {string} section - Keywords section content
 * @returns {Array} Array of keyword objects
 */
function parseKeywords(section) {
  if (!section) return [];
  
  const lines = section.split('\n');
  const keywords = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      // Parse format: - word (translation) - partOfSpeech
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
 * Parse examples from the examples section
 * @param {string} section - Examples section content
 * @returns {Array} Array of example objects
 */
function parseExamples(section) {
  if (!section) return [];
  
  const lines = section.split('\n');
  const examples = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and subheadings
    if (!trimmedLine || trimmedLine.startsWith('###') || trimmedLine.startsWith('##')) {
      continue;
    }
    
    if (trimmedLine.startsWith('- **')) {
      // Parse format: - **word**: "example" (translation)
      const match = trimmedLine.match(/^- \*\*(.+?)\*\*: "(.+?)" \((.+?)\)/);
      if (match) {
        examples.push({
          word: match[1].trim(),
          example: match[2].trim(),
          translation: match[3].trim()
        });
      }
    } else if (trimmedLine.startsWith('- ')) {
      // Regular example without word reference
      const example = trimmedLine.substring(2).trim();
      if (example && !example.startsWith('**')) {
        examples.push({
          word: null,
          example: example,
          translation: null
        });
      }
    }
  }
  
  return examples;
}

/**
 * Parse phrases from the phrases section
 * @param {string} section - Phrases section content
 * @returns {Array} Array of phrase objects
 */
function parsePhrases(section) {
  if (!section) return [];
  
  const lines = section.split('\n');
  const phrases = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Skip empty lines and subheadings
    if (!trimmedLine || trimmedLine.startsWith('###') || trimmedLine.startsWith('##')) {
      continue;
    }
    
    if (trimmedLine.startsWith('- ')) {
      // Parse format: - "phrase" - translation
      const match = trimmedLine.match(/^- "(.+?)" - (.+?)$/);
      if (match) {
        phrases.push({
          phrase: match[1].trim(),
          translation: match[2].trim()
        });
      } else {
        // Regular phrase without quotes
        const phrase = trimmedLine.substring(2).trim();
        if (phrase) {
          phrases.push({
            phrase: phrase,
            translation: null
          });
        }
      }
    }
  }
  
  return phrases;
}

/**
 * Parse synonyms from the synonyms section
 * @param {string} section - Synonyms section content
 * @returns {Array} Array of synonym objects
 */
function parseSynonyms(section) {
  if (!section) return [];
  
  const lines = section.split('\n');
  const synonyms = [];
  let currentWord = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('- **')) {
      // New word section: - **word**:
      const match = trimmedLine.match(/^- \*\*(.+?)\*\*:\s*$/);
      if (match) {
        currentWord = match[1].trim();
      }
    } else if (trimmedLine.startsWith('  - ') && currentWord) {
      // Synonym line: - synonym (context) - "example"
      const cleanLine = trimmedLine.replace(/^  - /, '- ').replace(/\r$/, '');
      const match = cleanLine.match(/^- (.+?) \((.+?)\) - "(.+?)"$/);
      if (match) {
        synonyms.push({
          word: currentWord,
          synonym: match[1].trim(),
          context: match[2].trim(),
          example: match[3].trim()
        });
      }
    }
  }
  
  return synonyms;
}

/**
 * Parse related topics from the related topics section
 * @param {string} section - Related topics section content
 * @returns {Array} Array of related topic objects
 */
function parseRelatedTopics(section) {
  if (!section) return [];
  
  const lines = section.split('\n');
  const topics = [];
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith('- ')) {
      const topic = trimmedLine.substring(2).trim();
      if (topic) {
        topics.push({
          name: topic,
          slug: generateSlug(topic)
        });
      }
    }
  }
  
  return topics;
}

/**
 * Extract ID from filename (e.g., "01-family-relationships" -> 1)
 * @param {string} filename - Filename without extension
 * @returns {number} Lesson ID
 */
function extractIdFromFilename(filename, index) {
  // Since we removed the numeric prefix, we'll use the index + 1 as ID
  return index + 1;
}

/**
 * Extract category from filename
 * @param {string} filename - Filename without extension
 * @returns {string} Category name
 */
function extractCategoryFromFilename(filename) {
  const parts = filename.split('-');
  if (parts.length >= 2) {
    return parts.slice(1).join(' ').replace(/\b\w/g, l => l.toUpperCase());
  }
  return 'General';
}

/**
 * Generate description from title and keywords
 * @param {string} title - Lesson title
 * @param {Array} keywords - Array of keywords
 * @returns {string} Generated description
 */
function generateDescription(title, keywords) {
  const keywordList = keywords.slice(0, 5).map(k => k.word).join(', ');
  return `Learn ${title.toLowerCase()} vocabulary including ${keywordList} and more essential words for daily communication.`;
}

/**
 * Generate slug from text
 * @param {string} text - Text to convert to slug
 * @returns {string} URL-friendly slug
 */
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

/**
 * Main function to generate lessons data
 */
function generateLessonsData() {
  console.log('🚀 Starting lessons data generation...');
  
  try {
    // Read all markdown files from lessons directory
    const files = fs.readdirSync(LESSONS_DIR)
      .filter(file => file.endsWith('.md'))
      .sort(); // Sort to maintain consistent order
    
    console.log(`📁 Found ${files.length} lesson files`);
    
    const lessons = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const filePath = path.join(LESSONS_DIR, file);
      console.log(`📖 Parsing ${file}...`);
      
      try {
        const lessonData = parseMarkdownFile(filePath, i);
        lessons.push(lessonData);
        console.log(`✅ Successfully parsed ${file}`);
      } catch (error) {
        console.error(`❌ Error parsing ${file}:`, error.message);
        // Continue with other files
      }
    }
    
    // Generate TypeScript constants file
    const tsContent = generateTypeScriptFile(lessons);
    
    // Ensure output directory exists
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write the generated file
    fs.writeFileSync(OUTPUT_FILE, tsContent, 'utf-8');
    
    console.log(`✅ Successfully generated ${lessons.length} lessons`);
    console.log(`📄 Output written to: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('❌ Error generating lessons data:', error);
    process.exit(1);
  }
}

/**
 * Generate TypeScript file content
 * @param {Array} lessons - Array of lesson objects
 * @returns {string} TypeScript file content
 */
function generateTypeScriptFile(lessons) {
  const header = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}
// Source: ${LESSONS_DIR}

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

export const ENG_B1_B2_LESSONS_DATA: LessonData[] = `;

  const lessonsJson = JSON.stringify(lessons, null, 2);
  
  const footer = `;

export const LESSONS_COUNT = ${lessons.length};

export const LESSONS_BY_CATEGORY = ENG_B1_B2_LESSONS_DATA.reduce((acc, lesson) => {
  if (!acc[lesson.category]) {
    acc[lesson.category] = [];
  }
  acc[lesson.category].push(lesson);
  return acc;
}, {} as Record<string, LessonData[]>);

export const LESSONS_BY_ID = ENG_B1_B2_LESSONS_DATA.reduce((acc, lesson) => {
  acc[lesson.id] = lesson;
  return acc;
}, {} as Record<number, LessonData>);

export const LESSONS_BY_SLUG = ENG_B1_B2_LESSONS_DATA.reduce((acc, lesson) => {
  acc[lesson.slug] = lesson;
  return acc;
}, {} as Record<string, LessonData>);
`;

  return header + lessonsJson + footer;
}

// Run the script if called directly
if (require.main === module) {
  generateLessonsData();
}

module.exports = { generateLessonsData, parseMarkdownFile };
