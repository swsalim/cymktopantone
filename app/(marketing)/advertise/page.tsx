import { Metadata } from 'next';
import Link from 'next/link';

import { siteConfig } from '@/config/site';

import { cn } from '@/lib/utils';

import { Container } from '@/components/container';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Wrapper } from '@/components/wrapper';

const config = {
  title: 'Advertise with us',
  description: 'Advertise with us',
  url: '/advertise',
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

export default function AdvertisePage() {
  const sponsorSlots = [
    {
      slot: '1st Slot',
      monthlyPrice: '$25',
      available: 'Available',
    },
    {
      slot: '2nd Slot',
      monthlyPrice: '$50',
      available: 'Available',
    },
    {
      slot: '3rd Slot',
      monthlyPrice: '$75',
      available: 'Available',
    },
  ];
  return (
    <Wrapper>
      <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
        <h1>Promote Your Brand to Designers Worldwide</h1>

        <p>
          Reach thousands of creative professionals with a highly visible sponsor slot featured on
          every page of CMYKtoPantone.com.
        </p>
        <p>
          With over 11,000 views each month from the US, Russia, and the UK, your sponsorship will
          put your brand in front of design decision-makers searching for color conversion and
          creative solutions.
        </p>

        <p>
          Visit our{' '}
          <a
            href="https://app.seline.com/share/www.cmyktopantone.com"
            target="_blank"
            rel="noopener noreferrer">
            analytics dashboard
          </a>{' '}
          powered by{' '}
          <a href="https://go.yuurrific.com/seline" target="_blank" rel="noopener noreferrer">
            Seline
          </a>
          .
        </p>

        <h2>Why Sponsor?</h2>
        <ul>
          <li>
            <strong>Prime Placement</strong>: Your banner or message appears on all active pages,
            maximizing impressions and engagement.
          </li>

          <li>
            <strong>Global Reach</strong>: Engage an international audience—most visitors are from
            the US, Russia, UK, Europe, and Asia.
          </li>

          <li>
            <strong>High Desktop/Laptop Usage</strong>: 93% of traffic comes from desktop or laptop,
            perfect for B2B and design-focused brands.
          </li>
        </ul>

        <h2>Sponsor Slots & Pricing</h2>

        <Table>
          <TableCaption>Sponsor Slots & Pricing</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Slot</TableHead>
              <TableHead>Monthly Price</TableHead>
              <TableHead>Available</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sponsorSlots.map((sponsorSlot) => (
              <TableRow key={sponsorSlot.slot}>
                <TableCell className="font-medium">{sponsorSlot.slot}</TableCell>
                <TableCell>{sponsorSlot.monthlyPrice}</TableCell>
                <TableCell>{sponsorSlot.available}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <p>
          First come, first served! Each slot gets premium placement and rotates in order of value.
          Non-intrusive, visually prominent, and seen by every visitor.
        </p>

        <h2>How It Works</h2>
        <ul>
          <li>Choose your slot and complete booking.</li>
          <li>Submit your sponsored message/banner.</li>
          <li>Your brand goes live on CMYKtoPantone.com, visible on every page for 30 days.</li>
        </ul>

        <h2>Audience Snapshot</h2>
        <ul>
          <li>Total monthly views: 11,000+</li>
          <li>Top countries: Russia, US, UK, Germany</li>
          <li>Main traffic sources: Bing, Direct, Yandex</li>
          <li>Visitors: creative professionals, marketers, designers</li>
        </ul>

        <h2>Ready to Grow Your Brand?</h2>
        <p>
          Reserve your slot below. Sponsorship is billed monthly, cancel anytime. Premium slots move
          fastest!
        </p>

        <a
          href="https://x.com/swsalim"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: 'default' }), 'no-underline')}>
          Reserve Your Slot Now
        </a>

        <p>
          Boost your brand with a direct line to creative professionals—secure your sponsor space
          before they’re gone!
        </p>
      </Container>
    </Wrapper>
  );
}
