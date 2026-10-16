import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ogImages, siteConfig } from '@/config/site';

import { colorCatalog, isCatalogHex } from '@/lib/color-catalog';
import { ContrastCheck, getColorPageData } from '@/lib/color-page';
import { absoluteUrl } from '@/lib/utils';

import { CopyButton } from '@/components/color-tools/copy-button';
import { Container } from '@/components/container';
import BreadcrumbJsonLd from '@/components/structured-data/BreadcrumbJsonLd';
import WebPageJsonLd from '@/components/structured-data/WebPageJsonLd';
import WebsiteJsonLd from '@/components/structured-data/WebsiteJsonLd';
import { Wrapper } from '@/components/wrapper';

type PageProps = { params: Promise<{ hex: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return colorCatalog.map((color) => ({ hex: color.hex }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { hex } = await params;
  const data = getColorPageData(hex);
  if (!data) notFound();

  const name = data.entry.names[0];
  const title = `${name} ${data.hashHex} — HEX, RGB, HSL, HSV, CMYK`;
  const description = `${name} is ${data.hashHex}: ${data.rgbLabel}, ${data.hslLabel}, ${data.hsvLabel}, ${data.cmykLabel}, ${data.oklchLabel}. Contrast ${data.onWhite.ratioLabel}:1 on white and ${data.onBlack.ratioLabel}:1 on black.`;
  const url = `/color/${data.entry.hex}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      images: ogImages(title),
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title,
      description,
      card: 'summary_large_image',
      creator: siteConfig.creator,
      images: ogImages(title),
    },
  };
}

function PassFail({ ok }: { ok: boolean }) {
  return (
    <span
      className={
        ok
          ? 'font-semibold text-emerald-700 dark:text-emerald-300'
          : 'font-semibold text-rose-700 dark:text-rose-300'
      }>
      {ok ? 'Pass' : 'Fail'}
    </span>
  );
}

function ContrastBlock({
  label,
  sample,
  textColor,
  check,
}: {
  label: string;
  sample: string;
  textColor: string;
  check: ContrastCheck;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-violet-200/70 dark:border-gray-700">
      <div className="px-4 py-6 text-center text-sm font-semibold" style={{ backgroundColor: sample, color: textColor }}>
        {label} · {check.ratioLabel}:1
      </div>
      <dl className="grid grid-cols-2 gap-3 p-4 text-sm text-gray-700 dark:text-gray-300">
        <div>
          AA normal text <PassFail ok={check.aaNormal} />
        </div>
        <div>
          AA large text <PassFail ok={check.aaLarge} />
        </div>
        <div>
          AAA normal text <PassFail ok={check.aaaNormal} />
        </div>
        <div>
          AAA large text <PassFail ok={check.aaaLarge} />
        </div>
      </dl>
    </div>
  );
}

function SwatchLink({ hex }: { hex: string }) {
  const bare = hex.replace('#', '').toUpperCase();
  const chip = (
    <span className="block h-14 w-full rounded-lg border border-black/10" style={{ backgroundColor: hex }} />
  );
  return (
    <div className="min-w-0">
      {isCatalogHex(bare) ? (
        <Link href={`/color/${bare}`} className="block hover:opacity-90">
          {chip}
        </Link>
      ) : (
        chip
      )}
      <p className="mt-1 font-mono text-xs text-gray-600 dark:text-gray-400">{hex}</p>
    </div>
  );
}

export default async function ColorDetailPage({ params }: PageProps) {
  const { hex } = await params;
  const data = getColorPageData(hex);
  if (!data) notFound();

  const name = data.entry.names[0];
  const aliases = data.entry.names.slice(1);
  const url = absoluteUrl(`/color/${data.entry.hex}`);
  const description = `${name} is ${data.hashHex}. ${data.rgbLabel}. Contrast ${data.onWhite.ratioLabel}:1 on white.`;

  const conversions = [
    ['HEX', data.hashHex],
    ['RGB', data.rgbLabel],
    ['HSL', data.hslLabel],
    ['HSV', data.hsvLabel],
    ['CMYK', data.cmykLabel],
    ['OKLCH', data.oklchLabel],
  ] as const;

  return (
    <>
      <WebsiteJsonLd company={siteConfig.siteName} />
      <WebPageJsonLd id={url} description={description} />
      <BreadcrumbJsonLd
        itemListElements={[
          { url: absoluteUrl('/'), name: 'Home' },
          { url: absoluteUrl('/colors'), name: 'Colors' },
          { url, name },
        ]}
      />
      <Wrapper className="pb-16">
        <Container as="section">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <Link href="/colors" className="hover:text-violet-700 dark:hover:text-violet-300">
              Colors
            </Link>
          </p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[280px_1fr]">
            <div>
              <div
                className="h-48 rounded-3xl border border-black/10 shadow-sm"
                style={{ backgroundColor: data.hashHex }}
                aria-label={`${name} swatch`}
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <p className="font-mono text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {data.hashHex}
                </p>
                <CopyButton text={data.hashHex} label="Copy" />
              </div>
            </div>
            <div>
              <h1 className="text-balance text-3xl font-semibold text-gray-900 md:text-5xl dark:text-gray-100">
                {name}
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300">
                {name} is {data.hashHex}
                {data.cssKeyword ? (
                  <>
                    . In CSS you can write it as the keyword <code>{data.cssKeyword}</code>
                  </>
                ) : (
                  <> — a neutral used for type, borders, and surfaces</>
                )}
                . The values below are the same sRGB color in HEX, RGB, HSL, HSV, a simple CMYK
                conversion, and OKLCH. CMYK here is a channel formula for reference, not a press
                proof.
              </p>
              {aliases.length > 0 && (
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  Also named {aliases.join(', ')}.
                </p>
              )}
            </div>
          </div>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">Conversions</h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {conversions.map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-violet-200/70 bg-white/80 p-4 dark:border-gray-700 dark:bg-gray-900/70">
                <dt className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</dt>
                <dd className="mt-1 break-all font-mono text-sm text-gray-900 dark:text-gray-100">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">Tints and shades</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Tints mix this color toward white. Shades mix it toward black in sRGB. For a 50–950 ramp,
            open the <Link href="/color-scale" className="text-violet-700 hover:underline dark:text-violet-300">tint and shade generator</Link>.
          </p>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-500">Tints</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.tints.map((swatch) => (
              <div key={swatch.hex}>
                <SwatchLink hex={swatch.hex} />
                <p className="text-xs text-gray-500">{swatch.label}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-6 text-sm font-semibold uppercase tracking-wide text-gray-500">Shades</h3>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.shades.map((swatch) => (
              <div key={swatch.hex}>
                <SwatchLink hex={swatch.hex} />
                <p className="text-xs text-gray-500">{swatch.label}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">Harmony palettes</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            These schemes rotate hue from {name}. Read the relationships in{' '}
            <Link href="/blog/color-theory-101" className="text-violet-700 hover:underline dark:text-violet-300">
              color theory 101
            </Link>{' '}
            or adjust them on the{' '}
            <Link href="/color-wheel" className="text-violet-700 hover:underline dark:text-violet-300">
              color wheel
            </Link>
            .
          </p>
          <div className="mt-6 space-y-6">
            {data.harmonies.map((harmony) => (
              <div key={harmony.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">{harmony.label}</h3>
                  <Link
                    href={`/palettes?color=${data.entry.hex}&scheme=${harmony.id}`}
                    className="text-sm font-medium text-violet-700 hover:underline dark:text-violet-300">
                    Open in palette generator
                  </Link>
                </div>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {harmony.colors.map((color) => (
                    <SwatchLink key={`${harmony.id}-${color}`} hex={color} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Contrast against white and black
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            Ratios use the WCAG relative-luminance formula. AA normal text needs 4.5:1 and large text
            needs 3:1 under Success Criterion 1.4.3. AAA uses 7:1 and 4.5:1. A pass here is only this
            pair, not a full page audit. Check other pairings in the{' '}
            <Link
              href={`/contrast-checker?colors=${data.entry.hex},FFFFFF,000000`}
              className="text-violet-700 hover:underline dark:text-violet-300">
              contrast checker
            </Link>
            .
          </p>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <ContrastBlock label="On white" sample="#FFFFFF" textColor={data.hashHex} check={data.onWhite} />
            <ContrastBlock label="On black" sample="#000000" textColor={data.hashHex} check={data.onBlack} />
          </div>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">Similar named colors</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Nearest CSS named colors by RGB distance. Distance is not a perceptual match.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {data.similar.map((color) => (
              <li key={color.hex}>
                <Link
                  href={`/color/${color.hex}`}
                  className="flex items-center gap-3 rounded-xl border border-violet-200/70 p-3 hover:border-violet-400 dark:border-gray-700">
                  <span
                    className="size-10 shrink-0 rounded-lg border border-black/10"
                    style={{ backgroundColor: `#${color.hex}` }}
                  />
                  <span>
                    <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">
                      {color.names[0]}
                    </span>
                    <span className="font-mono text-xs text-gray-500">#{color.hex}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <h2 className="mt-12 text-2xl font-semibold text-gray-900 dark:text-gray-100">Use this color</h2>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/convert-hex-to-rgb">
                HEX to RGB
              </Link>
            </li>
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/convert-hex-to-hsl">
                HEX to HSL
              </Link>
            </li>
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/convert-hex-to-hsv">
                HEX to HSV
              </Link>
            </li>
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/convert-hex-to-cmyk">
                HEX to CMYK
              </Link>
            </li>
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/print-gamut">
                Print gamut checker
              </Link>
            </li>
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/color-blindness">
                Color blindness simulator
              </Link>
            </li>
            <li>
              <Link className="text-violet-700 hover:underline dark:text-violet-300" href="/gradients">
                CSS gradient generator
              </Link>
            </li>
            <li>
              <Link
                className="text-violet-700 hover:underline dark:text-violet-300"
                href={`/palettes?color=${data.entry.hex}`}>
                Palette from this color
              </Link>
            </li>
          </ul>
        </Container>
      </Wrapper>
    </>
  );
}
