'use client';

import { useCallback, useEffect, useState } from 'react';

import { Check, Clipboard, Facebook, Share2, Twitter } from 'lucide-react';

import { useToast } from '@/lib/hooks/use-toast';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ShareResultsProps {
  moves: number;
  timeInSeconds: number;
  gameMode: string;
  isWin: boolean;
}

export function ShareResults({ moves, timeInSeconds, gameMode, isWin }: ShareResultsProps) {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareText, setShareText] = useState('');

  // Set mounted state after component mounts
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Define formatTime outside useEffect to avoid stale closures
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // Safely initialize window-dependent values after mount
  useEffect(() => {
    if (!isMounted) return;

    try {
      const origin = window.location.origin;
      let text = '';

      if (isWin) {
        if (gameMode === 'classic') {
          text = `🎮 I matched all Pantone color pairs in ${formatTime(timeInSeconds)} with ${moves} moves in Classic mode! Play Pantone Match Game at ${origin}/pantone-match #PantoneMatchGame`;
        } else if (gameMode === 'challenge') {
          text = `🎮 I completed the Challenge mode in ${formatTime(timeInSeconds)} with ${moves} moves! Can you beat my score? Play Pantone Match Game at ${origin}/pantone-match #PantoneMatchGame`;
        } else {
          text = `🎮 I completed today's Daily Challenge in ${formatTime(timeInSeconds)} with ${moves} moves! Play Pantone Match Game at ${origin}/pantone-match #PantoneMatchGame`;
        }
      } else {
        text = `🎮 I played Pantone Match Game in ${gameMode} mode! Can you beat the challenge? Play at ${origin}/pantone-match #PantoneMatchGame`;
      }

      setShareUrl(origin);
      setShareText(text);
    } catch (error) {
      console.error('Error initializing share text:', error);
    }
  }, [moves, timeInSeconds, gameMode, isWin, formatTime, isMounted]);

  const handleCopyToClipboard = () => {
    if (!isMounted) return;

    try {
      navigator.clipboard.writeText(shareText).then(() => {
        setIsCopied(true);
        toast({
          title: 'Copied to clipboard',
          description: 'Your results are ready to share!',
        });
        setTimeout(() => setIsCopied(false), 2000);
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleTwitterShare = () => {
    if (!isMounted) return;

    try {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error sharing to Twitter:', error);
    }
  };

  const handleFacebookShare = () => {
    if (!isMounted) return;

    try {
      const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl,
      )}&quote=${encodeURIComponent(shareText)}`;
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error sharing to Facebook:', error);
    }
  };

  // Don't render anything during SSR
  if (!isMounted) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-1">
          <Share2 className="h-4 w-4" />
          Share Results
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Share your achievement</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleTwitterShare}>
          <Twitter className="mr-2 h-4 w-4" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleFacebookShare}>
          <Facebook className="mr-2 h-4 w-4" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyToClipboard}>
          {isCopied ? <Check className="mr-2 h-4 w-4" /> : <Clipboard className="mr-2 h-4 w-4" />}
          Copy to Clipboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
