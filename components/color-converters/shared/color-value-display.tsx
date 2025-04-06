'use client';

import { CopyIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ColorValueDisplayProps {
  label: string;
  value: string;
  onCopy: (value: string, label: string) => void;
}

export function ColorValueDisplay({ label, value, onCopy }: ColorValueDisplayProps) {
  return (
    <div className="flex items-center justify-between">
      <p>
        <span className="font-medium">{label}:</span> <b>{value}</b>
      </p>
      <Button variant="ghost" onClick={() => onCopy(value, `${label} value`)}>
        <CopyIcon className="mr-2 h-4 w-4" /> Copy
      </Button>
    </div>
  );
}
