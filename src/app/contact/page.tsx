import { Mail, Clock, Linkedin } from 'lucide-react';
import { Metadata } from 'next';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.CONTACT_TITLE,
  SEO_CONSTANTS.CONTACT_DESCRIPTION,
  SEO_CONSTANTS.CONTACT_KEYWORDS,
  '/contact',
  SEO_CONSTANTS.ROBOTS_NOINDEX
);

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-light text-foreground leading-tight tracking-tight">
            Get in
            <span className="block text-muted-foreground">Touch</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
            Have questions about LangLearn? Want to suggest improvements or report issues? We&apos;d
            love to hear from you and help make your language learning experience even better.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-3xl font-light text-foreground">Contact Information</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Feel free to reach out to us through any of the channels below. We typically
                  respond within 24 hours.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">Email</h3>
                    <p className="text-muted-foreground">For general inquiries and support</p>
                    <a
                      href="mailto:stallev@yahoo.com"
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      stallev@yahoo.com
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Linkedin className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">LinkedIn</h3>
                    <p className="text-muted-foreground">Professional networking and updates</p>
                    <a
                      href="https://www.linkedin.com/in/alexandr-levshenko-587377100/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 transition-colors font-medium"
                    >
                      Alexandr Levshenko
                    </a>
                  </div>
                </div>

                {/* Response Time */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium text-foreground">Response Time</h3>
                    <p className="text-muted-foreground">We typically respond within 24 hours</p>
                    <p className="text-sm text-muted-foreground">
                      Monday - Friday, 9:00 AM - 6:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-muted/20 rounded-2xl p-8 border-0">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="text-2xl font-light text-foreground">Send us a Message</h2>
                  <p className="text-muted-foreground">
                    Have a question or suggestion? We&apos;d love to hear from you.
                  </p>
                </div>

                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full px-4 py-3 bg-background/60 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className="w-full px-4 py-3 bg-background/60 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-background/60 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      className="w-full px-4 py-3 bg-background/60 border border-border/30 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback & Suggestions</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="w-full px-4 py-3 bg-background/60 border border-border/30 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-foreground text-background px-6 py-4 rounded-xl text-lg font-medium hover:bg-foreground/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Creator */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-light text-foreground">About the Creator</h2>

              <div className="bg-background/60 rounded-2xl p-8 border-0 max-w-2xl mx-auto">
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

                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-6">
                      <a
                        href="https://www.linkedin.com/in/alexandr-levshenko-587377100/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                        <span>LinkedIn Profile</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/30">
                    <p className="text-sm text-muted-foreground">
                      LangLearn was created with the vision of making language learning more
                      accessible, engaging, and effective through carefully crafted content and
                      modern technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-light text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Quick answers to common questions about LangLearn
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-muted/20 rounded-2xl p-6 border-0">
              <h3 className="text-xl font-light text-foreground mb-3">
                How can I suggest new features or improvements?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We love hearing from our users! Please send us your suggestions via email or use the
                contact form above. Your feedback helps us make LangLearn better for everyone.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-6 border-0">
              <h3 className="text-xl font-light text-foreground mb-3">Is LangLearn free to use?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! LangLearn is completely free to use. We believe that quality language education
                should be accessible to everyone, regardless of their financial situation.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-6 border-0">
              <h3 className="text-xl font-light text-foreground mb-3">
                Can I report bugs or technical issues?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Absolutely! If you encounter any bugs or technical issues, please report them
                through our contact form or email. We&apos;ll investigate and fix them as quickly as
                possible.
              </p>
            </div>

            <div className="bg-muted/20 rounded-2xl p-6 border-0">
              <h3 className="text-xl font-light text-foreground mb-3">
                Are there plans to add more languages?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes! We&apos;re working on expanding LangLearn to include more languages. Russian
                lessons are planned for the near future, and we&apos;re open to suggestions for
                other languages based on user demand.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
