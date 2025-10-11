import { CopyButton } from '@/components/pantone/copy-button';

interface ColorGridProps {
  color: {
    hex: string;
    name: string;
    pantone: string;
    rgb: string;
    cmyk: string;
    hsl: string;
    hsv: string;
  };
}

export function ColorGrid({ color }: ColorGridProps) {
  return (
    <div className="rounded-lg border p-6">
      <div className="mb-4 h-48 w-full rounded-lg" style={{ backgroundColor: color.hex }} />
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-medium">{color.name}</h3>
          <p className="text-sm text-gray-700">{color.pantone}</p>
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">CMYK:</span> <b>{color.cmyk}</b>
            </p>
            <CopyButton value={color.cmyk} label="CMYK value" />
          </div>
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">HEX:</span> <b>{color.hex}</b>
            </p>
            <CopyButton value={color.hex} label="HEX value" />
          </div>
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">RGB:</span> <b>{color.rgb}</b>
            </p>
            <CopyButton value={color.rgb} label="RGB value" />
          </div>

          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">HSL:</span> <b>{color.hsl}</b>
            </p>
            <CopyButton value={color.hsl} label="HSL value" />
          </div>
          <div className="flex items-center justify-start">
            <p>
              <span className="font-medium">HSV:</span> <b>{color.hsv}</b>
            </p>
            <CopyButton value={color.hsv} label="HSV value" />
          </div>
        </div>
      </div>
    </div>
  );
}
