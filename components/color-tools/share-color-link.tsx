'use client';

import { useState } from 'react';

import { Check, Share2 } from 'lucide-react';

import { encodeColorSearch, type ColorChannels, type ColorMode } from '@/lib/color-query';

import { Button } from '@/components/ui/button';

export function ShareColorLink({
  mode,
  channels,
}: {
  mode: ColorMode;
  channels: ColorChannels;
}) {
  const [copied, setCopied] = useState(false);
  const query = encodeColorSearch(mode, channels);

  const share = async () => {
    if (!query || typeof window === 'undefined') return;
    const url = `${window.location.origin}${window.location.pathname}?${query}`;
    const payload = { title: 'Color Mapper', text: 'A screen color on Color Mapper', url };
    if (typeof navigator.share === 'function') {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return;
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="min-h-11"
      onClick={share}
      disabled={!query}
      aria-live="polite">
      {copied ? <Check className="size-4" /> : <Share2 className="size-4" />}
      {copied ? 'Link copied' : 'Share'}
    </Button>
  );
}
