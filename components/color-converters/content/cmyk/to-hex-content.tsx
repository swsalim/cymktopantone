import Link from 'next/link';

import { Container } from '@/components/container';

export default function CmykHexContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h1>CMYK to Hex Converter: From Print to Web</h1>
      <p>
        Your logo looks perfect on that business card, but when you try to use it on your website,
        the colors don't match. That's the CMYK to HEX problem in a nutshell.
      </p>
      <p>
        <Link href="/color-models/cmyk">CMYK</Link>—cyan, magenta, yellow, and black—is how printers
        mix ink. It's built for paper, not screens. <Link href="/color-models/hex">HEX codes</Link>{' '}
        like #FF5733 are what browsers understand. They're short, easy to copy-paste, and work
        everywhere online.
      </p>
      <p>
        When you need to move a design from print to digital, you can't just use the same numbers.
        That's where a <Link href="/convert-cmyk-to-hex">CMYK to HEX converter</Link> comes in.
      </p>
      <h2>Why Convert CMYK to Hex?</h2>
      <p>
        Websites use <Link href="/color-models/hex">HEX codes</Link> because they're simple. Type{' '}
        <code>#FF0000</code> in CSS and you get red. No need to calculate{' '}
        <Link href="/color-models/rgb">RGB values</Link> or worry about percentages.
      </p>
      <p>
        If you've got CMYK values from a print design and need them online, converting to HEX saves
        time. Your brand colors stay consistent whether someone sees them on paper or a phone screen.
      </p>
      <h2>How to Convert CMYK to Hex</h2>
      <p>
        Enter your CMYK percentages (like C: 100, M: 0, Y: 0, K: 0) and get the HEX code instantly.
        No math, no guesswork.
      </p>
      <p>
        The conversion happens automatically. Whether you're updating a website with print brand
        colors or preparing social media graphics, you'll have the right HEX code in seconds.
      </p>
      <h2>CMYK vs Hex: What's the Difference?</h2>
      <p>
        CMYK mixes ink on paper. Print a brochure, and the printer combines cyan, magenta, yellow,
        and black to create colors. It's subtractive—the more ink, the darker it gets.
      </p>
      <p>
        HEX is shorthand for RGB values. It tells screens how much red, green, and blue light to
        emit. It's additive—more light means brighter colors. HEX works great for websites, apps,
        and anything digital. CMYK works great for anything that gets printed.
      </p>
      <h2>Why Use This Converter</h2>
      <p>
        Fast, free, and accurate. Enter CMYK values, get HEX codes. No downloads or accounts needed.
      </p>
      <p>
        Works on any device. Convert colors at your desk, in a client meeting, or on your phone.
        When you need to move print colors online, this tool gets you there.
      </p>
    </Container>
  );
}
