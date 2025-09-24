# Next.js App Router Sitemap Best Practices

## Обзор

Данный документ описывает лучшие практики создания и управления sitemap в приложениях Next.js с использованием App Router. Sitemap помогает поисковым системам индексировать ваш сайт и улучшает SEO.

## Содержание

1. [Основные концепции](#основные-концепции)
2. [Статический sitemap](#статический-sitemap)
3. [Динамический sitemap](#динамический-sitemap)
4. [Sitemap Index](#sitemap-index)
5. [Лучшие практики](#лучшие-практики)
6. [Примеры реализации](#примеры-реализации)
7. [Отладка и тестирование](#отладка-и-тестирование)

## Основные концепции

### Что такое Sitemap?

Sitemap - это XML-файл, который содержит информацию о страницах вашего сайта и помогает поисковым системам:
- Находить и индексировать все страницы
- Понимать структуру сайта
- Получать метаданные о страницах (дата изменения, приоритет, частота обновления)

### Типы Sitemap в Next.js

1. **Статический sitemap** - для фиксированных страниц
2. **Динамический sitemap** - для страниц, генерируемых из данных
3. **Sitemap Index** - для объединения нескольких sitemap файлов

## Статический Sitemap

### Создание базового sitemap

Создайте файл `src/app/sitemap.ts` для статических страниц:

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yourdomain.com';
  const currentDate = new Date();

  return [
    // Главная страница
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    // Статические страницы
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
```

### Параметры sitemap

```typescript
interface SitemapEntry {
  url: string;                    // Обязательно: URL страницы
  lastModified?: string | Date;   // Дата последнего изменения
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;              // Приоритет от 0.0 до 1.0
}
```

## Динамический Sitemap

### Sitemap для динамических страниц

Создайте sitemap в соответствующем каталоге для динамических страниц:

```typescript
// src/app/blog/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';
  const posts = await getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...postEntries];
}
```

### Sitemap с внешними данными

```typescript
// src/app/products/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';
  
  try {
    // Получение данных из API
    const response = await fetch('https://api.example.com/products', {
      next: { revalidate: 3600 } // Кэширование на 1 час
    });
    const products = await response.json();

    const productEntries = products.map((product: any) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

    return [...productEntries];
  } catch (error) {
    console.error('Error generating products sitemap:', error);
    return [];
  }
}
```

## Sitemap Index

### Создание sitemap index

Для больших сайтов создайте sitemap index, который объединяет несколько sitemap файлов:

```typescript
// src/app/sitemapindex.xml/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://yourdomain.com';
  const currentDate = new Date().toISOString();

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/blog/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/products/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/categories/sitemap.xml</loc>
    <lastmod>${currentDate}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
```

### Обновление robots.txt

```txt
# robots.txt
User-agent: *
Allow: /

# Sitemap locations
Sitemap: https://yourdomain.com/sitemap.xml
Sitemap: https://yourdomain.com/sitemapindex.xml

# Block admin areas
Disallow: /api/
Disallow: /admin/
Disallow: /_next/
```

## Лучшие практики

### 1. Организация файлов

```
src/app/
├── sitemap.ts                    # Основной sitemap
├── sitemapindex.xml/
│   └── route.ts                  # Sitemap index
├── blog/
│   └── sitemap.ts               # Sitemap для блога
├── products/
│   └── sitemap.ts               # Sitemap для продуктов
└── categories/
    └── sitemap.ts               # Sitemap для категорий
```

### 2. Использование констант

```typescript
// src/shared/constants/seo.ts
export const SEO_CONSTANTS = {
  SITE_URL: 'https://yourdomain.com',
  SITEMAP_PRIORITIES: {
    HOME: 1.0,
    MAIN_PAGES: 0.8,
    CONTENT_PAGES: 0.7,
    UTILITY_PAGES: 0.3,
  },
  CHANGE_FREQUENCIES: {
    HOME: 'weekly' as const,
    BLOG: 'weekly' as const,
    PRODUCTS: 'monthly' as const,
    STATIC: 'yearly' as const,
  },
} as const;
```

### 3. Обработка ошибок

```typescript
// src/app/blog/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const posts = await getAllPosts();
    
    return posts.map((post) => ({
      url: `${SEO_CONSTANTS.SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: SEO_CONSTANTS.CHANGE_FREQUENCIES.BLOG,
      priority: SEO_CONSTANTS.SITEMAP_PRIORITIES.CONTENT_PAGES,
    }));
  } catch (error) {
    console.error('Error generating blog sitemap:', error);
    // Возвращаем пустой массив вместо ошибки
    return [];
  }
}
```

### 4. Кэширование и производительность

```typescript
// src/app/products/sitemap.ts
import type { MetadataRoute } from 'next';

export const revalidate = 3600; // Кэширование на 1 час

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await fetch('https://api.example.com/products', {
    next: { revalidate: 3600 }
  }).then(res => res.json());

  // ... остальной код
}
```

### 5. Фильтрация контента

```typescript
// src/app/blog/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  // Фильтруем только опубликованные посты
  const publishedPosts = posts.filter(post => 
    post.status === 'published' && 
    post.publishedAt <= new Date()
  );

  return publishedPosts.map((post) => ({
    url: `${SEO_CONSTANTS.SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
}
```

## Примеры реализации

### Пример 1: E-commerce сайт

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.SITE_URL;
  const currentDate = new Date();

  return [
    // Основные страницы
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Утилитарные страницы
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
```

```typescript
// src/app/products/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/products';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  
  return products.map((product) => ({
    url: `${SEO_CONSTANTS.SITE_URL}/products/${product.slug}`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
}
```

### Пример 2: Блог с категориями

```typescript
// src/app/blog/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  
  const postEntries = posts.map((post) => ({
    url: `${SEO_CONSTANTS.SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...postEntries];
}
```

```typescript
// src/app/categories/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllCategories } from '@/lib/categories';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const categories = await getAllCategories();
  
  return categories.map((category) => ({
    url: `${SEO_CONSTANTS.SITE_URL}/categories/${category.slug}`,
    lastModified: new Date(category.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
}
```

### Пример 3: Многоязычный сайт

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';
import { SEO_CONSTANTS } from '@/shared/constants/seo';

const LANGUAGES = ['en', 'ru', 'es'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SEO_CONSTANTS.SITE_URL;
  const currentDate = new Date();
  
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Генерируем sitemap для каждого языка
  LANGUAGES.forEach((lang) => {
    const langPrefix = lang === 'en' ? '' : `/${lang}`;
    
    sitemapEntries.push(
      {
        url: `${baseUrl}${langPrefix}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}${langPrefix}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `${baseUrl}${langPrefix}/contact`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      }
    );
  });

  return sitemapEntries;
}
```

## Отладка и тестирование

### 1. Проверка sitemap в браузере

```bash
# Локальная разработка
http://localhost:3000/sitemap.xml
http://localhost:3000/sitemapindex.xml
http://localhost:3000/blog/sitemap.xml
```

### 2. Валидация XML

```bash
# Проверка синтаксиса XML
curl -s http://localhost:3000/sitemap.xml | xmllint --format -
```

### 3. Тестирование в Google Search Console

1. Перейдите в Google Search Console
2. Выберите свой сайт
3. В меню слева выберите "Sitemaps"
4. Добавьте URL вашего sitemap
5. Проверьте статус индексации

### 4. Отладка ошибок

```typescript
// src/app/debug-sitemap/route.ts
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET() {
  try {
    const posts = await getAllPosts();
    
    return NextResponse.json({
      success: true,
      count: posts.length,
      sample: posts.slice(0, 3).map(post => ({
        slug: post.slug,
        updatedAt: post.updatedAt,
        url: `https://yourdomain.com/blog/${post.slug}`
      }))
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
```

### 5. Мониторинг производительности

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const startTime = Date.now();
  
  try {
    // Ваш код генерации sitemap
    const entries = await generateSitemapEntries();
    
    const endTime = Date.now();
    console.log(`Sitemap generated in ${endTime - startTime}ms`);
    
    return entries;
  } catch (error) {
    console.error('Sitemap generation failed:', error);
    return [];
  }
}
```

## Рекомендации по SEO

### 1. Приоритеты страниц

```typescript
const PRIORITIES = {
  HOME: 1.0,           // Главная страница
  MAIN_SECTIONS: 0.9,  // Основные разделы
  CONTENT_PAGES: 0.8,  // Страницы контента
  CATEGORIES: 0.7,     // Категории
  UTILITY_PAGES: 0.5,  // Утилитарные страницы
  LEGAL_PAGES: 0.3,    // Правовые страницы
} as const;
```

### 2. Частота обновления

```typescript
const CHANGE_FREQUENCIES = {
  NEWS: 'hourly',      // Новости
  BLOG: 'daily',       // Блог
  PRODUCTS: 'weekly',  // Товары
  STATIC: 'monthly',   // Статические страницы
  LEGAL: 'yearly',     // Правовые страницы
} as const;
```

### 3. Ограничения sitemap

- **Максимум 50,000 URL** в одном sitemap файле
- **Максимум 50 MB** размер файла
- **Максимум 50 sitemap** в sitemap index

### 4. Лучшие практики

1. **Регулярно обновляйте** lastModified
2. **Используйте правильные приоритеты** (относительные, не абсолютные)
3. **Фильтруйте контент** (только публичные страницы)
4. **Обрабатывайте ошибки** gracefully
5. **Кэшируйте данные** для производительности
6. **Тестируйте sitemap** перед деплоем

## Заключение

Правильная реализация sitemap в Next.js App Router критически важна для SEO. Следуйте этим лучшим практикам:

1. Используйте правильную структуру файлов
2. Реализуйте обработку ошибок
3. Оптимизируйте производительность
4. Тестируйте и валидируйте sitemap
5. Мониторьте индексацию в поисковых системах

Эти рекомендации помогут создать эффективную систему sitemap для вашего Next.js приложения.

---

**Документ создан:** Январь 2025  
**Версия:** 1.0  
**Следующий пересмотр:** Март 2025
