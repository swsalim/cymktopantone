'use client';

import { useRef, useState } from 'react';

import Link from 'next/link';
import { Upload } from 'lucide-react';

import { extractColorsFromImage } from '@/lib/image-palette';

import { PaletteSwatch } from '@/components/color-tools/palette-swatch';
import { RelatedColorTools } from '@/components/color-tools/related-color-tools';
import { Container } from '@/components/container';
import { Button } from '@/components/ui/button';
import { Wrapper } from '@/components/wrapper';

export function ImagePaletteExtractor() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [colors, setColors] = useState<{ hex: string; weight: number }[]>([]);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFile = async (file: File) => {
    setLoading(true);
    setPreview(URL.createObjectURL(file));
    try {
      const extracted = await extractColorsFromImage(file, 8);
      setColors(extracted);
      if (typeof window !== 'undefined' && window.seline?.track) {
        window.seline.track('image_palette_extract', { count: extracted.length });
      }
    } finally {
      setLoading(false);
    }
  };

  const paletteQuery = colors.map((c) => c.hex.replace('#', '')).join(',');

  return (
    <Wrapper size="lg" className="!pt-4 md:!pt-6">
      <Container>
        <div
          className="mb-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-violet-300/70 bg-violet-50/50 p-10 dark:border-violet-500/30 dark:bg-violet-500/10"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file?.type.startsWith('image/')) void handleFile(file);
          }}>
          <Upload className="mb-4 size-10 text-violet-600 dark:text-violet-400" />
          <p className="mb-4 text-center text-sm text-gray-700 dark:text-gray-300">
            Drop an image here or click to upload. Processing runs entirely in your browser — nothing
            is sent to a server.
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) void handleFile(file);
            }}
          />
          <Button type="button" onClick={() => inputRef.current?.click()} disabled={loading}>
            {loading ? 'Extracting…' : 'Choose image'}
          </Button>
        </div>

        {preview && (
          <div className="mb-8 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview} alt="Uploaded preview" className="max-h-64 w-full object-contain" />
          </div>
        )}

        {colors.length > 0 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {colors.map(({ hex }, i) => (
                <PaletteSwatch key={`${hex}-${i}`} hex={hex} index={i} />
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/palettes?color=${colors[0]?.hex.replace('#', '')}`}>
                <Button type="button" variant="outline" size="sm">
                  Open in Palette Generator →
                </Button>
              </Link>
              <Link href={`/gradients?colors=${paletteQuery}`}>
                <Button type="button" variant="outline" size="sm">
                  Create gradient →
                </Button>
              </Link>
              <Link href={`/contrast-checker?colors=${paletteQuery}`}>
                <Button type="button" variant="outline" size="sm">
                  Check contrast →
                </Button>
              </Link>
            </div>
          </>
        )}

        <RelatedColorTools excludeHref="/palette-from-image" className="mt-12" />
      </Container>
    </Wrapper>
  );
}
