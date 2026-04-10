'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronsUpDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function PantoneLookupSearch({
  items,
  className,
}: {
  items: { slug: string; name: string }[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn('h-11 w-full justify-between font-normal md:max-w-md', className)}>
          Search by Pantone name (e.g. 185 C)…
          <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(100vw-2rem,28rem)] p-0" align="start">
        <Command>
          <CommandInput placeholder="Type a PMS code or name…" />
          <CommandList>
            <CommandEmpty>No swatch found.</CommandEmpty>
            <CommandGroup>
              {items.map(({ slug, name }) => (
                <CommandItem
                  key={slug}
                  value={`${name} ${slug}`}
                  onSelect={() => {
                    router.push(`/pantone/${slug}`);
                    setOpen(false);
                  }}>
                  {name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
