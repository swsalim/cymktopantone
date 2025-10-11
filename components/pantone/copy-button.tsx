'use client';

import { CopyIcon } from 'lucide-react';

import { useToast } from '@/lib/hooks/use-toast';

import { Button } from '@/components/ui/button';

interface CopyButtonProps {
  value: string;
  label: string;
}

export function CopyButton({ value, label }: CopyButtonProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(value);
    toast({
      title: `${label} Copied to clipboard`,
      description: `Color value ${value} has been copied to your clipboard.`,
    });
  };

  return (
    <Button variant="ghost" size="icon" onClick={copyToClipboard} className="ml-2">
      <CopyIcon className="h-4 w-4" />
    </Button>
  );
}
