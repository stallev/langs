// SEO constants for the language learning platform
export const SEO_CONSTANTS = {
  // Site metadata
  SITE_NAME: 'LangLearn',
  SITE_DESCRIPTION:
    'Learn languages through thematic texts with the most common words and practical usage examples',
  SITE_URL: 'https://langlearn.com',
  SITE_IMAGE: '/og-image.png',

  // Default metadata
  DEFAULT_TITLE: 'LangLearn - Language Learning Platform',
  DEFAULT_DESCRIPTION:
    'Learn languages through carefully crafted thematic texts with the most common words and practical usage examples',
  DEFAULT_KEYWORDS: 'language learning, english, russian, vocabulary, grammar, lessons, education',

  // Page-specific titles
  HOME_TITLE: 'LangLearn - Master Languages Through Thematic Texts',
  LESSONS_TITLE: 'Language Lessons - LangLearn',
  VOCABULARY_TITLE: 'Vocabulary Dictionary - LangLearn',
  ENGLISH_B1B2_TITLE: 'English B1-B2 Lessons - LangLearn',
  RUSSIAN_A1A2_TITLE: 'Russian A1-A2 Lessons - LangLearn',
  ABOUT_TITLE: 'About LangLearn - Language Learning Platform',
  CONTACT_TITLE: 'Contact Us - LangLearn',
  PRIVACY_TITLE: 'Privacy Policy - LangLearn',
  TERMS_TITLE: 'Terms of Service - LangLearn',

  // Page-specific descriptions
  HOME_DESCRIPTION:
    'Master English and Russian through 207+ carefully crafted thematic texts. Learn vocabulary, grammar, and practical usage with our innovative language learning platform.',
  LESSONS_DESCRIPTION:
    'Explore our comprehensive collection of language lessons designed for different proficiency levels. Learn through thematic texts with practical examples.',
  VOCABULARY_DESCRIPTION:
    'Explore comprehensive vocabulary collections with translations, examples, and categorized learning paths. Master essential words for effective communication.',
  ENGLISH_B1B2_DESCRIPTION:
    'Learn English at the intermediate level through 112 carefully crafted thematic texts with the most common words and practical usage examples.',
  RUSSIAN_A1A2_DESCRIPTION:
    'Learn Russian at the beginner level through 95 carefully crafted thematic texts with the most common words and practical usage examples.',
  ABOUT_DESCRIPTION:
    'Learn about LangLearn, our mission to make language learning accessible and effective through thematic texts and practical examples.',
  CONTACT_DESCRIPTION:
    "Get in touch with the LangLearn team. We're here to help you on your language learning journey.",
  PRIVACY_DESCRIPTION:
    'Learn about how LangLearn protects your privacy and handles your personal information.',
  TERMS_DESCRIPTION: 'Read the terms of service for using LangLearn language learning platform.',

  // Keywords by page
  HOME_KEYWORDS:
    'language learning, english, russian, vocabulary, grammar, lessons, education, thematic texts, common words',
  LESSONS_KEYWORDS:
    'language lessons, english lessons, russian lessons, vocabulary, grammar, thematic texts, language learning',
  VOCABULARY_KEYWORDS:
    'vocabulary dictionary, english vocabulary, russian vocabulary, word lists, translations, examples, language learning',
  ENGLISH_B1B2_KEYWORDS:
    'english b1, english b2, intermediate english, english vocabulary, english grammar, english lessons',
  RUSSIAN_A1A2_KEYWORDS:
    'russian a1, russian a2, beginner russian, russian vocabulary, russian grammar, russian lessons',
  ABOUT_KEYWORDS: 'about langlearn, language learning platform, education, language teaching',
  CONTACT_KEYWORDS: 'contact langlearn, support, help, language learning assistance',
  PRIVACY_KEYWORDS: 'privacy policy, data protection, personal information, langlearn privacy',
  TERMS_KEYWORDS: 'terms of service, user agreement, langlearn terms, legal',

  // Robots meta
  ROBOTS_NOINDEX: 'noindex, nofollow',
  ROBOTS_INDEX: 'index, follow',

  // Open Graph
  OG_TYPE: 'website',
  OG_LOCALE: 'en_US',

  // Twitter Card
  TWITTER_CARD: 'summary_large_image',
  TWITTER_SITE: '@langlearn',
  TWITTER_CREATOR: '@langlearn',
} as const;

// SEO metadata types
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string;
  robots: string;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: string;
    site: string;
    creator: string;
    title: string;
    description: string;
    images: Array<{
      url: string;
      alt: string;
    }>;
  };
  alternates?: {
    canonical: string;
  };
}

// Helper function to generate SEO metadata
export const generateSEOMetadata = (
  title: string,
  description: string,
  keywords: string,
  path: string = '',
  robots: string = SEO_CONSTANTS.ROBOTS_NOINDEX
): SEOMetadata => {
  const fullTitle = title.includes(SEO_CONSTANTS.SITE_NAME)
    ? title
    : `${title} | ${SEO_CONSTANTS.SITE_NAME}`;
  const fullUrl = `${SEO_CONSTANTS.SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    keywords,
    robots,
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: SEO_CONSTANTS.SITE_NAME,
      images: [
        {
          url: SEO_CONSTANTS.SITE_IMAGE,
          width: 1200,
          height: 630,
          alt: `${SEO_CONSTANTS.SITE_NAME} - ${description}`,
        },
      ],
      locale: SEO_CONSTANTS.OG_LOCALE,
      type: SEO_CONSTANTS.OG_TYPE,
    },
    twitter: {
      card: SEO_CONSTANTS.TWITTER_CARD,
      site: SEO_CONSTANTS.TWITTER_SITE,
      creator: SEO_CONSTANTS.TWITTER_CREATOR,
      title: fullTitle,
      description,
      images: [
        {
          url: SEO_CONSTANTS.SITE_IMAGE,
          alt: `${SEO_CONSTANTS.SITE_NAME} - ${description}`,
        },
      ],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
};
