import type { Metadata } from 'next';

import { siteConfig } from '@/config/site';

import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import { Prose } from '@/components/prose';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Privacy Policy',
  description:
    'At Flip Image, your privacy and the protection of your data is our top priority. All data collected, both personal and non-personal, is protected with the highest global standards.',
  url: '/legal/privacy-policy',
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
      <WebsiteJsonLd company={siteConfig.siteName} url={absoluteUrl('/legal/privacy-policy')} />
      <Wrapper className="my-12 md:my-20">
        <Container>
          <Prose>
            <h1>Privacy Policy</h1>
            <p>
              At flipanimage.xyz, we are committed to protecting your privacy. This Privacy Policy
              outlines how we collect, use, and disclose information when you use our website.
            </p>
            <h2>Information We Collect</h2>
            <p>
              We may collect various types of information from you, including but not limited to:
            </p>
            <ul>
              <li>
                Personal information such as your name, email address, and contact details, which
                you provide voluntarily when contacting us or signing up for our services.
              </li>
              <li>
                Usage information, including your IP address, browser type, device type, and
                interactions with our website, collected through cookies and similar technologies.
              </li>
            </ul>
            <h2>How We Use Your Information</h2>
            <p>
              We may use the information we collect for various purposes, including but not limited
              to:
            </p>
            <ul>
              <li>Providing and improving our services</li>
              <li>Communicating with you</li>
              <li>Personalizing your experienc</li>
              <li>Analyzing usage trends and preferences</li>
            </ul>
            <h2>Information Sharing and Disclosure</h2>
            <p>
              We may share your information with third-party service providers who assist us in
              operating our website and providing our services. We may also disclose information in
              response to legal requests or to protect our rights.
            </p>
            <h2>Third-Party Services</h2>
            <p>
              Our website may contain links to third-party websites or services that are not
              operated by us. We have no control over, and assume no responsibility for, the
              content, privacy policies, or practices of any third-party sites or services.
            </p>
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We reserve the right to update or modify this Privacy Policy at any time. Any changes
              will be effective immediately upon posting to this page.
            </p>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at{' '}
              <a
                href="mailto:support@flipanimage.xyz"
                target="_blank"
                className="text-violet-600 hover:text-violet-600 dark:text-violet-400 dark:hover:text-violet-500">
                support@flipanimage.xyz
              </a>
              .
            </p>

            <p>Thank you for using flipanimage.xyz!</p>

            <p>All uploaded data is deleted instantly. We save no images</p>
          </Prose>
        </Container>
      </Wrapper>
    </>
  );
}
