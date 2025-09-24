import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { SEO_CONSTANTS, generateSEOMetadata } from '@/shared/constants/seo';
import type { BreadcrumbItem } from '@/types/navigation';

export const metadata: Metadata = generateSEOMetadata(
  SEO_CONSTANTS.TERMS_TITLE,
  SEO_CONSTANTS.TERMS_DESCRIPTION,
  SEO_CONSTANTS.TERMS_KEYWORDS,
  '/terms',
  SEO_CONSTANTS.ROBOTS_INDEX
);

export default function TermsPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Terms of Service', path: '/terms', isCurrent: true },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbs} />

      <div className="max-w-4xl mx-auto">
        <header className="space-y-4 mb-12">
          <h1 className="text-4xl font-light text-foreground">Terms of Service</h1>
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
            <h2 className="text-2xl font-light text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              By accessing and using LangLearn platform, you accept and agree to be bound by the
              terms and provision of this agreement. If you do not agree to abide by the above,
              please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on LangLearn
              platform for personal, non-commercial transitory viewing only. This is the grant of a
              license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>modify or copy the materials</li>
              <li>use the materials for any commercial purpose or for any public display</li>
              <li>attempt to reverse engineer any software contained on the platform</li>
              <li>remove any copyright or other proprietary notations from the materials</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">3. Educational Content</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LangLearn provides educational content for language learning purposes. All lesson
              materials, vocabulary lists, and educational resources are provided for personal
              learning use only. Users are encouraged to use the content responsibly and in
              accordance with their educational goals.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">4. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              When creating an account on LangLearn, you agree to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>provide accurate and complete information</li>
              <li>maintain the security of your password and account</li>
              <li>accept responsibility for all activities under your account</li>
              <li>notify us immediately of any unauthorized use of your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">5. Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Your privacy is important to us. Please review our Privacy Policy, which also governs
              your use of the platform, to understand our practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">6. Prohibited Uses</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You may not use our platform:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>for any unlawful purpose or to solicit others to perform unlawful acts</li>
              <li>
                to violate any international, federal, provincial, or state regulations, rules,
                laws, or local ordinances
              </li>
              <li>
                to infringe upon or violate our intellectual property rights or the intellectual
                property rights of others
              </li>
              <li>
                to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
                discriminate
              </li>
              <li>to submit false or misleading information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">7. Content Accuracy</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              While we strive to provide accurate and up-to-date educational content, LangLearn does
              not warrant that the materials on the platform are accurate, complete, or current. We
              may make changes to the materials contained on the platform at any time without
              notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              In no event shall LangLearn or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business
              interruption) arising out of the use or inability to use the materials on LangLearn
              platform, even if LangLearn or a LangLearn authorized representative has been notified
              orally or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">9. Revisions and Errata</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The materials appearing on LangLearn platform could include technical, typographical,
              or photographic errors. LangLearn does not warrant that any of the materials on its
              platform are accurate, complete, or current. LangLearn may make changes to the
              materials contained on its platform at any time without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">10. Links</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LangLearn has not reviewed all of the sites linked to our platform and is not
              responsible for the contents of any such linked site. The inclusion of any link does
              not imply endorsement by LangLearn of the site. Use of any such linked website is at
              the user&apos;s own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">
              11. Site Terms of Use Modifications
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              LangLearn may revise these terms of service for its platform at any time without
              notice. By using this platform, you are agreeing to be bound by the then current
              version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">12. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Any claim relating to LangLearn platform shall be governed by the laws of the
              jurisdiction in which LangLearn operates without regard to its conflict of law
              provisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-light text-foreground mb-4">13. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions about these Terms of Service, please contact us through our{' '}
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
