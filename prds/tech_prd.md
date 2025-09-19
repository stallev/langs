# Technical Requirements Document: Language Learning Platform

## Technology Stack

### Frontend
- **Framework:** Next.js 15.5.3 with App Router
- **Language:** TypeScript
- **State Management:** React Server Components and Server Actions
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS v4
- **Form Handling:** React Hook Form v7.61.1 with Zod v4.0.10

### Backend
- **Framework:** Next.js API routes with TypeScript
- **Database:** PostgreSQL (Neon) - для будущего расширения
- **ORM:** Prisma ORM v6.13.0 - для будущего расширения
- **Authentication:** Не требуется в MVP версии

## Technical Requirements

### Task Implementation Requirements

- **Detailed Documentation:** Each task must have a corresponding detailed description document in the `docs/tasks_descriptions/release_X.Y/` directory
- **Implementation Compliance:** All implementations must strictly adhere to the approaches, best practices, and guidelines specified in the task description document
- **Version-Specific Implementation:** Code must be compatible with the exact library versions specified in package.json
- **Documentation First Approach:** Before implementing any task, the detailed description document must be created or reviewed if it already exists
- **Alternative Approaches Consideration:** Developers should review and understand the alternative approaches mentioned in the task description document and the rationale for the recommended approach
- **Best Practices Adherence:** Implementation must follow the best practices from the official documentation of each technology, according to the specific version being used
- **Code Review Requirement:** Before making any changes to the project code, the CursorAI agent must double-check the proposed code for correctness, completeness, and compliance with project requirements
- **CursorAI Agent Rule:** "Before implementing any code changes, the CursorAI agent must thoroughly review and validate the proposed code to ensure it meets all project requirements, follows established patterns, and maintains code quality standards. This includes checking for proper TypeScript typing, FSD architecture compliance, SOLID principles adherence, and PRD requirements fulfillment."
- **Documentation Language Requirement:** All project documentation, code comments, and technical specifications must be written exclusively in English. This includes PRD files, architecture documents, inline code comments, and development documentation.
- **Constants for UI and Error Messages**:
  - **Mandatory Use of Constants:** Hooks, components, and server actions must not use hardcoded string values for error logs, input or textarea placeholders, labels, form field names, content types, or any other string literals. Instead, they must use predefined constants from the appropriate `constants/` files located in the respective directories according to FSD methodology (e.g., `src/entities/{entity}/constants/` or `src/features/{feature}/constants/` or `src/shared/constants/`).
  - **Single Source of Truth:** Constants ensure a single source of truth for UI text, error messages, form field names, content types, and other string values, facilitating maintainability, consistency, and localization (e.g., Next.js i18n support for English default and Russian MVP).
  - **File Structure:** Constants must be defined in appropriate files within the relevant entity, feature, or shared directory, following the Feature-Sliced Design (FSD) structure:
    - `src/shared/constants/` - for global constants (ErrorMessages, ContentTypes, Roles, etc.)
    - `src/entities/{entity}/constants/` - for entity-specific constants
    - `src/features/{feature}/constants/` - for feature-specific constants
  - **Naming Convention:** Constants should use descriptive, uppercase names with underscores (e.g., `COMMENT_CONTENT_PLACEHOLDER`, `ERROR_UNAUTHORIZED`, `FORM_FIELDS_TITLE`, `CONTENT_TYPES_POEM_CATEGORY`).
  - **Implementation Example**:
    ```typescript
    // src/features/poem-creation/lib/constants.ts
    export const FORM_FIELDS = {
      TITLE: 'title',
      CATEGORY_ID: 'categoryId',
      CONTENT: 'content',
    } as const;

    export const POEM_ERRORS = {
      ACCESS_DENIED: 'Доступ запрещен. Необходима авторизация.',
      INSUFFICIENT_PERMISSIONS: 'Недостаточно прав для создания стихотворений.',
    } as const;

    // src/shared/constants/ContentTypes.ts
    export const CONTENT_TYPES = {
      POEM_CATEGORY: 'POEM_CATEGORY',
      USER_PROFILE: 'USER_PROFILE',
      POEM_TAG: 'POEM_TAG',
    } as const;

    // src/features/poem-creation/server-actions/createPoem.ts
    import { FORM_FIELDS, POEM_ERRORS } from '../lib/constants';
    import { CONTENT_TYPES } from '@/shared/constants/ContentTypes';
    
    // Usage in server action
    const rawData = {
      title: formData.get(FORM_FIELDS.TITLE) as string,
      categoryId: formData.get(FORM_FIELDS.CATEGORY_ID) as string,
      content: JSON.parse(formData.get(FORM_FIELDS.CONTENT) as string),
    };
    
    throw new Error(POEM_ERRORS.ACCESS_DENIED);
    
    // Usage for content types
    type: CONTENT_TYPES.POEM_CATEGORY,
    ```
  - **Validation:** Code reviews and linting rules must enforce the use of constants, rejecting hardcoded strings for UI text, error messages, form field names, content types, or any other string literals.
  - **Documentation:** Task description documents must include the constants defined and their usage in hooks, components, and server actions.
  - **SOLID and DRY Principles:** This approach follows the Single Responsibility Principle (each constant has a single purpose) and the Don't Repeat Yourself principle (avoiding duplication of string literals across the codebase).

### Server Actions Requirements

**MANDATORY:** All server-side operations, including form processing and data fetching, MUST be implemented using Next.js Server Actions. This requirement applies to:

#### Form Processing
- **Content Creation and Editing:** All forms for creating/editing texts, categories, etc.
- **Data Updates:** All operations that modify data in the database
- **File Uploads:** All file upload operations must be handled through server actions

#### Data Fetching
- **Dashboard Data:** All data fetching for dashboard pages must use server actions
- **Content Lists:** All content listing operations (texts, categories, etc.)
- **Search Operations:** All search functionality must be implemented via server actions

#### Implementation Standards
- **File Structure:** Server actions must be organized in `src/features/{feature-name}/server-actions/` directories
- **Naming Convention:** Server action files must follow the pattern `{actionName}.ts` (e.g., `createCategory.ts`, `updateUser.ts`)
- **Error Handling:** All server actions must include comprehensive error handling with proper error messages
- **Validation:** All server actions must validate input data using Zod schemas
- **Authentication:** Не требуется в MVP версии
- **Revalidation:** Server actions must properly revalidate cache using `revalidatePath()` and `revalidateTag()`
- **Type Safety:** All server actions must be fully typed with TypeScript

#### Server Action Structure Example
```typescript
// src/features/dashboard/server-actions/categories/createCategory.ts
'use server';

import { revalidatePath } from 'next/cache';
import { auth } from '@/shared/api/auth/auth';
import { categoryRepository } from '@/entities/category';
import { categoryFormSchema } from '@/features/dashboard/model/schemas';
import { CATEGORY_ERRORS, CATEGORY_SUCCESS } from '@/entities/category/constants';

export async function createCategory(formData: FormData) {
  try {
    // 1. Data parsing and validation
    const rawData = {
      translations: {
        EN: formData.get('translations.EN') as string,
        RU: formData.get('translations.RU') as string,
        UA: formData.get('translations.UA') as string,
      },
      isActive: formData.get('isActive') === 'true',
      order: formData.get('order') ? Number(formData.get('order')) : undefined,
    };

    const validatedData = categoryFormSchema.parse(rawData);

    // 2. Business logic
    const category = await categoryRepository.create(validatedData);

    // 3. Cache revalidation
    revalidatePath('/dashboard/content/categories');
    revalidatePath('/dashboard');

    // 4. Success response
    return {
      success: true,
      message: CATEGORY_SUCCESS.CREATED,
      data: category,
    };
  } catch (error) {
    // 5. Error handling
    console.error('Error creating category:', error);
    
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: false,
      message: CATEGORY_ERRORS.UNKNOWN_ERROR,
    };
  }
}
```

#### Client-Side Integration
```typescript
// Client component using server action
'use client';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { createCategory } from './server-actions/createCategory';

export function CategoryForm() {
  const [state, formAction] = useFormState(createCategory, {
    success: false,
    message: '',
  });

  return (
    <form action={formAction}>
      {/* Form fields */}
      <SubmitButton />
      
      {state.message && (
        <div className={state.success ? 'text-green-600' : 'text-red-600'}>
          {state.message}
        </div>
      )}
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Сохранение...' : 'Сохранить'}
    </button>
  );
}
```

#### Prohibited Patterns
- **API Routes for Forms:** Do NOT use API routes (`/api/*`) for form processing
- **Client-Side Data Fetching:** Do NOT use `fetch()` or `axios` for server operations in forms
- **Direct Database Access:** Do NOT access database directly from client components
- **Bypassing Server Actions:** Do NOT implement custom HTTP endpoints for operations that should use server actions

#### Exceptions
The following operations MAY use API routes instead of server actions:
- **Third-party Integrations:** Webhooks and external API integrations
- **File Serving:** Static file serving and media delivery
- **Real-time Features:** WebSocket connections and real-time updates
- **Public APIs:** External API endpoints for third-party consumption

### Architecture
- **Feature-Sliced Design (FSD) Implementation:** All development must strictly follow Feature-Sliced Design methodology, adapted to the current technology stack (Next.js 15.4.4, TypeScript, Prisma v6.13.0, Auth.js v5 beta)
- **Layer Separation:** Clear separation between app, pages, widgets, features, entities, and shared layers
- **Feature Isolation:** Each feature should be self-contained with its own components, hooks, and utilities
- **Entity Independence:** Business entities should be independent and reusable across features
- **Shared Layer:** Common utilities, UI components, and configurations should be in the shared layer
- **Strict Import Rules:** Enforce FSD import rules (layers can only import from layers below them)
- **SOLID Principles:** Strict adherence to Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion principles

### React Component Development Standards

#### Component Structure Requirements
- **Arrow Function Components:** All React components must be implemented as arrow functions
- **FSD Architecture Compliance:** Components must follow Feature-Sliced Design methodology with proper layer separation
- **Proper Folder Structure:** Each feature must have the following structure:
  ```
  src/features/feature-name/
  ├── ui/
  │   ├── ComponentName.tsx
  │   └── index.ts
  ├── model/
  │   ├── types.ts
  │   ├── schemas.ts
  │   ├── constants.ts
  │   └── index.ts
  ├── lib/
  │   ├── hooks/
  │   │   ├── useHookName.ts
  │   │   └── index.ts
  │   ├── utils/
  │   │   ├── utilsName.ts
  │   │   └── index.ts
  │   └── index.ts
  ├── server-actions/
  │   ├── actionName.ts
  │   └── index.ts
  └── index.ts
  ```

#### Code Reusability Requirements
- **Base Component Pattern:** Create reusable base components for common functionality
- **Custom Hooks:** Extract reusable logic into custom hooks
- **Utility Functions:** Create utility functions for common operations
- **Composition Pattern:** Use composition over inheritance for component extension

#### TypeScript Requirements
- **Strict Typing:** All components, props, states, and functions must be strictly typed
- **Interface Definitions:** Define clear interfaces for all component props and data structures
- **Type Safety:** Ensure type safety across all layers of the application
- **Generic Types:** Use generic types where appropriate for reusable components
- **No `any` Type:** The `any` type must not be used in hooks, components, or utilities. Instead, define specific types in `src/features/*/model/types.ts` or other appropriate FSD locations and import them as needed
- **Explicit Typing:** All new hooks and components must include explicit TypeScript types for parameters, return values, and state to ensure type safety and maintainability

#### SOLID Principles Implementation
- **Single Responsibility Principle:** Each component should have a single, well-defined responsibility
- **Open/Closed Principle:** Components should be open for extension but closed for modification
- **Liskov Substitution Principle:** Derived components should be substitutable for their base components
- **Interface Segregation Principle:** Components should not be forced to depend on interfaces they don't use
- **Dependency Inversion Principle:** High-level components should not depend on low-level components

#### PRD Compliance Requirements
- **Multilingual Support:** All components must support multiple languages (EN, RU, UA) with proper internationalization
- **Error Handling:** Implement comprehensive error handling with user-friendly error messages
- **Server Actions Integration:** All forms and data operations must use Server Actions
- **Accessibility:** Ensure components meet accessibility standards (ARIA attributes, keyboard navigation)
- **Performance:** Optimize components for performance (memoization, lazy loading, code splitting)

#### Form Development Standards
- **React Hook Form Integration:** Use React Hook Form with Zod validation for all forms
- **Server Actions:** All form submissions must use Server Actions with proper error handling
- **Validation:** Implement both client-side and server-side validation
- **User Experience:** Provide immediate feedback, loading states, and clear error messages
- **Form Visibility Management:** After successful form submission, forms should be hidden from the DOM and only reappear when explicitly triggered by user action (e.g., clicking "Add Comment" or "Add Review" buttons). This applies to comment forms, review forms, and other user-generated content forms to maintain clean UI and prevent accidental duplicate submissions
- **Accessibility:** Ensure forms are accessible with proper labels, ARIA attributes, and keyboard navigation

#### Hook Development Standards
- **Custom Hooks:** Create custom hooks for reusable logic and state management
- **Type Safety:** All hooks must be properly typed with TypeScript
- **Error Handling:** Implement proper error handling in hooks
- **Performance:** Optimize hooks for performance (useMemo, useCallback where appropriate)
- **Testing:** Ensure hooks are testable and well-documented

#### Utility Development Standards
- **Pure Functions:** Utility functions should be pure and side-effect free
- **Type Safety:** All utility functions must be properly typed
- **Reusability:** Utilities should be designed for reuse across the application
- **Performance:** Optimize utilities for performance
- **Documentation:** Provide clear documentation for all utility functions

#### Server Actions Standards
- **Authentication:** All Server Actions must verify user authentication and authorization
- **Validation:** Implement comprehensive input validation using Zod schemas
- **Error Handling:** Provide detailed error messages and proper error logging
- **Cache Management:** Use proper cache invalidation with revalidatePath and revalidateTag
- **Type Safety:** Ensure all Server Actions are properly typed
- **Security:** Implement security best practices (input sanitization, CSRF protection)

### Performance
- Fast page loads and smooth interactions
- Page load times under 3 seconds
- 99.9% uptime
- Mobile responsiveness scores

### Security
- Secure authentication and data protection
- Security incident rates monitoring
- Automated vulnerability scanning for dependencies

### Scalability
- Architecture that can handle growth
- Database schema optimized for performance
- Efficient query patterns

### SEO
- Optimized for search engines with proper meta tags
- Structured data implementation
- Sitemap generation

### Monitoring
- Error tracking and performance monitoring
- Vercel Analytics integration
- Performance regression detection

## Database Schema Considerations

### Core Entities
- **Texts:** Metadata (title, content, category, words list, language)
- **Categories:** Multilingual translations for all interface languages
- **Words:** Word definitions and translations
- **User Progress:** Progress tracking for studied texts (localStorage в MVP)
- **Multilingual Support:** Interface translations and user language preferences

### Database Design Principles
- Normalized schema for data integrity
- Indexed fields for search performance
- Efficient foreign key relationships
- Soft deletes for content preservation
- Audit trails for moderation actions

## CI/CD Requirements

### Deployment Strategy
- **Platform:** Vercel for hosting and deployment
- **Branch Strategy:** Main branch for production, feature branches for development
- **Environment Management:** Separate environments for development, staging, and production

### Build and Deploy Pipeline
- **Pre-commit Hooks:** ESLint, Prettier, and TypeScript type checking
- **Pull Request Checks:** Automated testing, linting, and security scanning
- **Deployment Triggers:** Automatic deployment on main branch merge
- **Rollback Strategy:** Quick rollback capability for failed deployments

### Quality Assurance
- **Code Quality:** ESLint and Prettier for code formatting and standards
- **Security Scanning:** Automated vulnerability scanning for dependencies
- **Performance Monitoring:** Lighthouse CI for performance regression detection
- **Database Migrations:** Automated Prisma migration deployment
- **Task Implementation Compliance:** Implementation of each task must strictly follow the guidelines, best practices, and approaches described in the corresponding file in the `docs/tasks_descriptions/release_X.Y/` directory. If such a file does not exist, it must be created before implementing the task

### Environment Configuration
- **Environment Variables:** Secure management of API keys and database connections
- **Feature Flags:** Ability to enable/disable features without deployment
- **Monitoring Integration:** Vercel Analytics and error tracking setup

### Backup and Recovery
- **Database Backups:** Automated daily backups with point-in-time recovery
- **Deployment History:** Maintain deployment logs and rollback points
- **Disaster Recovery:** Documented recovery procedures for critical failures

## API Design

### RESTful Endpoints
- **Texts:** `/api/texts/*` - Text CRUD operations
- **Categories:** `/api/categories/*` - Category management
- **Words:** `/api/words/*` - Word management
- **Search:** `/api/search` - Full-text search functionality

### API Response Standards
- Consistent JSON response format
- Proper HTTP status codes
- Error handling with meaningful messages
- Pagination for list endpoints
- Rate limiting for API protection

## Search Implementation

### Full-Text Search
- PostgreSQL full-text search capabilities (для будущего расширения)
- Search across text titles, content, and word definitions
- Category-based filtering
- Language-based filtering
- Relevance scoring and ranking

### Search Features
- Real-time search suggestions
- Search result highlighting
- Advanced filters (category, language, difficulty)
- Search history (localStorage в MVP)

## Multilingual Implementation

### Internationalization (i18n)
- Next.js internationalization framework
- Translation file management
- Dynamic language switching
- Locale-specific formatting

### Database Localization
- Multilingual content storage
- Translation fallback mechanisms
- Language-specific metadata
- Content versioning for translations

## Security Implementation

### Authentication & Authorization
- Не требуется в MVP версии
- Возможность добавления в будущих версиях

### Data Protection
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Rate limiting

### Content Security
- File upload restrictions
- Content filtering
- Moderation workflow
- User reporting system

## User Progress Tracking (MVP Implementation)

### Strategy
- **Local Storage:** User progress stored in browser localStorage
- **No Authentication:** No user accounts required in MVP
- **Simple Tracking:** Basic progress tracking for studied texts
- **Future Expansion:** Database-based progress tracking in future versions

### Implementation
- **Progress Data:** Object with text IDs and completion status
- **Local Storage Key:** `language-learning-progress`
- **Data Structure:**
  ```typescript
  interface UserProgress {
    studiedTexts: string[];
    lastStudied: string;
    totalTimeSpent: number;
  }
  ```

### File Structure
- `src/shared/lib/progress.ts` – Progress management utilities
- `src/features/progress/ui/ProgressTracker.tsx` – Progress display component
- `src/features/progress/lib/useProgress.ts` – Progress management hook

### Future Considerations
- Database migration when authentication is added
- Cross-device synchronization
- Advanced analytics and insights

## Performance Optimization

### Frontend Optimization
- Code splitting and lazy loading
- Image optimization
- Bundle size optimization
- Caching strategies

### Backend Optimization
- Database query optimization
- API response caching
- CDN integration
- Database connection pooling

### Monitoring & Analytics
- Real-time performance monitoring
- Error tracking and alerting
- User behavior analytics
- Performance metrics dashboard

## CSS Structure and Organization

### CSS Variables Approach

#### Design Token Principles
- **Abstract Tokens**: Base values for colors, sizes, and other properties
- **Semantic Tokens**: Connect abstract tokens to specific interface elements
- **Component Tokens**: Component-specific variables

#### CSS Variables Structure
- **Organization in theme.css**: All CSS variables defined in `src/shared/styles/theme.css`
- **Tailwind Layers**: Variables declared in `@layer base` for proper Tailwind integration
- **Theme Selectors**: Using `:root` for light theme and `.dark` for dark theme
- **prefers-color-scheme Support**: Automatic switching based on system preferences

#### Variable Categories
- **Primary Colors**: Primary, secondary, accent with shade gradations
- **Neutral Colors**: Background, text, borders
- **Component Colors**: Cards, popovers, muted elements
- **Semantic Colors**: Success, warning, error, info
- **Typography**: Fonts, sizes, line heights
- **Dimensions**: Spacing, border radius, shadows

### Tailwind CSS Integration

#### Tailwind Configuration
- **CSS Variables in tailwind.config.mjs**: Binding CSS variables with Tailwind color system
- **Theme Extension**: Using `theme.extend.colors` to add custom colors
- **Semantic Names**: Using clear names for colors (primary, secondary, accent)
- **Shade Gradations**: Support for standard gradations (50-950) for primary colors

#### Usage Rules
- **Preference for Semantic Classes**: Use `bg-primary` instead of `bg-purple-600`
- **Avoid Hardcoding Colors**: Don't use specific colors in components
- **Consistency**: Follow a unified approach across all components
- **Documentation**: All colors and their usage should be documented

### Custom Component Styling

#### Styling Rules
- **CSS Variables Usage**: All colors and other properties should use CSS variables
- **Tailwind Classes Application**: Use Tailwind utility classes for styling
- **Avoiding Inline Styles**: Don't use inline styles with hardcoded values
- **Following the "Design Tokens" Principle**: Abstract styles from specific values

#### Implementation Recommendations
- **Component Approach**: Create reusable components with consistent styles
- **Modifiers**: Use modifiers for component variations
- **Adaptivity**: Ensure correct display on all devices
- **Accessibility**: Follow accessibility standards (contrast, focus, alternative text)

### Theme Management

#### Theme Switching Implementation
- **ThemeProvider**: Using the `ThemeProvider` component from next-themes
- **data-theme Attribute**: Managing theme through the `data-theme` attribute
- **ThemeToggle**: Component for switching between light and dark themes
- **prefers-color-scheme Support**: Automatic detection of user's preferred theme

#### Preference Storage
- **localStorage**: Saving the selected theme in localStorage
- **Server Rendering**: Preventing flicker during page load
- **Switching Without Reload**: Instant application of new theme without page reload

## Technical Success Metrics

### Performance Metrics
- Page load times under 3 seconds
- 99.9% uptime
- Mobile responsiveness scores
- Core Web Vitals compliance

### Security Metrics
- Security incident rates
- Vulnerability scan results
- Data breach prevention
- Content security validation

### Quality Metrics
- Code coverage percentages
- Bug detection rates
- Deployment success rates
- User satisfaction scores

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Next Review:** [Date + 2 weeks]
