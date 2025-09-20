import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import type { LessonContent, ParsedLesson } from '@/types/lesson';

/**
 * Parse a markdown file and extract lesson content
 * @param filePath - Path to the markdown file
 * @returns Parsed lesson data
 */
export async function parseLessonFile(filePath: string): Promise<ParsedLesson> {
  try {
    // Read the file content
    const fileContent = readFileSync(filePath, 'utf-8');

    // Parse frontmatter and content
    const { data: frontmatter, content } = matter(fileContent);

    // Extract slug from filename
    const slug = extractSlugFromPath(filePath);

    // Parse the markdown content
    const lessonContent = await parseMarkdownContent(content, frontmatter);

    return {
      content: lessonContent,
      slug,
      filePath,
    };
  } catch (error) {
    console.error(`Error parsing lesson file ${filePath}:`, error);
    throw new Error(`Failed to parse lesson file: ${filePath}`);
  }
}

/**
 * Extract slug from file path
 * @param filePath - Full path to the file
 * @returns Slug extracted from filename
 */
function extractSlugFromPath(filePath: string): string {
  const filename = filePath.split('/').pop() || '';
  return filename.replace(/\.md$/, '');
}

/**
 * Parse markdown content and extract structured lesson data
 * @param content - Raw markdown content
 * @param frontmatter - Frontmatter data
 * @returns Structured lesson content
 */
async function parseMarkdownContent(
  content: string,
  frontmatter: Record<string, unknown>
): Promise<LessonContent> {
  // Split content into sections
  const sections = content.split(/^## /m).filter(Boolean);

  // Initialize lesson content structure
  const lessonContent: LessonContent = {
    metadata: {
      title: (frontmatter.title as string) || '',
      description: (frontmatter.description as string) || '',
      keywords: (frontmatter.keywords as string[]) || [],
      level: (frontmatter.level as string) || 'B1-B2',
      topic: (frontmatter.topic as string) || '',
      estimatedTime: (frontmatter.estimatedTime as string) || '10-15 minutes',
      difficulty:
        (frontmatter.difficulty as 'beginner' | 'intermediate' | 'advanced') || 'intermediate',
    },
    words: [],
    mainText: '',
    additionalExamples: [],
    practicalPhrases: [],
    synonyms: [],
    grammarNotes: '',
    relatedTopics: [],
  };

  // Process each section
  for (const section of sections) {
    const lines = section.split('\n');
    const sectionTitle = lines[0]?.trim();
    const sectionContent = lines.slice(1).join('\n').trim();

    switch (sectionTitle) {
      case 'Ключевые слова / Key Words':
        lessonContent.words = parseWordsSection(sectionContent);
        break;
      case 'Основной текст / Main Text':
        lessonContent.mainText = await convertMarkdownToHtml(sectionContent);
        break;
      case 'Дополнительные примеры / Additional Examples':
        lessonContent.additionalExamples = parseExamplesSection(sectionContent);
        break;
      case 'Практические фразы / Practical Phrases':
        lessonContent.practicalPhrases = parsePhrasesSection(sectionContent);
        break;
      case 'Синонимы и контекстное использование / Synonyms & Contextual Usage':
        lessonContent.synonyms = parseSynonymsSection(sectionContent);
        break;
      case 'Грамматические заметки / Grammar Notes':
        lessonContent.grammarNotes = await convertMarkdownToHtml(sectionContent);
        break;
      case 'Связанные темы / Related Topics':
        lessonContent.relatedTopics = parseRelatedTopicsSection(sectionContent);
        break;
    }
  }

  return lessonContent;
}

/**
 * Parse words section
 * @param content - Section content
 * @returns Array of lesson words
 */
function parseWordsSection(
  content: string
): Array<{ word: string; translation: string; partOfSpeech: string; example?: string }> {
  const words: Array<{
    word: string;
    translation: string;
    partOfSpeech: string;
    example?: string;
  }> = [];
  const lines = content.split('\n').filter(Boolean);

  for (const line of lines) {
    // Match pattern: - **word** - translation (partOfSpeech) - example
    const match = line.match(/^- \*\*(.+?)\*\* - (.+?) \((.+?)\)(?: - (.+))?$/);
    if (match) {
      words.push({
        word: match[1],
        translation: match[2],
        partOfSpeech: match[3],
        example: match[4],
      });
    }
  }

  return words;
}

/**
 * Parse examples section
 * @param content - Section content
 * @returns Array of examples
 */
function parseExamplesSection(content: string): string[] {
  return content
    .split('\n')
    .filter(line => line.startsWith('- '))
    .map(line => line.replace(/^- /, '').trim())
    .filter(Boolean);
}

/**
 * Parse phrases section
 * @param content - Section content
 * @returns Array of phrases
 */
function parsePhrasesSection(content: string): string[] {
  return content
    .split('\n')
    .filter(line => line.startsWith('- '))
    .map(line => line.replace(/^- /, '').trim())
    .filter(Boolean);
}

/**
 * Parse synonyms section
 * @param content - Section content
 * @returns Array of synonyms
 */
function parseSynonymsSection(
  content: string
): Array<{ word: string; synonyms: Array<{ synonym: string; context: string; example: string }> }> {
  const synonyms: Array<{
    word: string;
    synonyms: Array<{ synonym: string; context: string; example: string }>;
  }> = [];
  const lines = content.split('\n').filter(Boolean);
  let currentWord: string | null = null;
  let currentSynonyms: Array<{ synonym: string; context: string; example: string }> = [];

  for (const line of lines) {
    // Match word pattern: - **word**:
    const wordMatch = line.match(/^- \*\*(.+?)\*\*:$/);
    if (wordMatch) {
      // Save previous word if exists
      if (currentWord) {
        synonyms.push({
          word: currentWord,
          synonyms: currentSynonyms,
        });
      }

      // Start new word
      currentWord = wordMatch[1];
      currentSynonyms = [];
    } else if (currentWord && line.startsWith('  - ')) {
      // Match synonym pattern: - synonym (context) - "example"
      const synonymMatch = line.match(/^- (.+?) \((.+?)\) - "(.+?)"$/);
      if (synonymMatch) {
        currentSynonyms.push({
          synonym: synonymMatch[1],
          context: synonymMatch[2],
          example: synonymMatch[3],
        });
      }
    }
  }

  // Save last word
  if (currentWord) {
    synonyms.push({
      word: currentWord,
      synonyms: currentSynonyms,
    });
  }

  return synonyms;
}

/**
 * Parse related topics section
 * @param content - Section content
 * @returns Array of related topics
 */
function parseRelatedTopicsSection(content: string): string[] {
  return content
    .split('\n')
    .filter(line => line.startsWith('- '))
    .map(line => line.replace(/^- /, '').trim())
    .filter(Boolean);
}

/**
 * Convert markdown to HTML
 * @param markdown - Markdown content
 * @returns HTML content
 */
async function convertMarkdownToHtml(markdown: string): Promise<string> {
  try {
    const result = await remark().use(remarkHtml, { sanitize: false }).process(markdown);

    return result.toString();
  } catch (error) {
    console.error('Error converting markdown to HTML:', error);
    return markdown; // Return original content if conversion fails
  }
}

/**
 * Get all lesson files from the lessons directory
 * @param lessonsDir - Path to lessons directory
 * @returns Array of lesson file paths
 */
export function getLessonFiles(lessonsDir: string): string[] {
  try {
    const files = readdirSync(lessonsDir);
    return files
      .filter((file: string) => file.endsWith('.md'))
      .map((file: string) => join(lessonsDir, file))
      .sort();
  } catch (error) {
    console.error('Error reading lessons directory:', error);
    return [];
  }
}
