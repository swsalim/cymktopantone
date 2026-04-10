import { Container } from '@/components/container';

export default function HexRgbContent() {
  return (
    <Container as="section" className="prose pb-12 dark:prose-invert md:pb-24">
      <h2>Hex to RGB Converter: Unpack Color Codes</h2>
      <p>
        HEX codes like #FF5733 are compact, but sometimes you need RGB values. Maybe a design tool
        requires RGB, or you need to understand what the color actually is.
      </p>
      <p>
        HEX is shorthand for RGB. It's perfect for CSS and HTML, but RGB values (0-255 for each
        color) are what many design tools and applications use. Converting HEX to RGB gives you the
        full color breakdown.
      </p>
      <p>
        Our HEX to RGB converter makes this conversion instant and accurate.
      </p>
      <h2>Why Convert Hex to RGB?</h2>
      <p>
        RGB values are the foundation of digital colors. Screens use red, green, and blue light to
        create colors. While HEX codes are convenient for web development, some tools and software
        require RGB input.
      </p>
      <p>
        Converting HEX to RGB ensures your colors work correctly in any application that needs RGB
        values. Whether you're designing a website, mobile app, or digital content, accurate color
        conversion matters.
      </p>
      <h2>How to Convert Hex to RGB</h2>
      <p>
        Enter your HEX code (like #FF5733) and get RGB values instantly. RGB uses 0-255 for each
        color channel—red, green, and blue.
      </p>
      <p>
        The conversion is straightforward since HEX is just a compact way to write RGB values. No
        complex math needed.
      </p>
      <h2>Hex vs RGB: What's Different?</h2>
      <p>
        HEX and RGB represent the same colors, just in different formats. HEX is a hexadecimal
        representation of RGB values, offering a shorthand format for code. It's concise and perfect
        for CSS and HTML.
      </p>
      <p>
        RGB represents colors through their red, green, and blue light intensities (0-255 each).
        This format is widely used in graphic design software and tools that need a direct
        representation of light-based colors.
      </p>
      <h2>Why Use This Converter</h2>
      <p>
        Quick conversion from HEX codes to RGB values. Enter HEX, get RGB. Simple and accurate.
      </p>
      <p>
        Works anywhere. Convert HEX colors to RGB for design tools, verify color values, or ensure
        compatibility across different applications. Whether you're at your desk or on your phone,
        this tool gets you the right RGB values.
      </p>
    </Container>
  );
}
