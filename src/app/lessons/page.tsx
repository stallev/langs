import { BookOpen, Globe, Users, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.LESSONS_TITLE,
  SEO_CONSTANTS.LESSONS_DESCRIPTION,
  SEO_CONSTANTS.LESSONS_KEYWORDS,
  '/lessons',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function LessonsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
            Language
            <span className="block text-muted-foreground">Lessons</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            Master languages through carefully curated lessons based on the most common words and
            phrases. Start your journey to fluency with our structured learning approach.
          </p>
        </div>
      </section>

      {/* Available Languages Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">Available Languages</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Choose from our growing collection of language courses, each designed around the most
              frequently used words and practical phrases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* English B1-B2 */}
            <div className="bg-muted/20 rounded-2xl p-8 border-0 hover:bg-muted/30 transition-colors group">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
                      English
                    </h3>
                    <p className="text-sm text-muted-foreground">Intermediate Level</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">38 lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">B1-B2 level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Oxford 3000 words</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Master English at the intermediate level through thematic texts with the most
                  common words and practical usage examples. Based on the Oxford 3000 word list.
                </p>

                <Link
                  href="/lessons/eng/b1b2"
                  className="inline-flex items-center justify-center w-full bg-foreground text-background px-6 py-3 rounded-2xl text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Start Learning English
                </Link>
              </div>
            </div>

            {/* Russian A1-A2 */}
            <div className="bg-muted/20 rounded-2xl p-8 border-0 hover:bg-muted/30 transition-colors group">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
                      Russian
                    </h3>
                    <p className="text-sm text-muted-foreground">Beginner Level</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">25 lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">A1-A2 level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">2000 common words</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Learn Russian at the beginner level through thematic texts with the most common
                  words and practical usage examples. Perfect for English speakers starting their
                  Russian journey.
                </p>

                <Link
                  href="/lessons/rus/a1a2"
                  className="inline-flex items-center justify-center w-full bg-foreground text-background px-6 py-3 rounded-2xl text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Start Learning Russian
                </Link>
              </div>
            </div>

            <div className="bg-muted/10 rounded-2xl p-8 border-0 opacity-60">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted/20 rounded-2xl flex items-center justify-center">
                    <Globe className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-muted-foreground">Spanish</h3>
                    <p className="text-sm text-muted-foreground">Coming Soon</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Spanish language lessons for English speakers. Master essential Spanish vocabulary
                  and grammar through practical examples.
                </p>

                <div className="inline-flex items-center justify-center w-full bg-muted/20 text-muted-foreground px-6 py-3 rounded-2xl text-sm font-medium cursor-not-allowed">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Our Learning Methodology
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We focus on the most frequently used words and phrases to maximize your learning
              efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Frequency-Based Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our lessons are built around the most common words in each language. By focusing on
                high-frequency vocabulary, you&apos;ll quickly build practical language skills that
                you can use in real conversations.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Thematic Organization</h3>
              <p className="text-muted-foreground leading-relaxed">
                Words are organized into meaningful themes like family, work, travel, and daily
                life. This contextual approach helps you understand how words are used in real
                situations.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Practical Examples</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every lesson includes practical examples, synonyms, and contextual usage to help you
                understand not just what words mean, but how to use them naturally.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Progressive Difficulty</h3>
              <p className="text-muted-foreground leading-relaxed">
                Lessons are carefully sequenced from basic to advanced concepts, ensuring you build
                a solid foundation before moving to more complex topics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-muted/20 rounded-2xl p-12 border-0">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are mastering languages with our proven methodology.
              Choose from English B1-B2 or Russian A1-A2 and build your vocabulary systematically.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/lessons/eng/b1b2"
                className="inline-flex items-center bg-foreground text-background px-8 py-4 rounded-2xl text-lg font-medium hover:bg-foreground/90 transition-colors"
              >
                Start Learning English B1-B2
              </Link>
              <Link
                href="/lessons/rus/a1a2"
                className="inline-flex items-center bg-muted text-foreground px-8 py-4 rounded-2xl text-lg font-medium hover:bg-muted/80 transition-colors"
              >
                Start Learning Russian A1-A2
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
