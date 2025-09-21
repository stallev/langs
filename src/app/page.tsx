import { BookOpen, Globe, Target, Award } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { NAVIGATION } from '@/shared/constants/navigation';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.HOME_TITLE,
  SEO_CONSTANTS.HOME_DESCRIPTION,
  SEO_CONSTANTS.HOME_KEYWORDS,
  '/',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl md:text-7xl font-light text-foreground leading-tight tracking-tight">
            Learn Languages Through
            <span className="block text-muted-foreground">Real Stories</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            Master English with our carefully crafted lessons based on the 3000 most common words.
            Start your journey to fluency today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Link
              href={NAVIGATION.LESSONS.PATH}
              className="bg-foreground text-background px-8 py-4 rounded-2xl text-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              Start Learning
            </Link>
            <Link
              href={NAVIGATION.ABOUT.PATH}
              className="border border-border px-8 py-4 rounded-2xl text-lg font-medium hover:bg-muted/50 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16 tracking-tight">
            Why Choose LangLearn?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-muted/20 rounded-2xl p-8 border-0 text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light">Thematic Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Learn vocabulary and grammar through engaging stories about family, work, travel,
                and more.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0 text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light">Focused Approach</h3>
              <p className="text-muted-foreground leading-relaxed">
                Master the 3000 most common English words that make up 90% of everyday
                conversations.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0 text-center space-y-4">
              <div className="w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center mx-auto">
                <Globe className="w-8 h-8 text-foreground" />
              </div>
              <h3 className="text-2xl font-light">Real Context</h3>
              <p className="text-muted-foreground leading-relaxed">
                Practice with authentic examples and practical phrases you&apos;ll actually use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-muted/30 rounded-2xl p-12 border-0">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-light text-foreground">112</div>
                <div className="text-muted-foreground">Thematic Lessons</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-light text-foreground">3000</div>
                <div className="text-muted-foreground">Essential Words</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-light text-foreground">B1-B2</div>
                <div className="text-muted-foreground">Intermediate Level</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-light text-center mb-16 tracking-tight">How It Works</h2>

          <div className="space-y-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light">Read & Learn</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Start with an engaging story that introduces new vocabulary in context. Each
                  lesson focuses on a specific theme like family relationships or daily routines.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light">Practice & Apply</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Study key words with translations and examples. Practice with additional phrases
                  and grammar notes to reinforce your learning.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-16 h-16 bg-foreground/10 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-light">Master & Progress</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Track your progress and build confidence as you work through lessons. Each
                  completed lesson brings you closer to fluency.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-muted/20 rounded-2xl p-12 border-0 space-y-8">
            <h2 className="text-4xl font-light tracking-tight">
              Ready to Start Your Language Journey?
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Join thousands of learners who are mastering English with our proven method.
            </p>
            <Link
              href={NAVIGATION.LESSONS.SUBMENU.ENGLISH_B1B2.PATH}
              className="inline-block bg-foreground text-background px-8 py-4 rounded-2xl text-lg font-medium hover:bg-foreground/90 transition-colors"
            >
              Begin Learning Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
