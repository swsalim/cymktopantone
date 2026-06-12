'use client';

import { useCallback, useEffect, useState } from 'react';

import Link from 'next/link';
import { Plus, Trash2 } from 'lucide-react';

import {
  GRADIENT_PRESETS,
  GradientStop,
  GradientType,
  buildFullCssProperty,
  buildGradientCss,
  parsePaletteFromQuery,
} from '@/lib/gradient';

import { CopyButton } from '@/components/color-tools/copy-button';
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
import { Slider } from '@/components/ui/slider';
import { Wrapper } from '@/components/wrapper';

interface GradientGeneratorProps {
  initialType?: GradientType;
  initialColors?: string[] | null;
}

const DEFAULT_STOPS: GradientStop[] = [
  { color: '#5B21B6', position: 0 },
  { color: '#7C3AED', position: 50 },
  { color: '#C4B5FD', position: 100 },
];

export function GradientGenerator({
  initialType = 'linear',
  initialColors = null,
}: GradientGeneratorProps) {
  const [type, setType] = useState<GradientType>(initialType);
  const [angle, setAngle] = useState(90);
  const [stops, setStops] = useState<GradientStop[]>(() => {
    if (initialColors && initialColors.length >= 2) {
      const step = 100 / (initialColors.length - 1);
      return initialColors.map((color, i) => ({
        color: color.startsWith('#') ? color : `#${color}`,
        position: Math.round(i * step),
      }));
    }
    return DEFAULT_STOPS;
  });
  const [mode, setMode] = useState<'two' | 'three'>('two');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parsed = parsePaletteFromQuery(params.get('colors'));
    if (parsed && parsed.length >= 2) {
      const step = 100 / (parsed.length - 1);
      setStops(
        parsed.map((color, i) => ({
          color,
          position: Math.round(i * step),
        })),
      );
    }
  }, []);

  const gradientCss = buildGradientCss(type, stops, angle);
  const fullCss = buildFullCssProperty(type, stops, angle);

  const updateStop = (index: number, patch: Partial<GradientStop>) => {
    setStops((prev) => prev.map((s, i) => (i === index ? { ...s, ...patch } : s)));
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    setStops((prev) => [...prev, { color: '#FFFFFF', position: 50 }]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const applyPreset = (id: string) => {
    const preset = GRADIENT_PRESETS.find((p) => p.id === id);
    if (!preset) return;
    setType(preset.type);
    setAngle(preset.angle);
    setStops(preset.stops);
    setMode(preset.stops.length >= 3 ? 'three' : 'two');
  };

  const setThreeColorMode = useCallback(() => {
    setMode('three');
    if (stops.length < 3) {
      setStops([
        stops[0] ?? { color: '#5B21B6', position: 0 },
        { color: '#7C3AED', position: 50 },
        stops[1] ?? { color: '#C4B5FD', position: 100 },
      ]);
    }
  }, [stops]);

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-2">
              <Button
                type="button"
                variant={mode === 'two' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setMode('two')}>
                2 colors
              </Button>
              <Button
                type="button"
                variant={mode === 'three' ? 'default' : 'outline'}
                size="sm"
                onClick={setThreeColorMode}>
                3 colors
              </Button>
            </div>

            <div>
              <Label>Gradient type</Label>
              <Select value={type} onValueChange={(v) => setType(v as GradientType)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="linear">Linear</SelectItem>
                  <SelectItem value="radial">Radial</SelectItem>
                  <SelectItem value="conic">Conic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(type === 'linear' || type === 'conic') && (
              <div>
                <Label>Angle: {angle}°</Label>
                <Slider
                  className="mt-3"
                  min={0}
                  max={360}
                  step={1}
                  value={[angle]}
                  onValueChange={([v]) => setAngle(v)}
                />
              </div>
            )}

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Color stops</Label>
                <Button type="button" variant="outline" size="sm" onClick={addStop} disabled={stops.length >= 5}>
                  <Plus className="mr-1 size-3.5" />
                  Add stop
                </Button>
              </div>
              {stops.slice(0, mode === 'three' ? 3 : stops.length).map((stop, i) => (
                <div key={i} className="flex items-center gap-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
                  <Input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateStop(i, { color: e.target.value })}
                    className="h-10 w-14 cursor-pointer p-1"
                  />
                  <div className="flex-1">
                    <Label className="text-xs">Position: {stop.position}%</Label>
                    <Slider
                      min={0}
                      max={100}
                      step={1}
                      value={[stop.position]}
                      onValueChange={([v]) => updateStop(i, { position: v })}
                    />
                  </div>
                  {stops.length > 2 && (
                    <Button type="button" variant="ghost" size="icon" onClick={() => removeStop(i)}>
                      <Trash2 className="size-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Label>Presets</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {GRADIENT_PRESETS.map((p) => (
                  <Button key={p.id} type="button" variant="outline" size="sm" onClick={() => applyPreset(p.id)}>
                    {p.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div
              className="h-64 w-full rounded-2xl border border-violet-200/70 shadow-inner md:h-80"
              style={{ background: gradientCss }}
            />

            <div className="rounded-xl border border-violet-200/70 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/80">
              <Label>CSS</Label>
              <pre className="mt-2 max-h-32 overflow-auto rounded-lg bg-gray-950 p-3 text-xs text-gray-100">
                {fullCss}
              </pre>
              <div className="mt-3 flex flex-wrap gap-2">
                <CopyButton
                  text={fullCss}
                  label="Copy CSS"
                  onCopy={() => {
                    if (typeof window !== 'undefined' && window.seline?.track) {
                      window.seline.track('gradient_copy_css', { type });
                    }
                  }}
                />
                <CopyButton text={gradientCss} label="Copy value only" />
              </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400">
              Import colors from the{' '}
              <Link href="/palettes" className="font-medium text-violet-600 hover:underline dark:text-violet-400">
                palette generator
              </Link>
              . Bright RGB gradients may shift in CMYK print — verify before production.
            </p>
          </div>
        </div>

        <RelatedColorTools excludeHref="/gradients" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
