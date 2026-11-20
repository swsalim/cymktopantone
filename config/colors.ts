interface ColorModel {
  title: string;
  href: string;
  description: string;
  bestFor?: string;
  coverage?: string;
  format?: string;
  benefits?: string;
  useCases?: string;
}

export const colorModels: ColorModel[] = [
  {
    title: 'CMYK',
    href: '/color-models/cmyk',
    description:
      'CMYK (Cyan, Magenta, Yellow, Key/Black) is the subtractive color model that powers professional printing. By mixing these four ink colors, printers can reproduce millions of colors on paper with remarkable accuracy.',
    bestFor: 'Print materials, magazines, business cards',
    coverage: 'Up to 70% of visible colors',
    benefits: 'Accurate color reproduction on paper',
    useCases: 'Professional printing, packaging design',
  },
  {
    title: 'RGB',
    href: '/color-models/rgb',
    description:
      'RGB (Red, Green, Blue) is the additive color model that creates all the colors you see on digital screens. By combining these three primary colors of light, your monitor can display over 16 million vibrant colors.',
    bestFor: 'Digital screens, websites, mobile apps',
    coverage: ' ~35% of visible spectrum (sRGB), up to 75% (wide gamut)',
    benefits: 'Brightest, most vibrant colors possible',
    useCases: 'Web design, digital photography, video',
  },
  {
    title: 'HEX',
    href: '/color-models/hex',
    description:
      'HEX color codes are 6-digit hexadecimal values that represent colors in web development and design. These universal codes ensure your colors look identical across all browsers and devices, making them essential for digital design.',
    bestFor: 'Web development, CSS styling, digital workflows',
    coverage: '16.7 million possible combinations',
    benefits: 'Universal web compatibility',
    useCases: 'HTML/CSS, design handoffs, brand guidelines',
  },
  {
    title: 'HSL',
    href: '/color-models/hsl',
    description:
      'HSL (Hue, Saturation, Lightness) mimics how humans naturally think about color, making it perfect for designers who want intuitive control. This model lets you easily create color variations and maintain consistency across your designs.',
    bestFor: 'Color adjustments, design systems, accessibility',
    coverage: 'Hue (0-360°), Saturation (0-100%), Lightness (0-100%)',
    benefits: 'Human-friendly color manipulation',
    useCases: 'Perfect for creating color palettes, maintaining brand consistency',
  },
  {
    title: 'HSV',
    href: '/color-models/hsv',
    description:
      'HSV (Hue, Saturation, Value) describes colors the way many pickers and image editors do: rotate hue, dial intensity with saturation, and control brightness with value. It is ideal when you want predictable tweaks without juggling RGB channels.',
    bestFor: 'Photo and video apps, classic color pickers, UI theming',
    coverage: 'Hue (0-360°), Saturation (0-100%), Value (0-100%)',
    benefits: 'Intuitive brightness control for digital workflows',
    useCases: 'Grading, retouching, sampling colors for screens',
  },
];

export const colorModelFaqs: FAQItem[] = [
  // General color model questions
  {
    question: 'What is a color model?',
    answer:
      'A color model is a system for representing colors using numeric values. Different models like RGB, CMYK, HEX, HSL, and HSV are used depending on whether the design is for print, digital screens, or color adjustments.',
  },
  {
    question: 'Which color model is best for printing?',
    answer:
      'CMYK is the **best color model for printing** because it uses Cyan, Magenta, Yellow, and Black inks. This subtractive method ensures accurate color reproduction on paper.',
  },
  {
    question: 'Which color model is best for web design?',
    answer:
      'RGB and HEX are the most commonly used color models for web design. RGB defines colors by light values, while HEX provides a universal hexadecimal code that ensures consistent display across browsers.',
  },
  {
    question: 'What is the difference between RGB and CMYK?',
    answer:
      'RGB is an additive color model used for screens, combining red, green, and blue light to create colors. CMYK is subtractive and used for printing, mixing ink colors Cyan, Magenta, Yellow, and Black. RGB is brighter, while CMYK is optimized for paper.',
  },
  {
    question: 'What is the difference between HEX and RGB?',
    answer:
      'HEX is a shorthand hexadecimal representation of RGB values. For example, HEX [#FF0000](/convert-rgb-to-spot-color) represents pure red, which is the same as RGB(255, 0, 0). Both are used in digital design, but HEX is more common in CSS and web development.',
  },
  {
    question: 'What is the difference between HSL and RGB?',
    answer:
      'RGB defines colors based on light intensity of red, green, and blue. HSL describes colors in terms of Hue, Saturation, and Lightness, making it easier for designers to adjust and create color palettes.',
  },
  {
    question: 'Why do designers use HSL?',
    answer:
      'Designers use HSL because it allows intuitive color manipulation. Adjusting hue shifts the color, saturation changes its intensity, and lightness makes it lighter or darker, making HSL ideal for creating accessible and consistent palettes.',
  },

  // Color usage & comparisons
  {
    question: 'How many colors can RGB display?',
    answer:
      'The standard RGB color model can display over 16.7 million colors by combining different levels of red, green, and blue light.',
  },
  {
    question: 'How many colors can CMYK reproduce?',
    answer:
      'CMYK can reproduce up to 70% of visible colors. While not as vibrant as RGB, it is optimized for accuracy in professional printing.',
  },
  {
    question: 'Why does my print look different from the screen?',
    answer:
      'Screens use RGB, which can display brighter and more vibrant colors. Printers use CMYK, which has a smaller color gamut, so certain RGB colors may not be perfectly reproduced in print.',
  },
  {
    question: 'When should I use HEX instead of RGB?',
    answer:
      'Use HEX when coding colors in CSS, HTML, or design systems, since HEX provides a shorter, universal representation of RGB values that ensures consistent rendering across devices and browsers.',
  },
  {
    question: 'Can you convert between RGB, HEX, HSL, HSV, and CMYK?',
    answer:
      'Yes. Colors can be converted between models using formulas or tools. For example, RGB can be converted to HEX, HSL, or HSV for web and UI work, and to CMYK for printing.',
  },
  {
    question: 'What is the difference between HSV and HSL?',
    answer:
      'Both use hue and saturation, but the third axis differs: HSV uses **Value** (brightness toward the pure hue), while HSL uses **Lightness** (perceived light/dark between white and black). The same numeric inputs rarely look identical. See our [HSV](/color-models/hsv) and [HSL](/color-models/hsl) guides for when each shines.',
  },
];

interface FAQItem {
  question: string;
  answer: string;
}

//
// CMYK FAQs
//
export const cmykFaqs: FAQItem[] = [
  {
    question: 'What does CMYK stand for?',
    answer:
      'CMYK stands for Cyan, Magenta, Yellow, and Key (Black). It is a subtractive color model used in printing to reproduce colors on paper.',
  },
  {
    question: 'Why is CMYK used in printing?',
    answer:
      'CMYK is used in printing because printers apply ink to white paper by subtracting brightness from it. This method accurately reproduces a wide range of colors with just four ink cartridges.',
  },
  {
    question: 'How many colors can CMYK produce?',
    answer:
      'CMYK can reproduce millions of colors but covers only about 70% of the visible spectrum. It has a smaller gamut than RGB, which is why some bright digital colors cannot be matched in print.',
  },
  {
    question: 'What is the difference between CMYK and RGB?',
    answer:
      'CMYK is subtractive and used for print, mixing inks to remove light. RGB is additive and used for screens, mixing red, green, and blue light to create colors. RGB is brighter, while CMYK is optimized for paper.',
  },
  {
    question: 'Why do my printed colors look dull compared to the screen?',
    answer:
      'Screens display colors in RGB, which has a wider gamut and brighter output. Printing uses CMYK inks, which cannot reproduce the full range of RGB colors, leading to less vibrant results.',
  },
];

//
// RGB FAQs
//
export const rgbFaqs: FAQItem[] = [
  {
    question: 'What does RGB stand for?',
    answer:
      'RGB stands for Red, Green, and Blue. It is an additive color model used in screens and digital devices where colors are created by combining light.',
  },
  {
    question: 'Where is RGB used?',
    answer:
      'RGB is used in any device that displays colors with light, such as monitors, TVs, cameras, and mobile screens. It is the default color model for web and digital design.',
  },
  {
    question: 'How many colors can RGB display?',
    answer:
      'RGB can display over 16.7 million colors by varying the intensity of red, green, and blue from 0 to 255 in 8-bit color depth.',
  },
  {
    question: 'What is the difference between RGB and HEX?',
    answer:
      'RGB represents colors using numerical values for red, green, and blue light, such as rgb(255, 0, 0). HEX represents the same colors in hexadecimal form, like #FF0000. Both are widely used in digital design.',
  },
  {
    question: 'Why is RGB not used for printing?',
    answer:
      'RGB is based on light, while printing applies ink to paper. Printers use CMYK because it better represents how inks mix physically, unlike RGB which only works with screens.',
  },
];

//
// HEX FAQs
//
export const hexFaqs: FAQItem[] = [
  {
    question: 'What is a HEX color code?',
    answer:
      'A HEX color code is a 6-digit hexadecimal number that represents colors in digital design. For example, #FFFFFF is white and #000000 is black.',
  },
  {
    question: 'Where are HEX codes used?',
    answer:
      'HEX codes are widely used in web development, CSS styling, graphic design, and digital workflows to ensure consistent color representation across browsers and devices.',
  },
  {
    question: 'What is the difference between HEX and RGB?',
    answer:
      'HEX is simply a hexadecimal representation of RGB values. For instance, HEX #FF5733 equals RGB(255, 87, 51). Both models define the same color but in different formats.',
  },
  {
    question: 'Can HEX represent all colors?',
    answer:
      'Yes. HEX can represent the same 16.7 million possible colors as RGB because it is directly based on RGB values.',
  },
  {
    question: 'Why do designers prefer HEX codes?',
    answer:
      'Designers prefer HEX codes because they are shorter, easier to read, and universally supported in web development and digital workflows.',
  },
];

//
// HSL FAQs
//
export const hslFaqs: FAQItem[] = [
  {
    question: 'What does HSL stand for?',
    answer:
      'HSL stands for Hue, Saturation, and Lightness. It is a color model that represents colors in a way that is more aligned with human perception.',
  },
  {
    question: 'Why use HSL instead of RGB?',
    answer:
      'HSL is often easier for designers because it allows intuitive adjustments: Hue changes the color itself, Saturation changes the intensity, and Lightness changes how light or dark it is.',
  },
  {
    question: 'What is Hue in HSL?',
    answer:
      'Hue in HSL refers to the type of color and is represented as an angle on a 360° color wheel. For example, 0° is red, 120° is green, and 240° is blue.',
  },
  {
    question: 'How does HSL improve accessibility?',
    answer:
      'HSL makes it easier to adjust contrast and maintain brand consistency. Designers can tweak saturation and lightness for readability without altering the overall hue.',
  },
  {
    question: 'Can HSL be converted to RGB or HEX?',
    answer:
      'Yes. HSL can be converted to RGB and then expressed as HEX. Many tools and CSS functions support direct conversion between these models.',
  },
];

//
// HSV FAQs
//
export const hsvFaqs: FAQItem[] = [
  {
    question: 'What does HSV stand for?',
    answer:
      'HSV stands for Hue, Saturation, and Value. Hue is the color angle on a wheel (0–360°), saturation is how vivid the color is, and value is how bright it is (often shown as 0–100%).',
  },
  {
    question: 'Is HSV the same as HSB?',
    answer:
      'Yes. **HSB** (Hue, Saturation, Brightness) is another name for the same idea as HSV. Different apps use different labels, but the three dimensions work the same way.',
  },
  {
    question: 'Why do Photoshop and other editors use HSV?',
    answer:
      'HSV maps well to how people adjust photos: pick a hue, push saturation for punch, and change value for exposure-like brightness without rebalancing RGB by hand.',
  },
  {
    question: 'How is HSV different from HSL?',
    answer:
      'They share hue and saturation, but **value** (HSV) and **lightness** (HSL) are computed differently, so sliders do not behave the same at the extremes. Use HSV when your tool uses it natively; use HSL when writing CSS `hsl()` or building design tokens.',
  },
  {
    question: 'Can HSV be converted to RGB, HEX, or CMYK?',
    answer:
      'Yes. HSV is converted to RGB first, then to HEX for the web or to CMYK for print (with gamut limits). Our site offers [HSV to RGB](/convert-hsv-to-rgb), [HSV to HEX](/convert-hsv-to-hex), and [HSV to CMYK](/convert-hsv-to-cmyk) converters.',
  },
];
