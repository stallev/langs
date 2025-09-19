# Feature-Sliced Design (FSD) Architecture Documentation

## Overview

This document outlines the Feature-Sliced Design (FSD) architecture implementation for the Language Learning Platform. FSD is a methodology for organizing frontend code that promotes scalability, maintainability, and clear separation of concerns.

## Architecture Principles

### Core Concepts
- **Layers:** Hierarchical organization of code by responsibility
- **Slices:** Self-contained features that can be developed and maintained independently
- **Segments:** Logical grouping within slices (ui, model, lib, api)
- **Public API:** Controlled interface for each slice

### Benefits
- **Scalability:** Easy to add new features without affecting existing code
- **Maintainability:** Clear structure makes code easier to understand and modify
- **Reusability:** Shared components and utilities can be used across features
- **Team Collaboration:** Different teams can work on different features independently

## Project Structure

```
src/
├── app/                    # App layer - application initialization
│   ├── providers/         # Global providers (theme, auth, etc.)
│   ├── styles/           # Global styles

```

## Layer Descriptions

### App Layer (`src/app/`)
**Purpose:** Application initialization and global configuration
**Responsibilities:**
- Global providers setup (theme, progress tracking)
- Root layout and routing
- Global styles and themes
- Environment configuration
- Language switching (EN/RU)

**Rules:**
- Can import from any layer
- Should not contain business logic
- Focus on application setup and configuration

### Pages Layer (`src/pages/`)
**Purpose:** Page-level components that compose widgets and features
**Responsibilities:**
- Page composition
- Route handling
- Layout management
- Data fetching coordination

**Rules:**
- Can import from widgets, features, entities, and shared
- Should not contain business logic
- Focus on composition and routing

### Widgets Layer (`src/widgets/`)
**Purpose:** Complex UI blocks that combine multiple features
**Responsibilities:**
- Complex UI composition
- Cross-feature integration
- Reusable UI blocks

**Rules:**
- Can import from features, entities, and shared
- Should not contain business logic
- Focus on UI composition

### Features Layer (`src/features/`)
**Purpose:** User-facing functionality and business logic
**Responsibilities:**
- User interactions
- Business logic implementation
- Feature-specific state management
- API integration
- Progress tracking
- Text reading and studying

**Rules:**
- Can import from entities and shared
- Should be self-contained
- Can export public API for other layers

### Entities Layer (`src/entities/`)
**Purpose:** Business entities and their related logic
**Responsibilities:**
- Entity definitions (Text, Word, Category, Progress)
- Entity-specific business logic
- Entity-related UI components
- Entity API integration
- Word and text data management

**Rules:**
- Can import from shared only
- Should be independent and reusable
- Can export public API for other layers

### Shared Layer (`src/shared/`)
**Purpose:** Common utilities, components, and configurations
**Responsibilities:**
- Reusable UI components (ShadcnUI)
- Utility functions
- Type definitions
- Configuration files
- Progress tracking utilities
- Localization utilities

**Rules:**
- Cannot import from other layers
- Should be framework-agnostic
- Can be used by any layer

## Segment Structure

Each slice (feature, entity, widget) follows a consistent segment structure:

```
feature-name/
├── ui/                   # UI components
│   ├── index.ts         # Public API exports
│   ├── ComponentName.tsx
│   └── ComponentName.module.css
├── model/               # Business logic
│   ├── index.ts         # Public API exports
│   ├── store.ts         # State management
│   ├── types.ts         # Type definitions
│   └── selectors.ts     # State selectors
├── lib/                 # Utilities and helpers
│   ├── index.ts         # Public API exports
│   ├── utils.ts         # Utility functions
│   ├── hooks/           # Custom hooks
│   └── constants.ts     # Feature constants
└── server-actions/      # Server actions (Next.js)
    ├── index.ts         # Public API exports
    ├── actionName.ts    # Server action files
    └── types.ts         # Action types
```

## Import Rules

### Strict Import Rules
1. **App layer** can import from any layer
2. **Pages layer** can import from widgets, features, entities, and shared
3. **Widgets layer** can import from features, entities, and shared
4. **Features layer** can import from entities and shared
5. **Entities layer** can import from shared only
6. **Shared layer** cannot import from any other layer

### Import Examples
```typescript
// ✅ Correct imports
// In a feature
import { TextCard } from '@/entities/text/ui/TextCard'
import { Button } from '@/shared/ui/button'
import { formatDate } from '@/shared/lib/utils'
import { useProgress } from '@/features/progress/lib/useProgress'

// ❌ Incorrect imports
// In shared layer
import { TextCard } from '@/entities/text/ui/TextCard' // Not allowed

// In entities layer
import { progressFeature } from '@/features/progress' // Not allowed
```

## Public API Pattern

Each slice should export a public API through an `index.ts` file:

```typescript
// features/text-reading/index.ts
export { TextReader } from './ui/TextReader'
export { useTextReading } from './lib/hooks/useTextReading'
export { readText } from './server-actions/readText'
export type { TextReadingState } from './model/types'
```

## Naming Conventions

### Files and Folders
- **PascalCase** for components and types
- **camelCase** for functions and variables
- **kebab-case** for CSS modules and utilities
- **UPPER_SNAKE_CASE** for constants

### Examples
```
TextReader.tsx           # Component
useTextReading.ts        # Hook
text-reader.module.css   # CSS module
TEXT_CATEGORIES.ts      # Constants
```

## Adding New Code

### Adding a New Feature
1. Create feature folder in `src/features/`
2. Follow segment structure (ui, model, lib, api)
3. Create `index.ts` with public API exports
4. Document the feature in architecture docs
5. Update import rules if necessary

### Adding a New Entity
1. Create entity folder in `src/entities/`
2. Follow segment structure
3. Create `index.ts` with public API exports
4. Document the entity in architecture docs
5. Ensure independence from other entities

### Adding a New Widget
1. Create widget folder in `src/widgets/`
2. Compose features and entities
3. Create `index.ts` with public API exports
4. Document the widget in architecture docs

### Adding a New Page
1. Create page folder in `src/pages/`
2. Compose widgets and features
3. Handle routing and layout
4. Document the page in architecture docs

## Documentation Requirements

### For Each New Slice
- **Purpose:** What does this slice do?
- **Dependencies:** What other slices does it depend on?
- **Public API:** What does it export?
- **Usage Examples:** How to use this slice?

### Architecture Documentation
- Update this document when adding new layers or changing structure
- Document any deviations from standard patterns
- Keep import rules up to date

## Best Practices

### Code Organization
- Keep slices small and focused
- Use meaningful names for slices and segments
- Follow consistent file naming conventions
- Group related functionality together

### State Management
- Use local state for component-specific data
- Use localStorage for user progress (MVP)
- Keep business logic in model segments
- Use selectors for derived state
- Future: Database-based state management

### Performance
- Lazy load features when possible
- Use code splitting for large features
- Optimize bundle size with tree shaking
- Cache API responses appropriately

### Testing
- Test each segment independently
- Mock dependencies from other layers
- Test public APIs thoroughly
- Maintain good test coverage

## Migration Guidelines

### From Monolithic Structure
1. Identify feature boundaries
2. Extract entities first
3. Move shared utilities
4. Refactor features
5. Update imports gradually
6. Test thoroughly at each step

### Common Pitfalls
- **Circular Dependencies:** Ensure proper layer hierarchy
- **Over-Engineering:** Don't create slices for simple components
- **Tight Coupling:** Keep slices loosely coupled
- **Inconsistent Naming:** Follow established conventions


