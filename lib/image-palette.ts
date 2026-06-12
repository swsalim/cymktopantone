import { rgbToHex } from '@/lib/colors';

export async function extractColorsFromImage(
  file: File,
  count = 6,
): Promise<{ hex: string; weight: number }[]> {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement('canvas');
  const maxSize = 120;
  const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) return [];

  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const buckets = new Map<string, number>();

  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 128) continue;
    const r = Math.round(data[i] / 32) * 32;
    const g = Math.round(data[i + 1] / 32) * 32;
    const b = Math.round(data[i + 2] / 32) * 32;
    const key = rgbToHex({ r, g, b });
    buckets.set(key, (buckets.get(key) ?? 0) + 1);
  }

  bitmap.close();

  return [...buckets.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([hex, weight]) => ({ hex, weight }));
}
