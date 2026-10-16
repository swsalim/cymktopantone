import Link from 'next/link';

import { Container } from '@/components/container';

export default function HslHsvContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h2>HSL to HSV Converter</h2>
      <p>
        HSL and HSV both start with hue and a saturation number, then describe the third channel
        differently. HSL uses lightness. HSV uses value. A color that looks the same in a picker
        can carry different numbers once you switch models.
      </p>
      <p>
        This converter turns HSL into HSV by going through RGB, the same path the other HSL tools
        use. Hue stays put when the color is chromatic. Saturation and the third channel are
        recalculated, because lightness and value are not the same scale.
      </p>

      <h2>When you need HSV instead of HSL</h2>
      <p>
        CSS usually wants <code>hsl()</code> or a hex code. Photo editors, some 3D tools, and older
        color pickers store HSV. If a handoff lists hue, saturation, and value, convert before you
        paste the numbers into an HSL field, or the color will shift.
      </p>
      <p>
        The reverse direction is the{' '}
        <Link href="/convert-hsv-to-hsl">HSV to HSL converter</Link>. For stylesheet output, use{' '}
        <Link href="/convert-hsl-to-hex">HSL to HEX</Link> or{' '}
        <Link href="/convert-hsl-to-rgb">HSL to RGB</Link>.
      </p>

      <h2>How to read the result</h2>
      <p>
        Hue is 0–360. Saturation and value are 0–100%. Value is how far the strongest RGB channel
        is from black. Lightness in HSL is the midpoint between the strongest and weakest channels.
        A pure red can be <code>hsl(0, 100%, 50%)</code> and <code>hsv(0, 100%, 100%)</code> at the
        same time. White is full lightness in HSL and full value with zero saturation in HSV.
      </p>
      <p>
        Open a finished hex on its <Link href="/colors">color page</Link> to see HEX, RGB, HSL,
        HSV, CMYK, and OKLCH together, including contrast against white and black.
      </p>
    </Container>
  );
}
