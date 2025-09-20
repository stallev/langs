'use client';

import Link from 'next/link';
import { FOOTER, NAVIGATION } from '@/shared/constants/navigation';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link href={NAVIGATION.HOME.PATH} className="flex items-center space-x-2">
              <span className="font-bold text-xl">LangLearn</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              An interactive platform for learning languages through thematic texts. Focus on the
              most common words and practical usage.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={NAVIGATION.LESSONS.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {NAVIGATION.LESSONS.LABEL}
                </Link>
              </li>
              <li>
                <Link
                  href={NAVIGATION.VOCABULARY.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {NAVIGATION.VOCABULARY.LABEL}
                </Link>
              </li>
              <li>
                <Link
                  href={NAVIGATION.PRACTICE.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {NAVIGATION.PRACTICE.LABEL}
                </Link>
              </li>
              <li>
                <Link
                  href={NAVIGATION.ABOUT.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {NAVIGATION.ABOUT.LABEL}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href={FOOTER.LINKS.PRIVACY.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {FOOTER.LINKS.PRIVACY.LABEL}
                </Link>
              </li>
              <li>
                <Link
                  href={FOOTER.LINKS.TERMS.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {FOOTER.LINKS.TERMS.LABEL}
                </Link>
              </li>
              <li>
                <Link
                  href={FOOTER.LINKS.CONTACT.PATH}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  {FOOTER.LINKS.CONTACT.LABEL}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground text-center">{FOOTER.COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
