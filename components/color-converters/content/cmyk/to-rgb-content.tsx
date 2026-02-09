import Link from 'next/link';

import { Container } from '@/components/container';

export default function CmykRgbContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h1>CMYK to RGB Converter: Print Colors for Screens</h1>
      <p>
        Print uses CMYK. Screens use RGB. They don't match perfectly, and that's why conversions
        matter.
      </p>
      <p>
        <Link href="/color-models/cmyk">CMYK</Link> mixes cyan, magenta, yellow, and black ink on
        paper. It's subtractive—more ink means darker colors. <Link href="/color-models/rgb">RGB</Link>{' '}
        mixes red, green, and blue light on screens. It's additive—more light means brighter
        colors.
      </p>
      <p>
        When you need to use print colors on a website or app, a{' '}
        <Link href="/convert-cmyk-to-rgb">CMYK to RGB converter</Link> handles the math.
      </p>

      <h2>Why Convert CMYK to RGB?</h2>
      <p>
        Screens can't display CMYK directly. They need RGB values. If you've got CMYK from a print
        design and try to use it online, colors will look off—often duller or shifted.
      </p>
      <p>
        Converting CMYK to RGB ensures your brand colors translate properly from print to digital.
        That logo that looks perfect on business cards will look right on your website too. It's
        essential when adapting <Link href="/convert-hsl-to-cmyk">print materials</Link> for web or
        mobile apps.
      </p>

      <h2>How to Convert CMYK to RGB</h2>
      <p>
        Enter CMYK percentages (like C: 100, M: 50, Y: 0, K: 0) and get{' '}
        <Link href="/convert-hex-to-rgb">RGB values</Link> instantly. RGB uses 0-255 for each color
        channel.
      </p>
      <p>
        The conversion accounts for how ink and light differ. What looks vibrant in CMYK might need
        different RGB values to appear the same on screen. This tool does that calculation
        automatically.
      </p>

      <h2>CMYK vs RGB: The Difference</h2>
      <p>
        CMYK subtracts light. Print white paper, add cyan ink, and you get cyan. Add more inks, and
        it gets darker. It's how physical printing works.
      </p>
      <p>
        RGB adds light. Start with a black screen, add red light, and you get red. Add more light
        channels, and it gets brighter. Screens work this way because they emit light instead of
        reflecting it.
      </p>
      <p>
        That's why CMYK colors often look duller when converted to RGB—screens can produce brighter
        colors than ink can reflect.
      </p>

      <h2>Why Use This Converter</h2>
      <p>
        Fast, accurate conversion from print to digital. Enter CMYK, get RGB. No manual calculations
        needed.
      </p>
      <p>
        Works on any device. Convert print colors for web projects, verify color accuracy, or{' '}
        <Link href="/convert-hex-to-pantone-pms">match colors across formats</Link>. Whether you're
        at your desk or showing a client options on your phone, this tool gets you the right RGB
        values.
      </p>
    </Container>
  );
}
