#!/usr/bin/env python3
"""
Скрипт для автоматической группировки 3000 наиболее распространенных английских слов по темам.
Создает структурированный файл с группировкой для последующего создания MD файлов.
"""

import csv
import json
from collections import defaultdict
from typing import Dict, List, Tuple

# Определение тематических групп с ключевыми словами для автоматической классификации
TOPIC_KEYWORDS = {
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
}

def load_words_from_csv(csv_file: str) -> List[Dict]:
    """Загружает слова из CSV файла"""
    words = []
    with open(csv_file, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            words.append({
                'word': row['Words'].strip(),
                'pos': row['P.O.S'].strip(),
                'translation': row['Russian Mearning'].strip(),
                'example': row.get('', '').strip()
            })
    return words

def classify_word(word_data: Dict, topic_keywords: Dict[str, List[str]]) -> str:
    """Классифицирует слово по темам на основе ключевых слов"""
    word = word_data['word'].lower()
    
    # Прямое совпадение
    for topic, keywords in topic_keywords.items():
        if word in [kw.lower() for kw in keywords]:
            return topic
    
    # Частичное совпадение
    for topic, keywords in topic_keywords.items():
        for keyword in keywords:
            if keyword.lower() in word or word in keyword.lower():
                return topic
    
    return "GENERAL & COMMON"

def group_words_by_topics(words: List[Dict], topic_keywords: Dict[str, List[str]]) -> Dict[str, List[Dict]]:
    """Группирует слова по темам"""
    grouped = defaultdict(list)
    
    for word_data in words:
        topic = classify_word(word_data, topic_keywords)
        grouped[topic].append(word_data)
    
    return dict(grouped)

def create_grouping_file(grouped_words: Dict[str, List[Dict]], output_file: str):
    """Создает файл с группировкой слов"""
    
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("# Группировка 3000 наиболее распространенных английских слов по темам\n\n")
        f.write("## Автоматически сгенерированная группировка\n\n")
        f.write("### Статистика:\n")
        f.write(f"- **Всего групп:** {len(grouped_words)}\n")
        f.write(f"- **Общее количество слов:** {sum(len(words) for words in grouped_words.values())}\n\n")
        
        for topic, words in grouped_words.items():
            f.write(f"### {topic}\n")
            f.write(f"**Количество слов:** {len(words)}\n\n")
            
            f.write("**Слова:**\n")
            for word_data in words[:20]:  # Показываем первые 20 слов
                f.write(f"- {word_data['word']} ({word_data['translation']}) - {word_data['pos']}\n")
            
            if len(words) > 20:
                f.write(f"- ... и еще {len(words) - 20} слов\n")
            
            f.write("\n---\n\n")

def main():
    """Основная функция"""
    csv_file = "words/3000 the most common words.csv"
    output_file = "words/grouped_by_topics.md"
    
    print("Загружаем слова из CSV файла...")
    words = load_words_from_csv(csv_file)
    print(f"Загружено {len(words)} слов")
    
    print("Группируем слова по темам...")
    grouped_words = group_words_by_topics(words, TOPIC_KEYWORDS)
    
    print("Создаем файл группировки...")
    create_grouping_file(grouped_words, output_file)
    
    print(f"Группировка сохранена в файл: {output_file}")
    
    # Выводим статистику
    print("\nСтатистика группировки:")
    for topic, words_list in sorted(grouped_words.items(), key=lambda x: len(x[1]), reverse=True):
        print(f"- {topic}: {len(words_list)} слов")

if __name__ == "__main__":
    main()
