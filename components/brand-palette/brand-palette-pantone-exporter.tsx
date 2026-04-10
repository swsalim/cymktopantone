'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Info, Loader2 } from 'lucide-react';

import { parseColorsQueryParam, parseHexPaletteInput } from '@/lib/brand-palette';
import { findMatchingPMSColors, hexToRgb, rgbToCmyk } from '@/lib/colors';
import type { CMYK, RGB } from '@/types';
import { useToast } from '@/lib/hooks/use-toast';
import { pantoneNameToSlug } from '@/lib/pantone-lookup';
import { absoluteUrl } from '@/lib/utils';

import { Container } from '@/components/container';
import RelatedTools from '@/components/related-tools';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Wrapper } from '@/components/wrapper';

const MAX_COLORS = 6;
const DISTANCES = ['10', '15', '20', '25', '30'] as const;

export type PaletteRow = {
  inputHex: string;
  rgb: RGB;
  cmyk: CMYK;
  pantone: string;
  pantoneHex: string;
  matchPercentage: number;
};

async function closestPantone(hex6: string, distance: number) {
  let matches = await findMatchingPMSColors(hex6, distance);
  if (matches.length === 0) {
    matches = await findMatchingPMSColors(hex6, 80);
  }
  return matches[0] ?? null;
}

async function computePaletteRows(hexList: string[], dist: number): Promise<PaletteRow[]> {
  const next: PaletteRow[] = [];
  for (const hex6 of hexList) {
    const match = await closestPantone(hex6, dist);
    if (!match) continue;
    const rgb = hexToRgb(`#${hex6}`);
    const cmyk = rgbToCmyk(rgb);
    next.push({
      inputHex: hex6,
      rgb,
      cmyk,
      pantone: match.pantone,
      pantoneHex: match.hex,
      matchPercentage: match.matchPercentage,
    });
  }
  return next;
}

function toCsv(rows: PaletteRow[]): string {
  const header =
    'Input HEX,RGB R,RGB G,RGB B,CMYK C,CMYK M,CMYK Y,CMYK K,Closest Pantone,Pantone HEX,Match %';
  const lines = rows.map((r) => {
    const ih = `#${r.inputHex}`;
    const ph = `#${r.pantoneHex}`;
    return [
      ih,
      r.rgb.r,
      r.rgb.g,
      r.rgb.b,
      r.cmyk.c,
      r.cmyk.m,
      r.cmyk.y,
      r.cmyk.k,
      r.pantone,
      ph,
      r.matchPercentage,
    ].join(',');
  });
  return [header, ...lines].join('\n');
}

function toMarkdown(rows: PaletteRow[]): string {
  const header =
    '| Input HEX | RGB | CMYK | Closest Pantone | PMS HEX | Match % |\n| --- | --- | --- | --- | --- | --- |';
  const body = rows
    .map((r) => {
      const rgb = `${r.rgb.r}, ${r.rgb.g}, ${r.rgb.b}`;
      const cmyk = `${r.cmyk.c}%, ${r.cmyk.m}%, ${r.cmyk.y}%, ${r.cmyk.k}%`;
      return `| #${r.inputHex} | ${rgb} | ${cmyk} | ${r.pantone} | #${r.pantoneHex} | ${r.matchPercentage}% |`;
    })
    .join('\n');
  return `${header}\n${body}`;
}

export function BrandPalettePantoneExporter({
  initialColorsParam,
}: {
  initialColorsParam?: string;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [inputText, setInputText] = useState('#DA291C\n#001489\n#00A550');
  const [distance, setDistance] = useState<string>('15');
  const [rows, setRows] = useState<PaletteRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [trimNote, setTrimNote] = useState<string | null>(null);

  const syncUrl = useCallback(
    (hexList: string[]) => {
      const qs = hexList.join(',');
      router.replace(`/brand-palette-to-pantone?colors=${encodeURIComponent(qs)}`, {
        scroll: false,
      });
    },
    [router],
  );

  useEffect(() => {
    if (!initialColorsParam?.trim()) return;
    const fromUrl = parseColorsQueryParam(initialColorsParam);
    if (fromUrl.length === 0) return;

    const hexList = fromUrl.slice(0, MAX_COLORS);
    setInputText(hexList.map((h) => `#${h}`).join('\n'));
    if (fromUrl.length > MAX_COLORS) {
      setTrimNote(`Showing the first ${MAX_COLORS} colors from the link.`);
    } else {
      setTrimNote(null);
    }

    let cancelled = false;
    void (async () => {
      setLoading(true);
      try {
        // Use default match sensitivity on first load from a share link; click "Build table" to
        // re-run with a different threshold.
        const next = await computePaletteRows(hexList, Number(distance));
        if (cancelled) return;
        setRows(next);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Intentionally omit `distance`: shared URLs only re-hydrate when the query string changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps -- see comment
  }, [initialColorsParam]);

  const handleBuild = async () => {
    const parsed = parseHexPaletteInput(inputText);
    if (parsed.length === 0) {
      toast({
        title: 'No valid colors',
        description: 'Add at least one HEX value (with or without #).',
        variant: 'destructive',
      });
      return;
    }
    const list = parsed.slice(0, MAX_COLORS);
    if (parsed.length > MAX_COLORS) {
      setTrimNote(`Using the first ${MAX_COLORS} unique colors.`);
    } else {
      setTrimNote(null);
    }

    setLoading(true);
    try {
      const next = await computePaletteRows(list, Number(distance));
      setRows(next);
      if (next.length > 0) {
        syncUrl(list);
      }
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = useMemo(() => {
    if (rows.length === 0) return '';
    const qs = rows.map((r) => r.inputHex).join(',');
    return `${absoluteUrl('/brand-palette-to-pantone')}?colors=${encodeURIComponent(qs)}`;
  }, [rows]);

  const csv = useMemo(() => (rows.length ? toCsv(rows) : ''), [rows]);
  const markdown = useMemo(() => (rows.length ? toMarkdown(rows) : ''), [rows]);

  const copyText = (text: string, label: string) => {
    void navigator.clipboard.writeText(text).then(() => {
      toast({ description: `${label} copied.` });
    });
  };

  return (
    <Wrapper className="pb-12 md:pb-20">
      <Container className="space-y-8">
        <Card>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="palette-hex">Brand colors (HEX)</Label>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Paste up to {MAX_COLORS} colors—one per line, or separated by commas. We match each
                to the closest Pantone using the same engine as our HEX to Pantone converter.
              </p>
              <textarea
                id="palette-hex"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={6}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950"
                placeholder={'#FF0000\n#00FF00\n#0000FF'}
                spellCheck={false}
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="match-distance">Match sensitivity</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger type="button" aria-label="About match sensitivity">
                        <Info className="size-4 text-gray-500" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs p-4 text-sm">
                        Lower values only list very close Pantone neighbors (stricter). If a row
                        would be empty, we automatically widen the search so you always get a closest
                        match.
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select value={distance} onValueChange={setDistance}>
                  <SelectTrigger id="match-distance" className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DISTANCES.map((d) => (
                      <SelectItem key={d} value={d}>
                        Delta E threshold {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="max-w-md text-xs text-gray-500 dark:text-gray-400">
                  Shared links open with the default threshold. Change it here, then click &quot;Build
                  table&quot; to recalculate every row.
                </p>
              </div>

              <Button type="button" onClick={() => void handleBuild()} disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 size-4 animate-spin" />
                    Building…
                  </>
                ) : (
                  'Build table'
                )}
              </Button>
            </div>

            {trimNote ? (
              <p className="text-sm text-amber-800 dark:text-amber-200">{trimNote}</p>
            ) : null}
          </CardContent>
        </Card>

        {rows.length > 0 ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button type="button" variant="secondary" onClick={() => copyText(csv, 'CSV')}>
                Copy CSV
              </Button>
              <Button type="button" variant="secondary" onClick={() => copyText(markdown, 'Markdown')}>
                Copy Markdown
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => shareUrl && copyText(shareUrl, 'Share link')}
                disabled={!shareUrl}>
                Copy share link
              </Button>
            </div>

            <div className="overflow-hidden rounded-lg border dark:border-gray-700">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-14"> </TableHead>
                    <TableHead>Input</TableHead>
                    <TableHead>RGB</TableHead>
                    <TableHead>CMYK</TableHead>
                    <TableHead>Closest Pantone</TableHead>
                    <TableHead>PMS HEX</TableHead>
                    <TableHead className="text-right">Match</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.map((r) => (
                    <TableRow key={r.inputHex}>
                      <TableCell className="w-14 p-2">
                        <div
                          className="size-10 rounded-md border border-gray-200 dark:border-gray-600"
                          style={{ backgroundColor: `#${r.inputHex}` }}
                          title={`#${r.inputHex}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-sm">#{r.inputHex}</TableCell>
                      <TableCell className="text-sm">
                        {r.rgb.r}, {r.rgb.g}, {r.rgb.b}
                      </TableCell>
                      <TableCell className="text-sm tabular-nums">
                        {r.cmyk.c}% {r.cmyk.m}% {r.cmyk.y}% {r.cmyk.k}%
                      </TableCell>
                      <TableCell>
                        <Link
                          href={`/pantone/${pantoneNameToSlug(r.pantone)}`}
                          className="text-violet-600 underline-offset-2 hover:underline dark:text-violet-400">
                          {r.pantone}
                        </Link>
                      </TableCell>
                      <TableCell className="font-mono text-sm">#{r.pantoneHex}</TableCell>
                      <TableCell className="text-right tabular-nums">{r.matchPercentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              CMYK values are a process approximation from your screen HEX, not a Pantone ink recipe.
              For production, use a physical swatch book and your print vendor&apos;s profiles.
            </p>
          </div>
        ) : null}
      </Container>

      <Container className="not-prose">
        <RelatedTools />
      </Container>
    </Wrapper>
  );
}
