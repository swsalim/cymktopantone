import type { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { Prose } from '@/components/prose';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Terms and Conditions',
  description:
    'CMYK Pantone operated by Yuurrific. Yuurrific offers CMYK Pantone and related services to you, a user, under the condition that you accept all of our set terms, including these Terms of Service and all related policies.',
  url: '/legal/terms-and-conditions',
};

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: {
    canonical: config.url,
  },
  openGraph: {
    title: config.title,
    description: config.description,
    url: config.url,
    images: [
      {
        url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: config.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: config.title,
    description: config.description,
    card: 'summary_large_image',
    creator: siteConfig.creator,
    images: [
      {
        url: new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/og?title=${config.title}`),
        width: siteConfig.openGraph.width,
        height: siteConfig.openGraph.height,
        alt: config.title,
      },
    ],
  },
};

export default function Page() {
  return (
    <>
      <WebsiteJsonLd
        company={siteConfig.siteName}
        url={absoluteUrl('/legal/terms-and-conditions')}
      />
      <Wrapper className="my-12 md:my-20">
        <Container>
          <Prose>
            <h1>Terms of Service</h1>
            <p>
              Welcome to cymktopantone.com! These Terms of Service govern your use of our website
              and services. By accessing or using our site, you agree to comply with these terms.
            </p>
            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using cymktopantone.com, you agree to these Terms of Service and any
              additional terms and conditions that may apply to specific sections of the site or to
              products and services offered through the site.
            </p>
            <h2>Use of Cookies</h2>
            <p>
              cymktopantone.com uses cookies to enhance your browsing experience and provide
              personalized content. By using our site, you consent to the use of cookies in
              accordance with our{' '}
              <Link
                href="/legal/privacy-policy"
                className="text-violet-600 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-500">
                Privacy Policy
              </Link>
              .
            </p>
            <h2>Intellectual Property</h2>
            <p>
              All content on cymktopantone.com, including text, graphics, logos, images, audio
              clips, digital downloads, and software, is the property of cymktopantone.com or its
              content suppliers and is protected by international copyright laws.
            </p>
            <h2>Limitation of Liability</h2>
            <p>
              cymktopantone.com and its affiliates shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or revenues,
              whether incurred directly or indirectly, or any loss of data, use, goodwill, or other
              intangible losses resulting from (i) your access to or use of or inability to access
              or use the site; (ii) any conduct or content of any third party on the site; or (iii)
              unauthorized access, use, or alteration of your transmissions or content.
            </p>
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to update or modify these Terms of Service at any time without
              prior notice. Any changes will be effective immediately upon posting to this page.
              Your continued use of cymktopantone.com after any such changes constitutes your
              acceptance of the new Terms of Service.
            </p>
          </Prose>
        </Container>
      </Wrapper>
    </>
  );
}
