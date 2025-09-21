'use client';

import Link from 'next/link';

import { useIsMobile } from '@/lib/hooks/use-mobile';

import { ImageKit } from '@/components/image-kit';

interface SponsoredSlotProps {
  href: string;
}

export default function SponsoredSlot({ href }: SponsoredSlotProps) {
  const isMobile = useIsMobile();
  const imageSrc = isMobile ? 'unicorn-platform-mobile.png' : 'unicorn-platform-desktop.png';
  const width = isMobile ? 350 : 728;
  const height = isMobile ? 350 : 728;

  return (
    <Link href={href}>
      <ImageKit
        directory="cymktopantone/banners"
        src={imageSrc}
        width={width}
        height={height}
        alt="Create your website in 5 minutes ⚡️"
        className="h-full w-full object-cover"
      />
    </Link>
  );
}
