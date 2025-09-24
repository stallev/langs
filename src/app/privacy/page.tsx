import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';
import type { BreadcrumbItem } from '@/types/navigation';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.PRIVACY_TITLE,
  SEO_CONSTANTS.PRIVACY_DESCRIPTION,
  SEO_CONSTANTS.PRIVACY_KEYWORDS,
  '/privacy',
  SEO_CONSTANTS.ROBOTS_INDEX
);

export default function PrivacyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Privacy Policy', path: '/privacy', isCurrent: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
        <header className="space-y-4 mb-12">
          <h1 className="text-4xl font-light text-foreground">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LangLearn (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, disclose,
              and safeguard your information when you use our language learning platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">2. Information We Collect</h2>

            <h3 className="text-xl font-light text-foreground mb-3">2.1 Personal Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Create an account</li>
              <li>Use our language learning services</li>
              <li>Contact us for support</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This information may include your name, email address, and learning preferences.
            </p>

            <h3 className="text-xl font-light text-foreground mb-3">2.2 Usage Information</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We automatically collect certain information about your use of our platform,
              including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Pages visited and time spent on each page</li>
              <li>Learning progress and lesson completion</li>
              <li>Device information and browser type</li>
              <li>IP address and general location data</li>
            </ul>

            <h3 className="text-xl font-light text-foreground mb-3">
              2.3 Cookies and Tracking Technologies
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use cookies and similar tracking technologies to enhance your experience, remember
              your preferences, and analyze how you use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Provide and maintain our language learning services</li>
              <li>Track your learning progress and personalize your experience</li>
              <li>Send you important updates about our platform</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our platform and develop new features</li>
              <li>Analyze usage patterns to enhance user experience</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">
              4. Information Sharing and Disclosure
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third
              parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist us in operating our platform</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">5. Data Security</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We implement appropriate security measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction. However, no
              method of transmission over the internet or electronic storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">6. Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We retain your personal information for as long as necessary to provide our services
              and fulfill the purposes outlined in this Privacy Policy, unless a longer retention
              period is required or permitted by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">7. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have certain rights regarding your personal
              information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict processing of your information</li>
              <li>The right to data portability</li>
              <li>The right to object to processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform is not intended for children under 13 years of age. We do not knowingly
              collect personal information from children under 13. If you are a parent or guardian
              and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">9. Third-Party Services</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform may contain links to third-party websites or services. We are not
              responsible for the privacy practices of these third parties. We encourage you to read
              their privacy policies before providing any personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">
              10. International Data Transfers
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your information may be transferred to and processed in countries other than your own.
              We ensure that such transfers comply with applicable data protection laws and
              implement appropriate safeguards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">
              11. Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes
              by posting the new Privacy Policy on this page and updating the &quot;Last
              updated&quot; date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">12. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please
              contact us through our{' '}
              <a href="/contact" className="text-primary hover:underline">
                contact page
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
