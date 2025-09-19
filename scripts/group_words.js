const fs = require('fs');
const path = require('path');

// Определение тематических групп с ключевыми словами
const TOPIC_KEYWORDS = {
    "TECHNOLOGY & COMPUTERS": [
        "computer", "software", "internet", "website", "email", "password", "data", "file",
        "download", "upload", "connect", "access", "network", "digital", "online", "offline",
        "virtual", "system", "app", "application", "device", "screen", "keyboard", "mouse",
        "program", "code", "algorithm", "database", "server", "cloud", "security", "privacy"
    ],
    
    "FAMILY & RELATIONSHIPS": [
        "family", "mother", "father", "parent", "child", "son", "daughter", "brother", "sister",
        "husband", "wife", "baby", "grandparent", "uncle", "aunt", "cousin", "relative",
        "friend", "neighbor", "relationship", "marriage", "wedding", "divorce", "love", "care"
    ],
    
    "WORK & CAREER": [
        "work", "job", "career", "business", "company", "office", "meeting", "project", "task",
        "deadline", "salary", "employee", "employer", "manager", "colleague", "interview",
        "resume", "experience", "skill", "profession", "industry", "corporate", "promotion"
    ],
    
    "EDUCATION & LEARNING": [
        "school", "university", "college", "student", "teacher", "professor", "class", "lesson",
        "course", "subject", "study", "learn", "teach", "education", "knowledge", "skill",
        "exam", "grade", "homework", "assignment", "research", "academic", "scholar", "degree"
    ],
    
    "FOOD & DRINK": [
        "food", "meal", "breakfast", "lunch", "dinner", "snack", "drink", "water", "coffee",
        "tea", "milk", "juice", "bread", "meat", "fish", "chicken", "fruit", "vegetable",
        "restaurant", "kitchen", "cook", "eat", "taste", "hungry", "thirsty", "recipe"
    ],
    
    "HEALTH & MEDICINE": [
        "health", "doctor", "hospital", "medicine", "patient", "nurse", "treatment", "disease",
        "illness", "pain", "injury", "surgery", "appointment", "prescription", "healthy",
        "sick", "medical", "emergency", "therapy", "cure", "recovery", "fitness", "exercise"
    ],
    
    "TRAVEL & TRANSPORTATION": [
        "travel", "trip", "vacation", "holiday", "journey", "flight", "airport", "hotel",
        "ticket", "passport", "luggage", "car", "bus", "train", "plane", "ship", "taxi",
        "drive", "ride", "destination", "tourist", "guide", "map", "route", "adventure"
    ],
    
    "HOME & HOUSEHOLD": [
        "home", "house", "apartment", "room", "bedroom", "bathroom", "kitchen", "living room",
        "door", "window", "floor", "wall", "ceiling", "furniture", "table", "chair", "bed",
        "sofa", "lamp", "television", "garden", "yard", "garage", "basement", "attic"
    ],
    
    "MONEY & FINANCE": [
        "money", "cash", "dollar", "euro", "price", "cost", "pay", "buy", "sell", "spend",
        "save", "bank", "account", "credit", "debt", "budget", "expensive", "cheap", "rich",
        "poor", "wealth", "income", "expense", "investment", "profit", "loss", "economy"
    ],
    
    "TIME & CALENDAR": [
        "time", "hour", "minute", "second", "day", "week", "month", "year", "today",
        "yesterday", "tomorrow", "morning", "afternoon", "evening", "night", "calendar",
        "schedule", "appointment", "date", "season", "spring", "summer", "autumn", "winter"
    ],
    
    "EMOTIONS & FEELINGS": [
        "happy", "sad", "angry", "excited", "nervous", "worried", "afraid", "surprised",
        "disappointed", "proud", "ashamed", "embarrassed", "jealous", "lonely", "confident",
        "anxious", "calm", "stressed", "relaxed", "frustrated", "grateful", "hopeful", "love"
    ],
    
    "BODY & PHYSICAL": [
        "body", "head", "face", "eye", "ear", "nose", "mouth", "tooth", "hand", "finger",
        "arm", "leg", "foot", "back", "chest", "heart", "brain", "blood", "bone", "muscle",
        "skin", "hair", "beard", "mustache", "smile", "laugh", "cry", "walk", "run", "jump"
    ],
    
    "CLOTHING & FASHION": [
        "clothes", "shirt", "pants", "dress", "skirt", "jacket", "coat", "hat", "shoes",
        "boots", "socks", "underwear", "suit", "tie", "belt", "gloves", "scarf", "jewelry",
        "watch", "ring", "necklace", "earrings", "fashion", "style", "design", "color"
    ],
    
    "WEATHER & NATURE": [
        "weather", "sun", "moon", "star", "cloud", "rain", "snow", "wind", "storm", "thunder",
        "lightning", "hot", "cold", "warm", "cool", "temperature", "season", "nature", "tree",
        "flower", "grass", "mountain", "river", "ocean", "lake", "forest", "desert", "sky"
    ],
    
    "SPORTS & FITNESS": [
        "sport", "game", "play", "team", "player", "coach", "ball", "football", "soccer",
        "basketball", "tennis", "golf", "swimming", "running", "cycling", "gym", "exercise",
        "fitness", "training", "competition", "match", "tournament", "championship", "medal",
        "winner", "loser", "score", "goal", "point", "athlete", "stadium", "field", "court"
    ],
    
    "ENTERTAINMENT & MEDIA": [
        "movie", "film", "cinema", "theater", "play", "show", "concert", "music", "song",
        "dance", "book", "story", "novel", "magazine", "newspaper", "television", "radio",
        "internet", "video", "photo", "picture", "camera", "actor", "actress", "director",
        "artist", "writer", "singer", "musician", "band", "audience", "fan", "celebrity"
    ],
    
    "SHOPPING & COMMERCE": [
        "shop", "store", "market", "mall", "buy", "sell", "purchase", "order", "customer",
        "client", "service", "product", "item", "brand", "quality", "quantity", "size",
        "color", "style", "fashion", "price", "cost", "expensive", "cheap", "sale", "discount"
    ],
    
    "COMMUNICATION": [
        "talk", "speak", "say", "tell", "ask", "answer", "question", "conversation", "discussion",
        "meeting", "phone", "call", "message", "email", "letter", "news", "information",
        "story", "report", "interview", "speech", "presentation", "language", "word", "sentence"
    ],
    
    "GOVERNMENT & POLITICS": [
        "government", "president", "minister", "mayor", "election", "vote", "voter", "candidate",
        "party", "policy", "law", "legal", "court", "judge", "police", "officer", "crime",
        "justice", "freedom", "right", "duty", "citizen", "country", "nation", "state", "city"
    ],
    
    "RELIGION & SPIRITUALITY": [
        "religion", "church", "temple", "mosque", "synagogue", "prayer", "faith", "belief",
        "god", "christian", "christianity", "bible", "jesus", "christ", "holy", "sacred",
        "spiritual", "soul", "heaven", "hell", "angel", "devil", "sin", "virtue", "blessing"
    ]
};

function loadWordsFromCSV(csvFile) {
    const content = fs.readFileSync(csvFile, 'utf-8');
    const lines = content.split('\n');
    const words = [];
    
    // Пропускаем заголовок
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            const parts = line.split(',');
            if (parts.length >= 3) {
                words.push({
                    word: parts[0].replace(/"/g, '').trim(),
                    pos: parts[1].replace(/"/g, '').trim(),
                    translation: parts[2].replace(/"/g, '').trim(),
                    example: parts[3] ? parts[3].replace(/"/g, '').trim() : ''
                });
            }
        }
    }
    
    return words;
}

function classifyWord(wordData, topicKeywords) {
    const word = wordData.word.toLowerCase();
    
    // Прямое совпадение
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
        if (keywords.some(keyword => keyword.toLowerCase() === word)) {
            return topic;
        }
    }
    
    // Частичное совпадение
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
        if (keywords.some(keyword => 
            keyword.toLowerCase().includes(word) || word.includes(keyword.toLowerCase())
        )) {
            return topic;
        }
    }
    
    return "GENERAL & COMMON";
}

function groupWordsByTopics(words, topicKeywords) {
    const grouped = {};
    
    for (const wordData of words) {
        const topic = classifyWord(wordData, topicKeywords);
        if (!grouped[topic]) {
            grouped[topic] = [];
        }
        grouped[topic].push(wordData);
    }
    
    return grouped;
}

function createGroupingFile(groupedWords, outputFile) {
    let content = "# Группировка 3000 наиболее распространенных английских слов по темам\n\n";
    content += "## Автоматически сгенерированная группировка\n\n";
    content += "### Статистика:\n";
    content += `- **Всего групп:** ${Object.keys(groupedWords).length}\n`;
    content += `- **Общее количество слов:** ${Object.values(groupedWords).reduce((sum, words) => sum + words.length, 0)}\n\n`;
    
    // Сортируем группы по количеству слов
    const sortedGroups = Object.entries(groupedWords)
        .sort(([,a], [,b]) => b.length - a.length);
    
    for (const [topic, words] of sortedGroups) {
        content += `### ${topic}\n`;
        content += `**Количество слов:** ${words.length}\n\n`;
        
        content += "**Слова:**\n";
        for (let i = 0; i < Math.min(20, words.length); i++) {
            const wordData = words[i];
            content += `- ${wordData.word} (${wordData.translation}) - ${wordData.pos}\n`;
        }
        
        if (words.length > 20) {
            content += `- ... и еще ${words.length - 20} слов\n`;
        }
        
        content += "\n---\n\n";
    }
    
    fs.writeFileSync(outputFile, content, 'utf-8');
}

function main() {
    const csvFile = "words/3000 the most common words.csv";
    const outputFile = "words/grouped_by_topics.md";
    
    console.log("Загружаем слова из CSV файла...");
    const words = loadWordsFromCSV(csvFile);
    console.log(`Загружено ${words.length} слов`);
    
    console.log("Группируем слова по темам...");
    const groupedWords = groupWordsByTopics(words, TOPIC_KEYWORDS);
    
    console.log("Создаем файл группировки...");
    createGroupingFile(groupedWords, outputFile);
    
    console.log(`Группировка сохранена в файл: ${outputFile}`);
    
    // Выводим статистику
    console.log("\nСтатистика группировки:");
    const sortedGroups = Object.entries(groupedWords)
        .sort(([,a], [,b]) => b.length - a.length);
    
    for (const [topic, wordsList] of sortedGroups) {
        console.log(`- ${topic}: ${wordsList.length} слов`);
    }
}

main();
