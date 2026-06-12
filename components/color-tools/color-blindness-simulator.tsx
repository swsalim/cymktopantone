'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
  COLOR_BLINDNESS_TYPES,
  ColorBlindnessType,
  simulateColorBlindness,
} from '@/lib/color-blindness';
import { generateHarmony } from '@/lib/palette-harmony';

import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Wrapper } from '@/components/wrapper';

export function ColorBlindnessSimulator() {
  const [seedHex, setSeedHex] = useState('#6D39AC');
  const [type, setType] = useState<ColorBlindnessType>('deuteranopia');
  const colors = generateHarmony(seedHex, 'triadic');

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="mb-8 grid max-w-xl gap-6">
          <div>
            <Label htmlFor="sim-color">Base color</Label>
            <Input
              id="sim-color"
              type="color"
              value={seedHex}
              onChange={(e) => setSeedHex(e.target.value)}
              className="mt-2 h-16 w-full cursor-pointer"
            />
          </div>
          <div>
            <Label>Vision type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ColorBlindnessType)}>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COLOR_BLINDNESS_TYPES.map((t) => (
                  <SelectItem key={t.id} value={t.id}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
              {COLOR_BLINDNESS_TYPES.find((t) => t.id === type)?.description}
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Normal vision
            </h2>
            <div className="flex h-32 overflow-hidden rounded-xl">
              {colors.map((hex, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: hex }} />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {colors.map((hex, i) => (
                <span key={i} className="font-mono text-xs text-gray-600 dark:text-gray-400">
                  {hex}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              Simulated: {COLOR_BLINDNESS_TYPES.find((t) => t.id === type)?.label}
            </h2>
            <div className="flex h-32 overflow-hidden rounded-xl">
              {colors.map((hex, i) => (
                <div
                  key={i}
                  className="flex-1"
                  style={{ backgroundColor: simulateColorBlindness(hex, type) }}
                />
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {colors.map((hex, i) => (
                <span key={i} className="font-mono text-xs text-gray-600 dark:text-gray-400">
                  {simulateColorBlindness(hex, type)}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-400">
          Simulation is approximate. Always pair with the{' '}
          <Link href="/contrast-checker" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
            WCAG contrast checker
          </Link>{' '}
          for production work.
        </p>

        <RelatedColorTools excludeHref="/color-blindness" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
