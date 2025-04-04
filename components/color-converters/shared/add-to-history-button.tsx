'use client';

import { useCallback } from 'react';

import { BookmarkIcon } from 'lucide-react';

import { useToast } from '@/lib/hooks/use-toast';

import { Button } from '@/components/ui/button';

interface AddToHistoryButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function AddToHistoryButton({ onClick, disabled }: AddToHistoryButtonProps) {
  const { toast } = useToast();

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // Call onClick function passed from parent
      onClick();

      // Show toast notification
      toast({
        description: 'Color added to history',
        duration: 2000,
      });
    },
    [onClick, toast],
  );

  return (
    <Button
      variant="outline"
      size="sm"
      className="mt-2"
      onClick={handleClick}
      type="button"
      disabled={disabled}>
      <BookmarkIcon className="mr-2 h-4 w-4" />
      Add to History
    </Button>
  );
}
