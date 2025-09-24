#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Script to generate vocabulary data from CSV and MD files
 * This script parses vocabulary files and generates TypeScript constants files
 * with structured data for the vocabulary pages.
 */

// Configuration
const CONFIG = {
  eng: {
    inputFile: path.join(__dirname, '../texts/courses/eng/b1b2/commonData/3000_the_most_common_words_full.csv'),
    outputFile: path.join(__dirname, '../src/data/engVocabularyData.ts'),
    language: 'en',
    level: 'B1-B2'
  },
  rus: {
    inputFile: path.join(__dirname, '../texts/courses/rus/a2/commonData/2000_common_russian.md'),
    outputFile: path.join(__dirname, '../src/data/rusVocabularyData.ts'),
    language: 'ru',
    level: 'A1-A2'
  }
};

/**
 * Generate example sentence for a word
 * @param {string} word - The word
 * @param {string} partOfSpeech - Part of speech
 * @param {string} language - Language code
 * @returns {string} Example sentence
 */
function generateExample(word, partOfSpeech, language) {
  const examples = {
    en: {
      noun: `The ${word} is very important.`,
      verb: `I ${word} every day.`,
      adjective: `This is a ${word} example.`,
      adverb: `She speaks ${word}.`,
      preposition: `We went ${word} the store.`,
      pronoun: `${word} is my friend.`,
      conjunction: `I like tea ${word} coffee.`,
      interjection: `${word}! That's amazing!`,
      article: `I need ${word} book.`,
      default: `This is an example with ${word}.`
    },
    ru: {
      noun: `Этот ${word} очень важный.`,
      verb: `Я ${word} каждый день.`,
      adjective: `Это ${word} пример.`,
      adverb: `Она говорит ${word}.`,
      preposition: `Мы пошли ${word} магазин.`,
      pronoun: `${word} мой друг.`,
      conjunction: `Я люблю чай ${word} кофе.`,
      interjection: `${word}! Это удивительно!`,
      article: `Мне нужна ${word} книга.`,
      default: `Это пример с ${word}.`
    }
  };

  const langExamples = examples[language] || examples.en;
  const posKey = partOfSpeech.toLowerCase().replace(/[^a-z]/g, '');
  
  return langExamples[posKey] || langExamples.default;
}

/**
 * Parse CSV file for English vocabulary
 * @param {string} filePath - Path to CSV file
 * @returns {Array} Array of vocabulary words
 */
function parseCsvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const words = [];

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line with 4 columns: Words, P.O.S, Russian Meaning, Beautiful sentence usage example
    // Handle both quoted and unquoted values
    const columns = parseCsvLine(line);
    
    if (columns.length >= 4) {
      const word = columns[0].trim();
      const partOfSpeech = columns[1].trim();
      const translation = columns[2].trim();
      const example = columns[3].trim();
      
      if (word && partOfSpeech) {
        words.push({
          word,
          partOfSpeech,
          translation: translation || '',
          exampleSentence: example || generateExample(word, partOfSpeech, 'en')
        });
      }
    }
  }

  return words;
}

/**
 * Parse a CSV line handling quoted values
 * @param {string} line - CSV line
 * @returns {Array} Array of column values
 */
function parseCsvLine(line) {
  const columns = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      columns.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  // Add the last column
  columns.push(current);
  
  return columns;
}

/**
 * Parse MD file for Russian vocabulary
 * @param {string} filePath - Path to MD file
 * @returns {Array} Array of vocabulary words
 */
function parseMdFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const words = [];

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    // Filter out explanatory text and headers
    // Skip lines that are clearly not Russian words
    if (
      trimmedLine.includes(' ') || // Skip lines with spaces (explanatory text)
      trimmedLine.includes('http') || // Skip URLs
      trimmedLine.includes('CEFR') || // Skip descriptions
      trimmedLine.includes('Corpus') || // Skip corpus references
      trimmedLine.includes('Key Points') || // Skip headers
      trimmedLine.includes('Selection Process') || // Skip headers
      trimmedLine.includes('Supporting Resources') || // Skip headers
      trimmedLine.startsWith('Below is') || // Skip descriptions
      trimmedLine.startsWith('The list') || // Skip descriptions
      trimmedLine.startsWith('Words are') || // Skip descriptions
      trimmedLine.startsWith('The evidence') || // Skip descriptions
      trimmedLine.startsWith('The words are') || // Skip descriptions
      trimmedLine.startsWith('Russian National') || // Skip references
      trimmedLine.startsWith('Wiktionary') || // Skip references
      trimmedLine.startsWith('Sketch Engine') || // Skip references
      trimmedLine.length > 50 || // Skip very long lines (likely explanatory text)
      /^[A-Z]/.test(trimmedLine) // Skip lines starting with English capital letters
    ) {
      continue;
    }

    // Simple parsing - each line is a word
    const word = trimmedLine;
    if (word && word.length > 1 && word.length < 30) { // Reasonable word length
      words.push({
        word,
        partOfSpeech: 'noun', // Default for Russian words
        translation: '', // Will be filled by translation service or manual entry
        exampleSentence: generateExample(word, 'noun', 'ru')
      });
    }
  }

  return words;
}

/**
 * Generate TypeScript file content
 * @param {Array} words - Array of vocabulary words
 * @param {string} language - Language code
 * @param {string} level - Language level
 * @returns {string} TypeScript file content
 */
function generateTypeScriptFile(words, language, level) {
  const isRussian = language === 'rus';
  const dataName = isRussian ? 'RUS_VOCABULARY_DATA' : 'ENG_VOCABULARY_DATA';
  const langName = isRussian ? 'Russian' : 'English';
  
  const header = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}
// Source: ${isRussian ? CONFIG.rus.inputFile : CONFIG.eng.inputFile}

import type { VocabularyWord, VocabularyData } from '@/shared/types/vocabulary';

export const ${dataName}: VocabularyData = `;

  const data = {
    words: words.sort((a, b) => a.word.localeCompare(b.word)),
    totalWords: words.length,
    language: isRussian ? 'ru' : 'en',
    level
  };

  const dataJson = JSON.stringify(data, null, 2);
  
  const footer = `;

export const VOCABULARY_WORDS = ${dataName}.words;
export const VOCABULARY_TOTAL = ${dataName}.totalWords;
export const VOCABULARY_LANGUAGE = ${dataName}.language;
export const VOCABULARY_LEVEL = ${dataName}.level;

// Helper functions
export const getWordsByPartOfSpeech = (partOfSpeech: string) => {
  return ${dataName}.words.filter(word => word.partOfSpeech.toLowerCase().includes(partOfSpeech.toLowerCase()));
};

export const searchWords = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return ${dataName}.words.filter(word => 
    word.word.toLowerCase().includes(lowerQuery) ||
    word.translation.toLowerCase().includes(lowerQuery) ||
    word.partOfSpeech.toLowerCase().includes(lowerQuery)
  );
};

export const getWordsByLetter = (letter: string) => {
  return ${dataName}.words.filter(word => word.word.toLowerCase().startsWith(letter.toLowerCase()));
};
`;

  return header + dataJson + footer;
}

/**
 * Generate vocabulary data for a specific language
 * @param {string} language - Language code ('en' or 'ru')
 */
function generateVocabularyData(language = 'en') {
  const config = CONFIG[language];
  
  if (!config) {
    console.error(`❌ Invalid language: ${language}`);
    process.exit(1);
  }
  
  console.log(`🚀 Starting ${language.toUpperCase()} vocabulary data generation...`);
  
  try {
    // Check if input file exists
    if (!fs.existsSync(config.inputFile)) {
      console.error(`❌ Input file not found: ${config.inputFile}`);
      process.exit(1);
    }
    
    let words = [];
    
    if (language === 'eng') {
      words = parseCsvFile(config.inputFile);
    } else {
      words = parseMdFile(config.inputFile);
    }
    
    console.log(`📁 Found ${words.length} words`);
    
    if (words.length === 0) {
      console.error(`❌ No words found in ${config.inputFile}`);
      process.exit(1);
    }
    
    // Generate TypeScript file content
    const tsContent = generateTypeScriptFile(words, language, config.level);
    
    // Ensure output directory exists
    const outputDir = path.dirname(config.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(config.outputFile, tsContent, 'utf-8');
    
    console.log(`✅ Successfully generated ${words.length} words`);
    console.log(`📄 Output written to: ${config.outputFile}`);
    
  } catch (error) {
    console.error(`❌ Error generating vocabulary data:`, error.message);
    process.exit(1);
  }
}

/**
 * Generate vocabulary data for all languages
 */
function generateAllVocabularyData() {
  console.log('🚀 Starting vocabulary data generation for all languages...');
  
  // Generate English vocabulary
  generateVocabularyData('eng');
  
  // Generate Russian vocabulary
  generateVocabularyData('rus');
  
  console.log('✅ All vocabulary data generated successfully!');
}

// Run the script
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    // Generate all languages
    generateAllVocabularyData();
  } else if (args[0] === 'eng') {
    generateVocabularyData('eng');
  } else if (args[0] === 'rus') {
    generateVocabularyData('rus');
  } else {
    console.error('❌ Invalid argument. Use: node generate-vocabulary-data.js [eng|rus]');
    process.exit(1);
  }
}
