const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputFile: 'texts/courses/eng/b1b2/commonData/3000_the_most_common_words_full.csv',
  outputFile: 'src/data/engVocabularyData.ts'
};

// Helper function to parse CSV line with proper handling of quoted values
function parseCsvLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

// Parse CSV file
function parseCsvFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const words = [];

  // Skip header line
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse CSV line with 4 columns: Words, P.O.S, Russian Meaning, Beautiful sentence usage example
    const columns = parseCsvLine(line);
    
    if (columns.length >= 4) {
      const word = columns[0].trim();
      const partOfSpeech = columns[1].trim();
      const translation = columns[2].trim();
      const example = columns[3].trim();
      
      if (word && partOfSpeech) {
        words.push({
          id: i, // Use line number as ID
          word,
          partOfSpeech,
          translation: translation || '',
          exampleSentence: example || ''
        });
      }
    }
  }

  return words;
}

// Generate TypeScript file content
function generateTypeScriptFile(words) {
  const header = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}
// Source: ${CONFIG.inputFile}

import type { VocabularyWord, VocabularyData } from '@/shared/types/vocabulary';

export const ENG_VOCABULARY_DATA: VocabularyData = `;
  
  const data = {
    words: words.sort((a, b) => a.word.localeCompare(b.word)),
    totalWords: words.length,
    language: 'en',
    level: 'B1-B2'
  };

  const dataJson = JSON.stringify(data, null, 2);
  
  const footer = `;

export const VOCABULARY_WORDS = ENG_VOCABULARY_DATA.words;
export const VOCABULARY_TOTAL = ENG_VOCABULARY_DATA.totalWords;
export const VOCABULARY_LANGUAGE = ENG_VOCABULARY_DATA.language;
export const VOCABULARY_LEVEL = ENG_VOCABULARY_DATA.level;

// Helper functions
export const getWordsByPartOfSpeech = (partOfSpeech: string) => {
  return ENG_VOCABULARY_DATA.words.filter(word =>
    word.partOfSpeech.toLowerCase().includes(partOfSpeech.toLowerCase())
  );
};

export const searchWords = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return ENG_VOCABULARY_DATA.words.filter(
    word =>
      word.word.toLowerCase().includes(lowerQuery) ||
      word.translation.toLowerCase().includes(lowerQuery) ||
      word.partOfSpeech.toLowerCase().includes(lowerQuery)
  );
};

export const getWordsByLetter = (letter: string) => {
  return ENG_VOCABULARY_DATA.words.filter(word => word.word.toLowerCase().startsWith(letter.toLowerCase()));
};
`;
  
  return header + dataJson + footer;
}

// Main function
function fixEnglishVocabulary() {
  console.log('🚀 Starting English vocabulary data fix...');
  
  try {
    // Check if input file exists
    if (!fs.existsSync(CONFIG.inputFile)) {
      console.error(`❌ Input file not found: ${CONFIG.inputFile}`);
      process.exit(1);
    }
    
    // Parse words from CSV
    const words = parseCsvFile(CONFIG.inputFile);
    console.log(`📁 Found ${words.length} words`);
    
    if (words.length === 0) {
      console.error(`❌ No words found in ${CONFIG.inputFile}`);
      process.exit(1);
    }
    
    // Generate TypeScript file content
    const tsContent = generateTypeScriptFile(words);
    
    // Ensure output directory exists
    const outputDir = path.dirname(CONFIG.outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    fs.writeFileSync(CONFIG.outputFile, tsContent, 'utf-8');
    
    console.log(`✅ Successfully generated ${words.length} words`);
    console.log(`📄 Output written to: ${CONFIG.outputFile}`);
    
    // Show first few words as verification
    console.log('\n📋 First 5 words:');
    words.slice(0, 5).forEach((word, index) => {
      console.log(`${index + 1}. ${word.word} (${word.partOfSpeech}) - ${word.translation}`);
    });
    
  } catch (error) {
    console.error(`❌ Error fixing vocabulary data:`, error.message);
    process.exit(1);
  }
}

// Run the script
fixEnglishVocabulary();
