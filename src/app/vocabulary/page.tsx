import { BookOpen, Globe, Users, TrendingUp } from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.VOCABULARY_TITLE,
  SEO_CONSTANTS.VOCABULARY_DESCRIPTION,
  SEO_CONSTANTS.VOCABULARY_KEYWORDS,
  '/vocabulary',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function VocabularyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
            Vocabulary
            <span className="block text-muted-foreground">Dictionary</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            Explore comprehensive vocabulary collections with translations, examples, and
            categorized learning paths. Master essential words for effective communication.
          </p>
        </div>
      </section>

      {/* Available Languages Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">Available Languages</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Choose from our growing collection of vocabulary databases, each designed around the
              most frequently used words with comprehensive translations and examples.
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
                    <span className="text-sm text-muted-foreground">2,974 words</span>
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
                  Master English at the intermediate level with comprehensive vocabulary including
                  translations, examples, and categorized learning paths. Based on the Oxford 3000
                  word list.
                </p>

                <Link
                  href="/vocabulary/en/b1b2"
                  className="inline-flex items-center justify-center w-full bg-foreground text-background px-6 py-3 rounded-2xl text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Browse English Vocabulary
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
                    <span className="text-sm text-muted-foreground">355 words</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">A1-A2 level</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Essential words</span>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Learn Russian at the beginner level with essential vocabulary including
                  translations, examples, and categorized learning paths. Perfect for English
                  speakers.
                </p>

                <Link
                  href="/vocabulary/ru/a1a2"
                  className="inline-flex items-center justify-center w-full bg-foreground text-background px-6 py-3 rounded-2xl text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Browse Russian Vocabulary
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
                  Spanish vocabulary for English speakers. Master essential Spanish words with
                  comprehensive translations and examples.
                </p>

                <div className="inline-flex items-center justify-center w-full bg-muted/20 text-muted-foreground px-6 py-3 rounded-2xl text-sm font-medium cursor-not-allowed">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">Vocabulary Features</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our vocabulary system is designed to maximize your learning efficiency and retention.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Categorized Learning</h3>
              <p className="text-muted-foreground leading-relaxed">
                Words are organized into meaningful categories like daily life, business, health,
                and technology. This thematic approach helps you learn related vocabulary together.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Smart Filtering</h3>
              <p className="text-muted-foreground leading-relaxed">
                Filter words by category, search across translations and examples, and sort
                alphabetically or by category for efficient browsing and learning.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Rich Examples</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every word includes practical example sentences showing real-world usage, helping
                you understand context and improve your communication skills.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <h3 className="text-xl font-light text-foreground mb-4">Progressive Levels</h3>
              <p className="text-muted-foreground leading-relaxed">
                Vocabulary is carefully selected for each proficiency level, ensuring you learn the
                most important words first and build a solid foundation for fluency.
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
              Start Building Your Vocabulary
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl mx-auto">
              Choose from English B1-B2 or Russian A1-A2 vocabulary collections and begin your
              systematic vocabulary building journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/vocabulary/en/b1b2"
                className="inline-flex items-center bg-foreground text-background px-8 py-4 rounded-2xl text-lg font-medium hover:bg-foreground/90 transition-colors"
              >
                Browse English Vocabulary
              </Link>
              <Link
                href="/vocabulary/ru/a1a2"
                className="inline-flex items-center bg-muted text-foreground px-8 py-4 rounded-2xl text-lg font-medium hover:bg-muted/80 transition-colors"
              >
                Browse Russian Vocabulary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
