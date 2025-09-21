import { Metadata } from 'next';
import Link from 'next/link';
import { NAVIGATION } from '@/shared/constants/navigation';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.ABOUT_TITLE,
  SEO_CONSTANTS.ABOUT_DESCRIPTION,
  SEO_CONSTANTS.ABOUT_KEYWORDS,
  '/about',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
            About
            <span className="block text-muted-foreground">LangLearn</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            An innovative platform designed to help you master languages through carefully crafted
            thematic texts and the most commonly used vocabulary.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              We believe that language learning should be engaging, practical, and focused on
              real-world usage. Our platform combines the power of thematic learning with the
              efficiency of studying the most frequently used words in any language.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-light text-foreground">Why Thematic Learning?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Instead of memorizing isolated words, our lessons present vocabulary within
                meaningful contexts. Each lesson focuses on a specific theme like family, work, or
                travel, making it easier to remember and use new words in real situations.
              </p>
            </div>
            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Contextual vocabulary</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Real-world scenarios</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Practical examples</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-foreground">Cultural insights</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-foreground">Our Methodology</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Our approach is based on linguistic research and proven language learning
                techniques.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-background/60 rounded-2xl p-8 border-0 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">3000</span>
                </div>
                <h3 className="text-xl font-light text-foreground">Most Common Words</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Focus on the 3000 most frequently used words that make up 90% of everyday
                  communication.
                </p>
              </div>

              <div className="bg-background/60 rounded-2xl p-8 border-0 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">B1-B2</span>
                </div>
                <h3 className="text-xl font-light text-foreground">Intermediate Level</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Carefully designed content for intermediate learners to build confidence and
                  fluency.
                </p>
              </div>

              <div className="bg-background/60 rounded-2xl p-8 border-0 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl font-bold text-primary">112</span>
                </div>
                <h3 className="text-xl font-light text-foreground">Thematic Lessons</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Comprehensive coverage of essential life topics from family to technology.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              What Makes Us Different
            </h2>
          </div>

          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">1</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-light text-foreground">Natural Language Integration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every keyword is organically integrated into realistic texts, ensuring you learn
                  words in context rather than isolation. This approach mirrors how native speakers
                  naturally acquire vocabulary.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">2</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-light text-foreground">Optimized Repetition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each keyword appears no more than twice per lesson, preventing overexposure while
                  ensuring sufficient practice. This balanced approach maximizes retention without
                  creating fatigue.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold">3</span>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-light text-foreground">
                  Comprehensive Learning Support
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Each lesson includes synonyms, practical phrases, grammar notes, and related
                  topics. This holistic approach ensures you not only learn words but understand how
                  to use them effectively in conversation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">About the Creator</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              LangLearn was created by Alexandr Levshenko, a passionate developer with extensive
              experience in software development and a deep appreciation for language learning.
            </p>
          </div>

          <div className="bg-muted/20 rounded-2xl p-8 border-0">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-light text-foreground">Alexandr Levshenko</h3>
                  <p className="text-lg text-muted-foreground">
                    Full-Stack Developer & Language Learning Enthusiast
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  With over 8 years of experience in software development, Alexandr has worked on
                  diverse projects ranging from enterprise applications to innovative educational
                  platforms. His expertise spans full-stack development, cloud architecture, and
                  modern web technologies.
                </p>

                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-foreground">Professional Experience</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Full-stack development with modern frameworks</li>
                    <li>• Cloud architecture and deployment</li>
                    <li>• Educational technology solutions</li>
                    <li>• User experience optimization</li>
                  </ul>
                </div>

                <div className="flex items-center space-x-4">
                  <a
                    href="https://www.linkedin.com/in/alexandr-levshenko-587377100/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>LinkedIn Profile</span>
                  </a>
                  <a
                    href="mailto:stallev@yahoo.com"
                    className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    <span>Contact</span>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-foreground">Why LangLearn?</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    As someone who understands the challenges of learning new languages, Alexandr
                    created LangLearn to provide a more effective and engaging approach to language
                    acquisition. The platform combines his technical expertise with pedagogical
                    research to deliver an optimal learning experience.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-lg font-medium text-foreground">Vision</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    LangLearn represents a commitment to making quality language education
                    accessible to everyone, regardless of their background or financial situation.
                    The platform is designed to grow and evolve based on user feedback and the
                    latest educational research.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join thousands of learners who have improved their language skills with our proven
              methodology. Start with our English B1-B2 lessons today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Link
                href={NAVIGATION.LESSONS.SUBMENU.ENGLISH_B1B2.PATH}
                className="bg-foreground text-background px-8 py-4 rounded-2xl text-lg font-medium hover:bg-foreground/90 transition-colors"
              >
                Start Learning
              </Link>
              <Link
                href={NAVIGATION.LESSONS.PATH}
                className="border border-border px-8 py-4 rounded-2xl text-lg font-medium hover:bg-muted/50 transition-colors"
              >
                Browse Lessons
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
