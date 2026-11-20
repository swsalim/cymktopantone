'use client';

import { rgbToHex } from '@/lib/colors';
import {
  COLOR_CHANNELS,
  COLOR_PRESETS,
  type ColorChannels,
  type ColorMode,
  channelsFromHex,
  hexFromChannels,
  normalizeHex,
} from '@/lib/color-query';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export function ColorInputControls({
  idPrefix,
  mode,
  channels,
  onChannelsChange,
}: {
  idPrefix: string;
  mode: ColorMode;
  channels: ColorChannels;
  onChannelsChange: (next: ColorChannels) => void;
}) {
  const spec = COLOR_CHANNELS[mode];
  const parsedHex = hexFromChannels(mode, channels);
  const pickerHex = (parsedHex ?? '#000000').toLowerCase();

  const setChannel = (key: string, value: string) => {
    onChannelsChange({ ...channels, [key]: value });
  };

  const applyHex = (value: string) => {
    const normalized = normalizeHex(value);
    if (!normalized) return;
    const filled = channelsFromHex(mode, normalized);
    if (filled) onChannelsChange(filled);
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${idPrefix}-picker`}>Color picker</Label>
        <Input
          id={`${idPrefix}-picker`}
          type="color"
          value={pickerHex}
          aria-label="Color picker"
          onChange={(event) => applyHex(event.target.value)}
          className="mt-1 h-12 min-h-11 w-full cursor-pointer p-1"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {spec.map((channel) => {
          const value = channels[channel.key] ?? '';
          const numeric = /^\d+$/.test(value) ? Number(value) : 0;
          const inputId = `${idPrefix}-${channel.key}`;
          return (
            <div key={channel.key}>
              <Label htmlFor={inputId}>{channel.label}</Label>
              <Input
                id={inputId}
                value={value}
                onChange={(event) => setChannel(channel.key, event.target.value)}
                className="mt-1 min-h-11 font-mono"
                inputMode={channel.key === 'hex' ? 'text' : 'numeric'}
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
                aria-invalid={parsedHex === null && value.trim() !== '' ? true : undefined}
              />
              {channel.slider ? (
                <Slider
                  touch
                  className="mt-3 min-h-11"
                  value={[Math.min(channel.max, Math.max(0, numeric))]}
                  max={channel.max}
                  step={1}
                  color={channel.sliderColor}
                  aria-label={channel.label}
                  aria-valuetext={`${channel.label} ${value || '0'}`}
                  onValueChange={([next]) => setChannel(channel.key, String(next))}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      {mode === 'hex' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {COLOR_CHANNELS.rgb.map((channel) => {
            const rgb = channelsFromHex('rgb', pickerHex);
            const numeric = Number(rgb?.[channel.key] ?? 0);
            return (
              <div key={channel.key}>
                <Label htmlFor={`${idPrefix}-rgb-${channel.key}`}>{channel.label}</Label>
                <Slider
                  touch
                  id={`${idPrefix}-rgb-${channel.key}`}
                  className="mt-3 min-h-11"
                  value={[numeric]}
                  max={255}
                  step={1}
                  color={channel.sliderColor}
                  aria-label={channel.label}
                  aria-valuetext={`${channel.label} ${numeric}`}
                  onValueChange={([next]) => {
                    const current = channelsFromHex('rgb', pickerHex) ?? { r: '0', g: '0', b: '0' };
                    const updated = { ...current, [channel.key]: String(next) };
                    applyHex(
                      rgbToHex({
                        r: Number(updated.r),
                        g: Number(updated.g),
                        b: Number(updated.b),
                      }),
                    );
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : null}
      <div>
        <p id={`${idPrefix}-presets`} className="mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          Preset swatches
        </p>
        <div className="flex flex-wrap gap-2" role="group" aria-labelledby={`${idPrefix}-presets`}>
          {COLOR_PRESETS.map((preset) => {
            const selected = parsedHex === preset.hex;
            return (
              <button
                key={preset.hex}
                type="button"
                aria-label={`Use ${preset.name}, ${preset.hex}`}
                aria-pressed={selected}
                onClick={() => applyHex(preset.hex)}
                className="inline-flex min-h-11 min-w-11 items-center gap-2 rounded-full border border-gray-200 bg-white px-2 py-1 text-sm text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:ring-offset-gray-950">
                <span
                  className="inline-block size-6 rounded-full border border-black/10"
                  style={{ backgroundColor: preset.hex }}
                  aria-hidden="true"
                />
                {preset.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
