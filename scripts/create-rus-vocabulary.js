const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  inputFile: 'texts/courses/rus/a2/commonData/russian_words.txt',
  outputFile: 'src/data/rusVocabularyData.ts'
};

// Russian to English translations for A2 level
const translations = {
  // Basic words
  'и': 'and', 'в': 'in', 'не': 'not', 'он': 'he', 'на': 'on', 'я': 'I', 'что': 'what', 'тот': 'that',
  'быть': 'to be', 'а': 'but', 'весь': 'all', 'это': 'this', 'как': 'how', 'она': 'she', 'по': 'by',
  'но': 'but', 'они': 'they', 'к': 'to', 'у': 'at', 'ты': 'you', 'из': 'from', 'мы': 'we', 'за': 'for',
  'вы': 'you', 'так': 'so', 'же': 'also', 'от': 'from', 'сказать': 'to say', 'этот': 'this',
  'который': 'which', 'мочь': 'can', 'человек': 'person', 'о': 'about', 'один': 'one', 'еще': 'still',
  'бы': 'would', 'такой': 'such', 'только': 'only', 'себя': 'oneself', 'свое': 'one\'s own',
  'какой': 'what kind', 'когда': 'when', 'уже': 'already', 'для': 'for', 'вот': 'here', 'кто': 'who',
  'да': 'yes', 'говорить': 'to speak', 'год': 'year', 'знать': 'to know', 'мой': 'my', 'до': 'until',
  'или': 'or', 'если': 'if', 'время': 'time', 'рука': 'hand', 'нет': 'no', 'самый': 'most',
  'ни': 'neither', 'стать': 'to become', 'большой': 'big', 'даже': 'even', 'другой': 'other',
  'наш': 'our', 'свой': 'one\'s own', 'ну': 'well', 'под': 'under', 'где': 'where', 'дело': 'matter',
  'есть': 'there is', 'сам': 'himself', 'раз': 'time', 'чтобы': 'in order to', 'два': 'two',
  'там': 'there', 'чем': 'than', 'глаз': 'eye', 'жизнь': 'life', 'первый': 'first', 'день': 'day',
  'тут': 'here', 'во': 'in', 'ничто': 'nothing', 'потом': 'then', 'очень': 'very', 'со': 'with',
  'хотеть': 'to want', 'ли': 'whether', 'при': 'at', 'голова': 'head', 'надо': 'need to',
  'без': 'without', 'видеть': 'to see', 'идти': 'to go', 'теперь': 'now', 'тоже': 'also',
  'стоять': 'to stand', 'друг': 'friend', 'дом': 'house',
  
  // Additional common words
  'автобус': 'bus', 'аптека': 'pharmacy', 'армия': 'army', 'бабушка': 'grandmother', 'бег': 'running',
  'бежать': 'to run', 'белый': 'white', 'берег': 'shore', 'билет': 'ticket', 'больница': 'hospital',
  'брат': 'brother', 'бумага': 'paper', 'быстро': 'quickly', 'важный': 'important', 'вечер': 'evening',
  'вода': 'water', 'воздух': 'air', 'война': 'war', 'вопрос': 'question', 'встреча': 'meeting',
  'высокий': 'tall', 'газета': 'newspaper', 'город': 'city', 'государство': 'state', 'готовить': 'to cook',
  'гражданин': 'citizen', 'группа': 'group', 'давать': 'to give', 'дверь': 'door', 'девушка': 'girl',
  'дело': 'business', 'деньги': 'money', 'деревня': 'village', 'директор': 'director', 'доктор': 'doctor',
  'должен': 'must', 'дорога': 'road', 'дочь': 'daughter', 'другой': 'other', 'думать': 'to think',
  'еда': 'food', 'если': 'if', 'ехать': 'to go', 'жена': 'wife', 'женщина': 'woman', 'жить': 'to live',
  'завтра': 'tomorrow', 'закон': 'law', 'заниматься': 'to study', 'запад': 'west', 'здание': 'building',
  'здесь': 'here', 'земля': 'earth', 'знать': 'to know', 'золото': 'gold', 'играть': 'to play',
  'идея': 'idea', 'известный': 'famous', 'иметь': 'to have', 'имя': 'name', 'интересный': 'interesting',
  'искать': 'to search', 'искусство': 'art', 'история': 'history', 'кабинет': 'office', 'каждый': 'each',
  'камень': 'stone', 'картина': 'picture', 'качество': 'quality', 'квартира': 'apartment', 'кино': 'cinema',
  'класс': 'class', 'книга': 'book', 'когда': 'when', 'комната': 'room', 'компания': 'company',
  'конец': 'end', 'контроль': 'control', 'король': 'king', 'красивый': 'beautiful', 'красный': 'red',
  'кровь': 'blood', 'круг': 'circle', 'купить': 'to buy', 'курс': 'course', 'лес': 'forest',
  'лето': 'summer', 'лицо': 'face', 'лучший': 'best', 'маленький': 'small', 'мама': 'mom',
  'машина': 'car', 'место': 'place', 'месяц': 'month', 'мир': 'world', 'много': 'many',
  'молодой': 'young', 'море': 'sea', 'муж': 'husband', 'мужчина': 'man', 'музыка': 'music',
  'называть': 'to call', 'написать': 'to write', 'настоящий': 'real', 'наука': 'science',
  'начало': 'beginning', 'небо': 'sky', 'неделя': 'week', 'некоторый': 'some', 'новый': 'new',
  'номер': 'number', 'ночь': 'night', 'нужный': 'necessary', 'общий': 'general', 'общество': 'society',
  'образование': 'education', 'объяснить': 'to explain', 'огонь': 'fire', 'однако': 'however',
  'окно': 'window', 'опыт': 'experience', 'организация': 'organization', 'основа': 'foundation',
  'особенно': 'especially', 'остаться': 'to stay', 'отвечать': 'to answer', 'открыть': 'to open',
  'отметить': 'to note', 'офицер': 'officer', 'очередь': 'queue', 'папа': 'dad', 'партия': 'party',
  'паспорт': 'passport', 'первый': 'first', 'песня': 'song', 'писать': 'to write', 'платить': 'to pay',
  'план': 'plan', 'площадь': 'square', 'победа': 'victory', 'поверхность': 'surface', 'погода': 'weather',
  'подготовить': 'to prepare', 'поезд': 'train', 'позволить': 'to allow', 'показать': 'to show',
  'покупать': 'to buy', 'пол': 'floor', 'получить': 'to get', 'помнить': 'to remember',
  'помочь': 'to help', 'понять': 'to understand', 'порядок': 'order', 'последний': 'last',
  'поставить': 'to put', 'потерять': 'to lose', 'потом': 'then', 'похожий': 'similar',
  'почему': 'why', 'правительство': 'government', 'правильный': 'correct', 'представить': 'to present',
  'президент': 'president', 'прийти': 'to come', 'принять': 'to accept', 'причина': 'reason',
  'проблема': 'problem', 'программа': 'program', 'проект': 'project', 'просить': 'to ask',
  'против': 'against', 'процесс': 'process', 'путь': 'way', 'работа': 'work', 'работать': 'to work',
  'развитие': 'development', 'разговор': 'conversation', 'различный': 'various', 'размер': 'size',
  'район': 'district', 'рассказать': 'to tell', 'результат': 'result', 'река': 'river',
  'решение': 'solution', 'рисунок': 'drawing', 'роль': 'role', 'рубль': 'ruble', 'рынок': 'market',
  'самолет': 'airplane', 'свет': 'light', 'свобода': 'freedom', 'свойство': 'property',
  'сделать': 'to do', 'сегодня': 'today', 'семья': 'family', 'серьезный': 'serious',
  'система': 'system', 'ситуация': 'situation', 'сказать': 'to say', 'скоро': 'soon',
  'случай': 'case', 'слушать': 'to listen', 'смерть': 'death', 'сначала': 'first',
  'снова': 'again', 'событие': 'event', 'совет': 'advice', 'современный': 'modern',
  'согласиться': 'to agree', 'содержание': 'content', 'солнце': 'sun', 'состояние': 'condition',
  'сотрудник': 'employee', 'социальный': 'social', 'спасибо': 'thank you', 'спорт': 'sport',
  'способ': 'method', 'средство': 'means', 'стакан': 'glass', 'старый': 'old', 'стена': 'wall',
  'стол': 'table', 'сторона': 'side', 'страна': 'country', 'страх': 'fear', 'строить': 'to build',
  'структура': 'structure', 'студент': 'student', 'сумма': 'sum', 'суть': 'essence',
  'считать': 'to count', 'счастье': 'happiness', 'сцена': 'stage', 'сюда': 'here',
  'таблица': 'table', 'талант': 'talent', 'театр': 'theater', 'тело': 'body', 'тема': 'topic',
  'теперь': 'now', 'теория': 'theory', 'территория': 'territory', 'техника': 'technology',
  'товарищ': 'comrade', 'тогда': 'then', 'толпа': 'crowd', 'тонкий': 'thin', 'торговля': 'trade',
  'точка': 'point', 'традиция': 'tradition', 'требовать': 'to demand', 'труд': 'labor',
  'туда': 'there', 'тысяча': 'thousand', 'убить': 'to kill', 'увидеть': 'to see',
  'угол': 'corner', 'удар': 'blow', 'уже': 'already', 'улица': 'street', 'уметь': 'to be able',
  'университет': 'university', 'управление': 'management', 'условие': 'condition',
  'успех': 'success', 'установить': 'to install', 'утро': 'morning', 'ухо': 'ear',
  'учить': 'to teach', 'уходить': 'to leave', 'факт': 'fact', 'фильм': 'film',
  'форма': 'form', 'функция': 'function', 'характер': 'character', 'хлеб': 'bread',
  'холодный': 'cold', 'хороший': 'good', 'хотеть': 'to want', 'цвет': 'color',
  'цель': 'goal', 'цена': 'price', 'центр': 'center', 'час': 'hour', 'часть': 'part',
  'человек': 'person', 'черный': 'black', 'четверг': 'Thursday', 'чистый': 'clean',
  'читатель': 'reader', 'читать': 'to read', 'чувство': 'feeling', 'школа': 'school',
  'экономика': 'economy', 'экран': 'screen', 'элемент': 'element', 'эпоха': 'era',
  'этот': 'this', 'юг': 'south', 'язык': 'language', 'январь': 'January'
};

// Generate A2-level example sentences
function generateExample(word, translation) {
  const examples = {
    'и': 'Я и мой друг идем в школу.',
    'в': 'Книга лежит в сумке.',
    'не': 'Я не знаю этого слова.',
    'он': 'Он хороший человек.',
    'на': 'Кошка сидит на столе.',
    'я': 'Я учу русский язык.',
    'что': 'Что ты делаешь?',
    'тот': 'Тот дом очень красивый.',
    'быть': 'Я хочу быть врачом.',
    'а': 'Я читаю, а он пишет.',
    'весь': 'Весь день идет дождь.',
    'это': 'Это моя книга.',
    'как': 'Как дела?',
    'она': 'Она говорит по-английски.',
    'по': 'Мы идем по улице.',
    'но': 'Я устал, но продолжаю работать.',
    'они': 'Они живут в Москве.',
    'к': 'Иди к маме.',
    'у': 'У меня есть собака.',
    'ты': 'Ты говоришь по-русски?',
    'из': 'Я из России.',
    'мы': 'Мы учимся в школе.',
    'за': 'Спасибо за помощь.',
    'вы': 'Вы говорите по-английски?',
    'так': 'Так холодно сегодня.',
    'же': 'Я тоже хочу пить.',
    'от': 'Дом находится далеко от школы.',
    'сказать': 'Что ты хочешь сказать?',
    'этот': 'Этот фильм очень интересный.',
    'который': 'Который час?',
    'мочь': 'Я не могу прийти.',
    'человек': 'Он добрый человек.',
    'о': 'Расскажи мне о своей семье.',
    'один': 'У меня есть один брат.',
    'еще': 'Еще немного, пожалуйста.',
    'бы': 'Я бы хотел поехать в отпуск.',
    'такой': 'Такой красивый день!',
    'только': 'Только не говори маме.',
    'себя': 'Он думает только о себе.',
    'свое': 'У каждого свое мнение.',
    'какой': 'Какой сегодня день?',
    'когда': 'Когда ты придешь?',
    'уже': 'Я уже сделал домашнее задание.',
    'для': 'Это подарок для тебя.',
    'вот': 'Вот твоя книга.',
    'кто': 'Кто это?',
    'да': 'Да, я согласен.',
    'говорить': 'Я учусь говорить по-русски.',
    'год': 'В этом году я поеду в отпуск.',
    'знать': 'Я знаю это слово.',
    'мой': 'Это мой дом.',
    'до': 'До встречи завтра!',
    'или': 'Чай или кофе?',
    'если': 'Если будет дождь, мы останемся дома.',
    'время': 'У меня нет времени.',
    'рука': 'Моя рука болит.',
    'нет': 'Нет, спасибо.',
    'самый': 'Это самый лучший день.',
    'ни': 'Ни я, ни он не знаем.',
    'стать': 'Я хочу стать врачом.',
    'большой': 'У нас большой дом.',
    'даже': 'Даже дети это понимают.',
    'другой': 'Попробуй другой способ.',
    'наш': 'Это наш дом.',
    'свой': 'У каждого свой характер.',
    'ну': 'Ну, что будем делать?',
    'под': 'Кошка спит под столом.',
    'где': 'Где ты живешь?',
    'дело': 'Это серьезное дело.',
    'есть': 'У меня есть время.',
    'сам': 'Он сам это сделал.',
    'раз': 'Один раз в неделю.',
    'чтобы': 'Чтобы выучить язык, нужно много практиковаться.',
    'два': 'У меня два брата.',
    'там': 'Там очень красиво.',
    'чем': 'Это лучше, чем то.',
    'глаз': 'У меня болят глаза.',
    'жизнь': 'Жизнь прекрасна.',
    'первый': 'Это первый раз.',
    'день': 'Хорошего дня!',
    'тут': 'Тут очень шумно.',
    'во': 'Во вторник я иду в театр.',
    'ничто': 'Ничто не может его остановить.',
    'потом': 'Сначала поешь, потом иди гулять.',
    'очень': 'Очень приятно познакомиться.',
    'со': 'Я иду со своим другом.',
    'хотеть': 'Я хочу пить.',
    'ли': 'Знаешь ли ты его?',
    'при': 'При школе есть библиотека.',
    'голова': 'У меня болит голова.',
    'надо': 'Надо идти домой.',
    'без': 'Без тебя мне скучно.',
    'видеть': 'Я хочу видеть тебя.',
    'идти': 'Я иду в школу.',
    'теперь': 'Теперь я понимаю.',
    'тоже': 'Я тоже хочу пить.',
    'стоять': 'Стой здесь и жди.',
    'друг': 'Он мой лучший друг.',
    'дом': 'Мой дом находится рядом с парком.'
  };
  
  return examples[word] || `${word} - это важное слово.`;
}

// Determine part of speech based on word patterns
function getPartOfSpeech(word) {
  // Common Russian word endings and patterns
  if (word.length <= 2) return 'preposition'; // и, в, на, по, etc.
  if (word.endsWith('ть') || word.endsWith('ти')) return 'verb';
  if (word.endsWith('ый') || word.endsWith('ая') || word.endsWith('ое') || word.endsWith('ие')) return 'adjective';
  if (word.endsWith('ость') || word.endsWith('ение') || word.endsWith('ание')) return 'noun';
  if (word.endsWith('о') || word.endsWith('а') || word.endsWith('е') || word.endsWith('и')) return 'noun';
  if (word.endsWith('но') || word.endsWith('ко') || word.endsWith('о')) return 'adverb';
  
  // Default to noun for most Russian words
  return 'noun';
}

// Parse Russian words file
function parseRussianWords(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const words = [];
  const seen = new Set();

  for (let i = 0; i < lines.length; i++) {
    const word = lines[i].trim();
    if (!word || word.length < 2 || seen.has(word)) continue;
    
    // Skip explanatory text and non-word content
    if (
      word.includes('Below is the continuation') ||
      word.includes('Key Points') ||
      word.includes('Russian National Corpus') ||
      word.includes('Selection Process') ||
      word.includes('Sketch Engine') ||
      word.includes('Supporting Resources') ||
      word.includes('The evidence from') ||
      word.includes('The list continues') ||
      word.includes('The words are drawn') ||
      word.includes('Wiktionary Frequency') ||
      word.includes('http') ||
      word.includes('https') ||
      word.includes('CEFR') ||
      word.includes('Corpus') ||
      word.includes('Appendix') ||
      word.length > 50 || // Skip very long lines (likely explanatory text)
      /^[A-Z]/.test(word) && word.length > 20 // Skip lines starting with English capital letters
    ) {
      continue;
    }
    
    // Skip single letters that are not meaningful
    if (word.length === 1 && !['я', 'а', 'о', 'у', 'и', 'к', 'с', 'в', 'н'].includes(word)) continue;
    
    seen.add(word);
    
    const translation = translations[word] || `[${word}]`;
    const partOfSpeech = getPartOfSpeech(word);
    const exampleSentence = generateExample(word, translation);
    
    words.push({
      id: words.length + 1,
      word,
      partOfSpeech,
      translation,
      exampleSentence
    });
  }

  return words;
}

// Generate TypeScript file content
function generateTypeScriptFile(words) {
  const header = `// Auto-generated file - do not edit manually
// Generated on: ${new Date().toISOString()}
// Source: ${CONFIG.inputFile}

import type { VocabularyWord, VocabularyData } from '@/shared/types/vocabulary';

export const RUS_VOCABULARY_DATA: VocabularyData = `;
  
  const data = {
    words: words.sort((a, b) => a.word.localeCompare(b.word)),
    totalWords: words.length,
    language: 'ru',
    level: 'A1-A2'
  };

  const dataJson = JSON.stringify(data, null, 2);
  
  const footer = `;

export const VOCABULARY_WORDS = RUS_VOCABULARY_DATA.words;
export const VOCABULARY_TOTAL = RUS_VOCABULARY_DATA.totalWords;
export const VOCABULARY_LANGUAGE = RUS_VOCABULARY_DATA.language;
export const VOCABULARY_LEVEL = RUS_VOCABULARY_DATA.level;

// Helper functions
export const getWordsByPartOfSpeech = (partOfSpeech: string) => {
  return RUS_VOCABULARY_DATA.words.filter(word =>
    word.partOfSpeech.toLowerCase().includes(partOfSpeech.toLowerCase())
  );
};

export const searchWords = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return RUS_VOCABULARY_DATA.words.filter(
    word =>
      word.word.toLowerCase().includes(lowerQuery) ||
      word.translation.toLowerCase().includes(lowerQuery) ||
      word.partOfSpeech.toLowerCase().includes(lowerQuery)
  );
};

export const getWordsByLetter = (letter: string) => {
  return RUS_VOCABULARY_DATA.words.filter(word => word.word.toLowerCase().startsWith(letter.toLowerCase()));
};
`;
  
  return header + dataJson + footer;
}

// Main function
function createRussianVocabulary() {
  console.log('🚀 Starting Russian vocabulary data creation...');
  
  try {
    // Check if input file exists
    if (!fs.existsSync(CONFIG.inputFile)) {
      console.error(`❌ Input file not found: ${CONFIG.inputFile}`);
      process.exit(1);
    }
    
    // Parse words from file
    const words = parseRussianWords(CONFIG.inputFile);
    console.log(`📁 Found ${words.length} unique words`);
    
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
    console.log('\n📋 First 10 words:');
    words.slice(0, 10).forEach((word, index) => {
      console.log(`${index + 1}. ${word.word} (${word.partOfSpeech}) - ${word.translation}`);
    });
    
  } catch (error) {
    console.error(`❌ Error creating vocabulary data:`, error.message);
    process.exit(1);
  }
}

// Run the script
createRussianVocabulary();
