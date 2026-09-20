import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import { LogoDefs } from '@/components/Logo';
import { site } from '@/data/site';

const title = 'DS SkillLabs | Data Science, Data Analytics, Data Engineering & Full Stack Training';
const description =
  'DS SkillLabs provides practical training in Data Analytics, Data Science, Data Engineering, Full Stack Development, AI and Cloud technologies.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s | DS SkillLabs' },
  description,
  openGraph: { type: 'website', siteName: site.name, title: 'DS SkillLabs | Learn • Build • Grow', description },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#06102A', colorScheme: 'dark' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: site.name,
  slogan: site.tagline,
  description,
  url: site.url,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="font-sans text-[16.5px] leading-relaxed sm:text-[17px]">
        <LogoDefs />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-brand-blue focus:px-4 focus:py-2">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
