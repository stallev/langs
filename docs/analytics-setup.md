# Google Analytics 4 Setup Guide

This guide provides detailed instructions for setting up Google Analytics 4 (GA4) in both development and production environments for the LangLearn platform.

## Overview

The LangLearn platform uses Google Analytics 4 for tracking user interactions, page views, and learning analytics. The implementation follows Next.js best practices using the official `next/script` component for optimal performance.

## Prerequisites

- Google Analytics account
- Access to Google Analytics dashboard
- Environment variables configuration access

## Step 1: Create GA4 Property

### 1.1 Access Google Analytics
1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring" or "Create Account"

### 1.2 Create Property
1. **Account Setup**:
   - Enter account name: `LangLearn`
   - Configure data sharing settings as needed
   - Click "Next"

2. **Property Setup**:
   - Enter property name: `LangLearn Platform`
   - Select reporting time zone
   - Select currency
   - Click "Next"

3. **Business Information**:
   - Select industry category: `Education`
   - Select business size
   - Choose how you plan to use Google Analytics
   - Click "Create"

### 1.3 Create Data Stream
1. Select "Web" as your platform
2. Enter website URL: `https://your-domain.com` (or `http://localhost:3000` for development)
3. Enter stream name: `LangLearn Web`
4. Click "Create stream"

### 1.4 Get Measurement ID
1. In the stream details, copy the **Measurement ID**
2. Format: `G-XXXXXXXXXX`
3. **Your Measurement ID**: `G-700P5GR3C5`

## Step 2: Environment Configuration

### 2.1 Development Environment

Create or update `.env.local` file in your project root:

```bash
# Google Analytics 4 - Development
NEXT_PUBLIC_GA_ID=G-700P5GR3C5
```

### 2.2 Production Environment

#### For Vercel Deployment:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `NEXT_PUBLIC_GA_ID`
   - **Value**: `G-700P5GR3C5`
   - **Environment**: Production (and Preview if needed)
5. Click "Save"

#### For Other Hosting Platforms:
Add the environment variable to your hosting platform's configuration:
```bash
NEXT_PUBLIC_GA_ID=G-700P5GR3C5
```

## Step 3: Implementation Details

### 3.1 Architecture Overview

The GA4 implementation consists of several components:

```
src/
├── components/analytics/
│   ├── GoogleAnalytics.tsx      # Main GA4 script loader
│   └── AnalyticsProvider.tsx    # Page tracking provider
├── hooks/
│   └── use-analytics.ts         # Analytics hook for page tracking
├── lib/
│   └── analytics.ts             # Analytics utilities and event tracking
└── app/
    └── layout.tsx               # Root layout with GA4 integration
```

### 3.2 Key Features

- **Automatic Page Tracking**: Tracks all page views and route changes
- **Custom Event Tracking**: Tracks learning-specific events
- **Performance Optimized**: Uses Next.js Script component with `afterInteractive` strategy
- **Privacy Compliant**: Respects user privacy settings
- **Development Safe**: Only loads in production or when explicitly enabled

### 3.3 Tracked Events

The platform tracks the following custom events:

#### Learning Events
- `lesson_view`: When users view a lesson
- `vocabulary_search`: When users search vocabulary
- `vocabulary_filter`: When users apply filters
- `practice_start`: When users start practice sessions
- `practice_complete`: When users complete practice sessions
- `progress_update`: When users update their progress

#### Event Structure
```typescript
{
  event_category: 'engagement',
  event_label: 'language_lesson_slug',
  value: number // optional
}
```

## Step 4: Testing and Verification

### 4.1 Development Testing

1. **Enable GA4 in Development**:
   ```bash
   # Add to .env.local
   NEXT_PUBLIC_GA_ID=G-700P5GR3C5
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Verify Implementation**:
   - Open browser developer tools
   - Go to Network tab
   - Navigate through the site
   - Look for requests to `google-analytics.com` and `googletagmanager.com`

4. **Real-time Testing**:
   - Go to GA4 dashboard → Reports → Realtime
   - Navigate through your site
   - Verify events appear in real-time

### 4.2 Production Verification

1. **Deploy to Production**:
   ```bash
   npm run build
   npm run start
   ```

2. **Verify Environment Variables**:
   - Ensure `NEXT_PUBLIC_GA_ID` is set in production
   - Check that GA4 loads on production site

3. **Test Analytics**:
   - Use GA4 Realtime reports
   - Verify page views and events are tracked
   - Check for any console errors

## Step 5: Advanced Configuration

### 5.1 Enhanced E-commerce (Optional)

For future e-commerce features, you can extend the analytics:

```typescript
// Example: Track course purchases
export const trackPurchase = (courseId: string, value: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', {
      transaction_id: courseId,
      value: value,
      currency: 'USD',
    });
  }
};
```

### 5.2 Custom Dimensions

You can add custom dimensions in GA4:

1. Go to GA4 → Admin → Custom Definitions → Custom Dimensions
2. Create dimensions for:
   - User language preference
   - Learning level (A1, A2, B1, B2)
   - Lesson category
   - Practice difficulty

### 5.3 Goals and Conversions

Set up conversion goals in GA4:

1. Go to GA4 → Admin → Events
2. Mark important events as conversions:
   - `lesson_complete`
   - `practice_complete`
   - `vocabulary_mastery`

## Step 6: Privacy and Compliance

### 6.1 GDPR Compliance

The implementation respects user privacy:

- No personal data is collected
- Users can opt-out via browser settings
- Analytics can be disabled via environment variables

### 6.2 Cookie Policy

Update your privacy policy to include:

- Google Analytics usage
- Data collection purposes
- User rights and opt-out options

## Step 7: Monitoring and Maintenance

### 7.1 Regular Monitoring

- Check GA4 reports weekly
- Monitor for tracking errors
- Review user engagement metrics

### 7.2 Performance Impact

- GA4 script loads asynchronously
- Minimal impact on page load times
- Uses Next.js optimization features

### 7.3 Troubleshooting

Common issues and solutions:

1. **GA4 not loading**:
   - Check environment variable is set
   - Verify measurement ID format
   - Check browser console for errors

2. **Events not tracking**:
   - Verify gtag function is available
   - Check event parameters
   - Test in incognito mode

3. **Development vs Production**:
   - Ensure different data streams for dev/prod
   - Use filters to separate data
   - Consider using GA4 DebugView

## Step 8: Analytics Dashboard Setup

### 8.1 Custom Reports

Create custom reports for:

- Learning progress tracking
- Popular lessons and vocabulary
- User engagement patterns
- Practice session analytics

### 8.2 Audience Segments

Define audience segments:

- New learners
- Active learners
- Advanced learners
- Mobile vs desktop users

## Environment Variables Summary

```bash
# Development (.env.local)
NEXT_PUBLIC_GA_ID=G-700P5GR3C5

# Production (Vercel/other hosting)
NEXT_PUBLIC_GA_ID=G-700P5GR3C5
```

## Support and Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Next.js Script Component](https://nextjs.org/docs/app/building-your-application/optimizing/scripts)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)

## Security Notes

- Never commit `.env.local` to version control
- Use different GA4 properties for development and production
- Regularly review GA4 access permissions
- Monitor for unusual traffic patterns

---

**Last Updated**: January 2025  
**GA4 Measurement ID**: G-700P5GR3C5  
**Implementation**: Next.js App Router with Script component