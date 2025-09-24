import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Suspense } from 'react';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SkipLink } from '@/components/layout/SkipLink';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'LangLearn - Language Learning Platform',
  description: 'Learn languages through thematic texts with the most common words',
  keywords: 'language learning, English, Russian, vocabulary, B1-B2 level',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const measurementId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {measurementId && <GoogleAnalytics measurementId={measurementId} />}
          <Suspense fallback={null}>
            <AnalyticsProvider>
              <SkipLink />
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </AnalyticsProvider>
          </Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
