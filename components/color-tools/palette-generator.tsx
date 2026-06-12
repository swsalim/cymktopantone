'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { RefreshCw } from 'lucide-react';

import {
  HARMONY_SCHEMES,
  HarmonyScheme,
  generateHarmony,
  paletteToCssVariables,
  paletteToJson,
  paletteToTailwind,
  randomizeUnlockedColors,
} from '@/lib/palette-harmony';

import { CopyButton } from '@/components/color-tools/copy-button';
import { PaletteSwatch } from '@/components/color-tools/palette-swatch';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
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

interface PaletteGeneratorProps {
  initialColor?: string;
  initialScheme?: HarmonyScheme;
  showSchemePicker?: boolean;
}

export function PaletteGenerator({
  initialColor = '#6D39AC',
  initialScheme = 'triadic',
  showSchemePicker = true,
}: PaletteGeneratorProps) {
  const [seedHex, setSeedHex] = useState(initialColor);
  const [scheme, setScheme] = useState<HarmonyScheme>(initialScheme);
  const [colors, setColors] = useState<string[]>(() => generateHarmony(initialColor, initialScheme));
  const [locked, setLocked] = useState<boolean[]>(() => generateHarmony(initialColor, initialScheme).map(() => false));
  const [exportFormat, setExportFormat] = useState<'css' | 'tailwind' | 'json'>('css');

  const regenerate = () => {
    const next = randomizeUnlockedColors(seedHex, scheme, locked, colors);
    setColors(next);
    if (typeof window !== 'undefined' && window.seline?.track) {
      window.seline.track('palette_generate', { scheme });
    }
  };

  const handleSchemeChange = (s: HarmonyScheme) => {
    setScheme(s);
    const next = generateHarmony(seedHex, s);
    setColors(next);
    setLocked(next.map(() => false));
  };

  const handleSeedChange = (h: string) => {
    setSeedHex(h);
    const next = generateHarmony(h, scheme);
    setColors(next);
    setLocked(next.map(() => false));
  };

  const toggleLock = (index: number) => {
    setLocked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const exportText =
    exportFormat === 'css'
      ? `:root {\n${paletteToCssVariables(colors)}\n}`
      : exportFormat === 'tailwind'
        ? paletteToTailwind(colors)
        : paletteToJson(colors);

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/palettes?color=${seedHex.replace('#', '')}&scheme=${scheme}`
      : `/palettes?color=${seedHex.replace('#', '')}&scheme=${scheme}`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const color = params.get('color');
    const schemeParam = params.get('scheme') as HarmonyScheme | null;
    if (color) {
      const h = color.startsWith('#') ? color : `#${color}`;
      const s = schemeParam && HARMONY_SCHEMES.some((x) => x.id === schemeParam) ? schemeParam : scheme;
      setSeedHex(h);
      setScheme(s);
      const next = generateHarmony(h, s);
      setColors(next);
      setLocked(next.map(() => false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- hydrate once from URL on mount
  }, []);

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <div className="space-y-6">
            <div>
              <Label htmlFor="seed-color">Seed color</Label>
              <Input
                id="seed-color"
                type="color"
                value={seedHex}
                onChange={(e) => handleSeedChange(e.target.value)}
                className="mt-2 h-16 w-full cursor-pointer"
              />
              <Input
                type="text"
                value={seedHex}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#?[0-9A-Fa-f]{3,6}$/.test(v)) {
                    handleSeedChange(v.startsWith('#') ? v : `#${v}`);
                  }
                }}
                className="mt-2 font-mono"
                placeholder="#6D39AC"
              />
            </div>

            {showSchemePicker && (
              <div>
                <Label>Harmony rule</Label>
                <Select value={scheme} onValueChange={(v) => handleSchemeChange(v as HarmonyScheme)}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {HARMONY_SCHEMES.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  {HARMONY_SCHEMES.find((s) => s.id === scheme)?.description}
                </p>
              </div>
            )}

            <Button type="button" onClick={regenerate} className="w-full gap-2">
              <RefreshCw className="size-4" />
              Regenerate unlocked
            </Button>

            <div className="flex flex-wrap gap-2">
              <Link href={`/gradients?colors=${colors.map((c) => c.replace('#', '')).join(',')}`}>
                <Button type="button" variant="outline" size="sm">
                  Open in Gradient →
                </Button>
              </Link>
              <Link href={`/contrast-checker?colors=${colors.map((c) => c.replace('#', '')).join(',')}`}>
                <Button type="button" variant="outline" size="sm">
                  Check contrast →
                </Button>
              </Link>
            </div>
          </div>

          <div>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {colors.map((hex, i) => (
                <PaletteSwatch
                  key={`${i}-${hex}`}
                  hex={hex}
                  index={i}
                  locked={locked[i]}
                  onToggleLock={() => toggleLock(i)}
                />
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-violet-200/70 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/80">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <Label>Export palette</Label>
                <Select
                  value={exportFormat}
                  onValueChange={(v) => setExportFormat(v as typeof exportFormat)}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="css">CSS variables</SelectItem>
                    <SelectItem value="tailwind">Tailwind config</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <pre className="max-h-48 overflow-auto rounded-lg bg-gray-950 p-3 text-xs text-gray-100">
                {exportText}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton
                  text={exportText}
                  label="Copy export"
                  onCopy={() => {
                    if (typeof window !== 'undefined' && window.seline?.track) {
                      window.seline.track('palette_copy', { format: exportFormat });
                    }
                  }}
                />
                <CopyButton text={shareUrl} label="Copy share link" />
              </div>
            </div>
          </div>
        </div>

        <RelatedColorTools excludeHref="/palettes" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
