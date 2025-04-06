interface ColorPreviewProps {
  color: string;
  title?: string;
}

export function ColorPreview({ color, title = 'Color Preview' }: ColorPreviewProps) {
  return (
    <div className="mb-4">
      <h2 className="sr-only mb-2 text-xl font-semibold">{title}</h2>
      <div className="h-24 w-full rounded-lg" style={{ backgroundColor: color }} />
    </div>
  );
}
