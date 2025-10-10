'use client';

import { useIsMobile } from '@/lib/hooks/use-mobile';

import { ImageKit } from '@/components/image-kit';

export default function SponsoredSlot() {
  const isMobile = useIsMobile();
  const imageSrc = 'pantone-color-book.png';
  const width = isMobile ? 350 : 728;
  const height = isMobile ? 350 : 728;

  return (
    <a href="https://amzn.id/pantone" target="_blank" rel="noopener noreferrer">
      <ImageKit
        directory="cymktopantone/banners"
        src={imageSrc}
        width={width}
        height={height}
        alt="Create your website in 5 minutes ⚡️"
        className="h-full w-full object-cover"
      />
    </a>
  );
}
