# Google Analytics 4 Setup

## Environment Variables

Add the following environment variable to your `.env.local` file:

```bash
# Google Analytics 4
# Get your GA4 measurement ID from Google Analytics dashboard
# Format: G-XXXXXXXXXX
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Getting Your GA4 Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or select an existing one
3. Go to Admin → Data Streams
4. Select your web stream
5. Copy the Measurement ID (format: G-XXXXXXXXXX)

## Features

- Automatic page view tracking
- Event tracking support
- Privacy-compliant implementation
- Works with Next.js App Router

## Usage

The Analytics component is automatically included in the root layout and will track:
- Page views
- User interactions
- Custom events (when implemented)

No additional configuration is required once the environment variable is set.
