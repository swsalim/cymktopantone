'use client';

import { useEffect, useState } from 'react';

import { saEvent } from '@/lib/analytics';

// import BannerCodefast from '@/components/ads/banner-codefast';
// import BannerFrogDr from '@/components/ads/banner-frogdr';
// import BannerRandomnumber from '@/components/ads/banner-randomnumber';
import BannerUnicorn from '@/components/ads/banner-unicorn';

interface BannerAssignment {
  version: string;
  expiresAt: number; // Unix timestamp in milliseconds
  bannerHistory: string[]; // Track which banners the user has seen
}

export default function RotatingBanner() {
  const [bannerVersion, setBannerVersion] = useState<string | null>(null);

  useEffect(() => {
    // Function to assign a new banner version
    const assignNewBanner = (previousVersions: string[] = []): BannerAssignment => {
      // All possible banner versions
      const allVersions = ['Codefast', 'Frogdr', 'Randomnumber', 'Unicorn'];

      // Filter out recently shown banners if possible
      let availableVersions = allVersions;
      if (previousVersions.length > 0 && previousVersions.length < allVersions.length) {
        availableVersions = allVersions.filter((v) => !previousVersions.includes(v));
      }

      // Choose a random banner from available versions
      const randomIndex = Math.floor(Math.random() * availableVersions.length);
      const version = availableVersions[randomIndex];

      // Add to history, keeping only the most recent banners
      const bannerHistory = [...previousVersions, version].slice(-2); // Keep last 2

      // Set expiration (2 weeks)
      const expiresAt = Date.now() + 14 * 24 * 60 * 60 * 1000;

      return { version, expiresAt, bannerHistory };
    };

    // Check if user has a banner assignment
    const storedAssignment = localStorage.getItem('banner_assignment');
    let assignment: BannerAssignment;

    if (storedAssignment) {
      const parsedAssignment = JSON.parse(storedAssignment) as BannerAssignment;

      if (parsedAssignment.expiresAt > Date.now()) {
        // Assignment is still valid
        assignment = parsedAssignment;
      } else {
        // Assignment expired, create a new one with history awareness
        assignment = assignNewBanner(parsedAssignment.bannerHistory);
        localStorage.setItem('banner_assignment', JSON.stringify(assignment));
      }
    } else {
      // No stored assignment, create a new one
      assignment = assignNewBanner();
      localStorage.setItem('banner_assignment', JSON.stringify(assignment));
    }

    setBannerVersion(assignment.version);
    trackImpression(assignment.version);
  }, []);

  if (!bannerVersion) return null;

  const handleBannerClick = () => {
    if (bannerVersion) {
      trackClick(bannerVersion);
    }
  };

  return (
    <div
      onClick={handleBannerClick}
      className="relative z-50 border border-b-yellow-300 bg-yellow-50">
      <div className="mx-auto max-w-7xl">
        {bannerVersion === 'Codefast' && <BannerUnicorn />}
        {bannerVersion === 'Frogdr' && <BannerUnicorn />}
        {bannerVersion === 'Randomnumber' && <BannerUnicorn />}
        {bannerVersion === 'Unicorn' && <BannerUnicorn />}
      </div>
    </div>
  );
}

function trackImpression(version: string) {
  saEvent(`Banner ${version} impression`);
}

function trackClick(version: string) {
  saEvent(`Banner ${version} click`);
}
