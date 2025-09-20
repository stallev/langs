export const NAVIGATION = {
  HOME: {
    LABEL: 'Home',
    PATH: '/',
  },
  LESSONS: {
    LABEL: 'Lessons',
    PATH: '/lessons',
    SUBMENU: {
      ENGLISH_B1B2: {
        LABEL: 'English (B1-B2)',
        PATH: '/lessons/eng/b1b2',
      },
      RUSSIAN: {
        LABEL: 'Russian (Coming Soon)',
        PATH: '/lessons/rus',
        DISABLED: true,
      },
    },
  },
  VOCABULARY: {
    LABEL: 'Vocabulary',
    PATH: '/vocabulary',
    SUBMENU: {
      ENGLISH: {
        LABEL: 'English Vocabulary',
        PATH: '/vocabulary/eng',
      },
      RUSSIAN: {
        LABEL: 'Russian Vocabulary',
        PATH: '/vocabulary/rus',
        DISABLED: true,
      },
    },
  },
  PRACTICE: {
    LABEL: 'Practice',
    PATH: '/practice',
  },
  PROGRESS: {
    LABEL: 'Progress',
    PATH: '/progress',
  },
  ABOUT: {
    LABEL: 'About',
    PATH: '/about',
  },
  SETTINGS: {
    LABEL: 'Settings',
    PATH: '/settings',
  },
};

export const FOOTER = {
  COPYRIGHT: '© 2025 Language Learning Platform. All rights reserved.',
  LINKS: {
    PRIVACY: {
      LABEL: 'Privacy Policy',
      PATH: '/privacy',
    },
    TERMS: {
      LABEL: 'Terms of Service',
      PATH: '/terms',
    },
    CONTACT: {
      LABEL: 'Contact Us',
      PATH: '/contact',
    },
  },
};

export const ACCESSIBILITY = {
  SKIP_LINK: 'Skip to main content',
  THEME_SWITCHER: {
    LIGHT: 'Switch to light theme',
    DARK: 'Switch to dark theme',
  },
  MOBILE_MENU: {
    OPEN: 'Open menu',
    CLOSE: 'Close menu',
  },
  SUBMENU: {
    EXPAND: 'Expand submenu',
    COLLAPSE: 'Collapse submenu',
  },
  BREADCRUMBS: {
    ARIA_LABEL: 'Breadcrumb navigation',
    HOME: 'Home',
    SEPARATOR: 'Separator',
  },
};
