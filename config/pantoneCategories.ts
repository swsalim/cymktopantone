import { findMatchingPMSColors } from '@/lib/colors';

interface ColorConversion {
  format: 'HEX' | 'RGB' | 'CMYK' | 'Pantone';
  value: string;
}

interface RelatedColor {
  name: string;
  slug: string;
  hex: string;
}

export interface PantoneCategory {
  name: string;
  slug: string;
  hex: string;
  rgb: string;
  hsl: string;
  hsv: string;
  cmyk: string;
  pantone: string;
  description: string;
  conversions: ColorConversion[];
  usage: string;
  psychology: string;
  relatedColors: RelatedColor[];
}

function getRelatedColors(hex: string, pantone: string): RelatedColor[] {
  // Remove the # from hex if present
  const cleanHex = hex.replace('#', '');
  const matches = findMatchingPMSColors(cleanHex, 32);

  // Filter out the main color and limit to 4 results
  return matches
    .filter(({ pantone: matchPantone }) => matchPantone !== pantone)
    .slice(0, 4)
    .map(({ pantone, hex }) => ({
      name: pantone,
      slug: pantone.toLowerCase().replace(/\s+/g, '-'),
      hex: `#${hex}`,
    }));
}

export const pantoneCategories: PantoneCategory[] = [
  {
    name: 'Pantone Green',
    slug: 'pantone-green',
    hex: '#00A550',
    rgb: '0, 165, 80',
    cmyk: '100, 0, 80, 10',
    pantone: 'Pantone 354 C',
    hsl: '120, 100%, 32%',
    hsv: '120, 100%, 64%',
    description:
      'Pantone Green symbolizes nature, growth, and sustainability. It is a go-to color for brands that emphasize environmental consciousness and wellness. This vibrant green is often used in organic food packaging, eco-friendly campaigns, and nature-inspired branding.',
    conversions: [
      { format: 'HEX', value: '#00A550' },
      { format: 'RGB', value: '0, 165, 80' },
      { format: 'CMYK', value: '100, 0, 80, 10' },
      { format: 'Pantone', value: '354 C' },
    ],
    usage:
      'Commonly seen in healthcare, organic product packaging, and financial institutions, Pantone Green conveys a message of renewal and harmony.',
    psychology:
      'Green is linked to balance, health, and growth. It has a calming effect and is often used in spaces where relaxation and creativity are encouraged.',
    relatedColors: getRelatedColors('00A550', 'Pantone 354 C'),
  },
  {
    name: 'Pantone Royal Blue',
    slug: 'pantone-royal-blue',
    hex: '#002366',
    rgb: '0, 35, 102',
    cmyk: '100, 85, 0, 60',
    pantone: 'Pantone 281 C',
    hsl: '225, 100%, 20%',
    hsv: '225, 100%, 40%',
    description:
      'Pantone Royal Blue represents trust, stability, and professionalism. It is a powerful color choice for corporate branding and institutions that want to convey authority and reliability.',
    conversions: [
      { format: 'HEX', value: '#002366' },
      { format: 'RGB', value: '0, 35, 102' },
      { format: 'CMYK', value: '100, 85, 0, 60' },
      { format: 'Pantone', value: '281 C' },
    ],
    usage:
      'Widely used in corporate branding, financial institutions, and government agencies, Royal Blue projects confidence and dependability.',
    psychology:
      'Royal Blue is associated with intelligence, stability, and trust. It creates a sense of security and is often used in professional settings.',
    relatedColors: getRelatedColors('002366', 'Pantone 281 C'),
  },
  {
    name: 'Pantone Grey',
    slug: 'pantone-grey',
    hex: '#808080',
    rgb: '128, 128, 128',
    cmyk: '0, 0, 0, 50',
    pantone: 'Pantone Cool Gray 8 C',
    hsl: '0, 0%, 50%',
    hsv: '0, 0%, 50%',
    description:
      'Pantone Grey represents neutrality, balance, and sophistication. It is a versatile color that works well in both modern and traditional design contexts.',
    conversions: [
      { format: 'HEX', value: '#808080' },
      { format: 'RGB', value: '128, 128, 128' },
      { format: 'CMYK', value: '0, 0, 0, 50' },
      { format: 'Pantone', value: 'Cool Gray 8 C' },
    ],
    usage:
      'Commonly used in technology, architecture, and luxury branding, Grey provides a neutral backdrop that allows other elements to stand out.',
    psychology:
      'Grey is associated with professionalism, timelessness, and practicality. It creates a sense of stability and sophistication.',
    relatedColors: getRelatedColors('808080', 'Pantone Cool Gray 8 C'),
  },
  {
    name: 'Pantone 485 C',
    slug: 'pantone-485-c',
    hex: '#DA291C',
    rgb: '218, 41, 28',
    cmyk: '0, 100, 91, 0',
    pantone: 'Pantone 485 C',
    hsl: '0, 80%, 48%',
    hsv: '0, 91%, 85%',
    description: `Pantone 485 C is a vibrant, fiery red that symbolizes passion, energy, and urgency. It is widely used in branding, sports, and marketing materials to create strong visual impact.`,
    conversions: [
      { format: 'HEX', value: '#DA291C' },
      { format: 'RGB', value: '218, 41, 28' },
      { format: 'CMYK', value: '0, 100, 91, 0' },
      { format: 'Pantone', value: '485 C' },
    ],
    usage: `Common in fast food branding (e.g., McDonald's, Coca-Cola), sports team logos, and warning signs.`,
    psychology: `Red stimulates excitement, appetite, and action. It is often associated with power and urgency.`,
    relatedColors: getRelatedColors('DA291C', 'Pantone 485 C'),
  },
  {
    name: 'Pantone 021 C',
    slug: 'pantone-021-c',
    hex: '#FE5000',
    rgb: '254, 80, 0',
    cmyk: '0, 70, 100, 0',
    pantone: 'Pantone 021 C',
    hsl: '20, 100%, 50%',
    hsv: '20, 100%, 100%',
    description: `Pantone 021 C is an intense orange that radiates warmth, energy, and enthusiasm. It is often used in sports, entertainment, and safety applications.`,
    conversions: [
      { format: 'HEX', value: '#FE5000' },
      { format: 'RGB', value: '254, 80, 0' },
      { format: 'CMYK', value: '0, 70, 100, 0' },
      { format: 'Pantone', value: '021 C' },
    ],
    usage: `Popular in extreme sports branding, children's products, and safety vests for high visibility.`,
    psychology: `Orange is playful and attention-grabbing, evoking feelings of fun and excitement.`,
    relatedColors: getRelatedColors('FE5000', 'Pantone 021 C'),
  },
  {
    name: 'Pantone 109 C',
    slug: 'pantone-109-c',
    hex: '#FFC72C',
    rgb: '255, 199, 44',
    cmyk: '0, 20, 100, 0',
    pantone: 'Pantone 109 C',
    hsl: '54, 100%, 60%',
    hsv: '54, 100%, 100%',
    description: `Pantone 109 C is a bright, energetic yellow that represents optimism and happiness. It is commonly used in branding, signage, and advertising to grab attention.`,
    conversions: [
      { format: 'HEX', value: '#FFC72C' },
      { format: 'RGB', value: '255, 199, 44' },
      { format: 'CMYK', value: '0, 20, 100, 0' },
      { format: 'Pantone', value: '109 C' },
    ],
    usage: `Seen in road signs, caution labels, and cheerful branding like DHL and National Geographic.`,
    psychology: `Yellow is associated with energy and joy but also caution when used in high-visibility applications.`,
    relatedColors: getRelatedColors('FFC72C', 'Pantone 109 C'),
  },
  {
    name: 'Pantone 354 C',
    slug: 'pantone-354-c',
    hex: '#00A550',
    rgb: '0, 165, 80',
    cmyk: '100, 0, 80, 10',
    pantone: 'Pantone 354 C',
    hsl: '120, 100%, 32%',
    hsv: '120, 100%, 64%',
    description: `Pantone 354 C is a rich, fresh green that symbolizes nature, growth, and sustainability. It is a favorite among eco-friendly brands and organic product packaging.`,
    conversions: [
      { format: 'HEX', value: '#00A550' },
      { format: 'RGB', value: '0, 165, 80' },
      { format: 'CMYK', value: '100, 0, 80, 10' },
      { format: 'Pantone', value: '354 C' },
    ],
    usage: `Used in natural product packaging, sustainable brands, and healthcare industries.`,
    psychology: `Green conveys balance, renewal, and a connection to nature.`,
    relatedColors: getRelatedColors('00A550', 'Pantone 354 C'),
  },
  {
    name: 'Pantone 293 C',
    slug: 'pantone-293-c',
    hex: '#0057B7',
    rgb: '0, 87, 183',
    cmyk: '100, 50, 0, 0',
    pantone: 'Pantone 293 C',
    hsl: '225, 100%, 36%',
    hsv: '225, 100%, 72%',
    description: `Pantone 293 C is a bold and trustworthy blue that is commonly used in corporate branding and sports team identities.`,
    conversions: [
      { format: 'HEX', value: '#0057B7' },
      { format: 'RGB', value: '0, 87, 183' },
      { format: 'CMYK', value: '100, 50, 0, 0' },
      { format: 'Pantone', value: '293 C' },
    ],
    usage: `Seen in tech brands (IBM, HP), corporate logos, and athletic branding.`,
    psychology: `Blue conveys trust, professionalism, and calmness, making it a dominant corporate color.`,
    relatedColors: getRelatedColors('0057B7', 'Pantone 293 C'),
  },
  {
    name: 'Pantone 2685 C',
    slug: 'pantone-2685-c',
    hex: '#5D3F91',
    rgb: '93, 63, 145',
    cmyk: '80, 90, 0, 0',
    pantone: 'Pantone 2685 C',
    hsl: '270, 50%, 41%',
    hsv: '270, 50%, 57%',
    description: `Pantone 2685 C is a luxurious, deep purple often associated with royalty, creativity, and high-end branding.`,
    conversions: [
      { format: 'HEX', value: '#5D3F91' },
      { format: 'RGB', value: '93, 63, 145' },
      { format: 'CMYK', value: '80, 90, 0, 0' },
      { format: 'Pantone', value: '2685 C' },
    ],
    usage: `Common in beauty, fashion, and luxury branding.`,
    psychology: `Purple stimulates imagination and represents elegance and sophistication.`,
    relatedColors: getRelatedColors('5D3F91', 'Pantone 2685 C'),
  },
  {
    name: 'Pantone 226 C',
    slug: 'pantone-226-c',
    hex: '#E91E63',
    rgb: '233, 30, 99',
    cmyk: '0, 80, 40, 0',
    pantone: 'Pantone 226 C',
    hsl: '330, 80%, 52%',
    hsv: '330, 80%, 91%',
    description: `Pantone 226 C is a striking pink that conveys vibrancy, femininity, and fun. It is widely used in cosmetics, fashion, and pop culture branding.`,
    conversions: [
      { format: 'HEX', value: '#E91E63' },
      { format: 'RGB', value: '233, 30, 99' },
      { format: 'CMYK', value: '0, 80, 40, 0' },
      { format: 'Pantone', value: '226 C' },
    ],
    usage: `Seen in beauty products, Barbie branding, and Breast Cancer Awareness campaigns.`,
    psychology: `Pink evokes warmth, love, and playfulness, making it ideal for feminine and youth-oriented brands.`,
    relatedColors: getRelatedColors('E91E63', 'Pantone 226 C'),
  },
  {
    name: 'Pantone Cool Gray 6 C',
    slug: 'pantone-cool-gray-6-c',
    hex: '#A7A8AA',
    rgb: '167, 168, 170',
    cmyk: '0, 0, 0, 50',
    pantone: 'Pantone Cool Gray 6 C',
    hsl: '0, 0%, 67%',
    hsv: '0, 0%, 67%',
    description: `Pantone Cool Gray 6 C is a sophisticated neutral gray that conveys balance, professionalism, and modern design.`,
    conversions: [
      { format: 'HEX', value: '#A7A8AA' },
      { format: 'RGB', value: '167, 168, 170' },
      { format: 'CMYK', value: '0, 0, 0, 50' },
      { format: 'Pantone', value: 'Cool Gray 6 C' },
    ],
    usage: `Used in corporate branding, automotive design, and luxury packaging.`,
    psychology: `Gray is neutral and versatile, offering a sense of stability and refinement.`,
    relatedColors: getRelatedColors('A7A8AA', 'Pantone Cool Gray 6 C'),
  },
  {
    name: 'Pantone Black C',
    slug: 'pantone-black-c',
    hex: '#101820',
    rgb: '16, 24, 32',
    cmyk: '0, 0, 0, 100',
    pantone: 'Pantone Black C',
    hsl: '0, 0%, 12%',
    hsv: '0, 0%, 12%',
    description: `Pantone Black C is a timeless and powerful color used in luxury branding, typography, and fashion.`,
    conversions: [
      { format: 'HEX', value: '#101820' },
      { format: 'RGB', value: '16, 24, 32' },
      { format: 'CMYK', value: '0, 0, 0, 100' },
      { format: 'Pantone', value: 'Black C' },
    ],
    usage: `Common in high-end brands, editorial design, and formal wear.`,
    psychology: `Black represents sophistication, mystery, and exclusivity.`,
    relatedColors: getRelatedColors('101820', 'Pantone Black C'),
  },
  {
    name: 'Pantone White C',
    slug: 'pantone-white-c',
    hex: '#FFFFFF',
    rgb: '255, 255, 255',
    cmyk: '0, 0, 0, 0',
    pantone: 'Pantone White C',
    hsl: '0, 0%, 100%',
    hsv: '0, 0%, 100%',
    description: `Pantone White C symbolizes purity, simplicity, and minimalism. It is widely used in modern branding and healthcare applications.`,
    conversions: [
      { format: 'HEX', value: '#FFFFFF' },
      { format: 'RGB', value: '255, 255, 255' },
      { format: 'CMYK', value: '0, 0, 0, 0' },
      { format: 'Pantone', value: 'White C' },
    ],
    usage: `Popular in clean aesthetics, medical branding, and minimalist designs.`,
    psychology: `White represents cleanliness, clarity, and new beginnings.`,
    relatedColors: getRelatedColors('FFFFFF', 'Pantone White C'),
  },
  {
    name: 'Pantone Red',
    slug: 'pantone-red',
    hex: '#ED1C24',
    rgb: '237, 28, 36',
    cmyk: '0, 100, 100, 0',
    pantone: 'Pantone 485 C',
    hsl: '0, 80%, 48%',
    hsv: '0, 91%, 85%',
    conversions: [
      { format: 'HEX', value: '#ED1C24' },
      { format: 'RGB', value: '237, 28, 36' },
      { format: 'CMYK', value: '0, 100, 100, 0' },
      { format: 'Pantone', value: '485 C' },
    ],
    description: `Pantone Red is a color of passion, excitement, and energy. It's commonly used in branding, sports teams, and warning signs due to its ability to grab attention instantly.`,
    usage: `Often used in marketing, fast food branding, and sports team logos to evoke urgency and enthusiasm.`,
    psychology: `Red is associated with power, love, and urgency. It stimulates appetite, making it popular in the food industry.`,
    relatedColors: getRelatedColors('ED1C24', 'Pantone 485 C'),
  },
  {
    name: 'Pantone Orange',
    slug: 'pantone-orange',
    hex: '#FE5000',
    rgb: '254, 80, 0',
    cmyk: '0, 70, 100, 0',
    pantone: 'Pantone 021 C',
    hsl: '20, 100%, 50%',
    hsv: '20, 100%, 100%',
    conversions: [
      { format: 'HEX', value: '#FE5000' },
      { format: 'RGB', value: '254, 80, 0' },
      { format: 'CMYK', value: '0, 70, 100, 0' },
      { format: 'Pantone', value: '021 C' },
    ],
    description: `Pantone Orange radiates warmth, energy, and creativity. This vibrant hue is commonly associated with enthusiasm, fun, and friendliness.`,
    usage: `Used in entertainment branding, children's products, and safety vests for visibility.`,
    psychology: `Orange is a cheerful and playful color that stimulates conversation and creativity.`,
    relatedColors: getRelatedColors('FE5000', 'Pantone 021 C'),
  },
  {
    name: 'Pantone Yellow',
    slug: 'pantone-yellow',
    hex: '#FFC72C',
    rgb: '255, 199, 44',
    cmyk: '0, 20, 100, 0',
    pantone: 'Pantone 109 C',
    hsl: '54, 100%, 60%',
    hsv: '54, 100%, 100%',
    conversions: [
      { format: 'HEX', value: '#FFC72C' },
      { format: 'RGB', value: '255, 199, 44' },
      { format: 'CMYK', value: '0, 20, 100, 0' },
      { format: 'Pantone', value: '109 C' },
    ],
    description: `Pantone Yellow symbolizes optimism, happiness, and warmth. It is often used in signage, branding, and advertising to grab attention.`,
    usage: `Seen in road signs, caution labels, and fast food branding to convey positivity and alertness.`,
    psychology: `Yellow is associated with energy and happiness but can also trigger caution in high-visibility applications.`,
    relatedColors: getRelatedColors('FFC72C', 'Pantone 109 C'),
  },
  {
    name: 'Pantone Blue',
    slug: 'pantone-blue',
    hex: '#0057B7',
    rgb: '0, 87, 183',
    cmyk: '100, 50, 0, 0',
    pantone: 'Pantone 293 C',
    hsl: '225, 100%, 36%',
    hsv: '225, 100%, 72%',
    conversions: [
      { format: 'HEX', value: '#0057B7' },
      { format: 'RGB', value: '0, 87, 183' },
      { format: 'CMYK', value: '100, 50, 0, 0' },
      { format: 'Pantone', value: '293 C' },
    ],
    description: `Pantone Blue is associated with trust, professionalism, and reliability. It is widely used in corporate and financial branding.`,
    usage: `Common in technology, banking, and government branding due to its authoritative appeal.`,
    psychology: `Blue promotes a sense of calm and trustworthiness, making it one of the most used corporate colors.`,
    relatedColors: getRelatedColors('0057B7', 'Pantone 293 C'),
  },
  {
    name: 'Pantone Purple',
    slug: 'pantone-purple',
    hex: '#5D3F91',
    rgb: '93, 63, 145',
    cmyk: '80, 90, 0, 0',
    pantone: 'Pantone 2685 C',
    hsl: '270, 50%, 41%',
    hsv: '270, 50%, 57%',
    conversions: [
      { format: 'HEX', value: '#5D3F91' },
      { format: 'RGB', value: '93, 63, 145' },
      { format: 'CMYK', value: '80, 90, 0, 0' },
      { format: 'Pantone', value: '2685 C' },
    ],
    description: `Pantone Purple symbolizes luxury, creativity, and mystery. It has long been associated with royalty and high-end branding.`,
    usage: `Popular in beauty, fashion, and premium branding to evoke sophistication and exclusivity.`,
    psychology: `Purple stimulates imagination and conveys a sense of creativity and elegance.`,
    relatedColors: getRelatedColors('5D3F91', 'Pantone 2685 C'),
  },
  {
    name: 'Pantone Pink',
    slug: 'pantone-pink',
    hex: '#E91E63',
    rgb: '233, 30, 99',
    cmyk: '0, 80, 40, 0',
    pantone: 'Pantone 226 C',
    hsl: '330, 80%, 52%',
    hsv: '330, 80%, 91%',
    conversions: [
      { format: 'HEX', value: '#E91E63' },
      { format: 'RGB', value: '233, 30, 99' },
      { format: 'CMYK', value: '0, 80, 40, 0' },
      { format: 'Pantone', value: '226 C' },
    ],
    description: `Pantone Pink is playful, romantic, and youthful. It is widely used in cosmetics, fashion, and entertainment branding.`,
    usage: `Seen in beauty products, feminine branding, and awareness campaigns like Breast Cancer Awareness.`,
    psychology: `Pink is associated with warmth, love, and kindness, creating a sense of comfort and approachability.`,
    relatedColors: getRelatedColors('E91E63', 'Pantone 226 C'),
  },
  {
    name: 'Pantone Brown',
    slug: 'pantone-brown',
    hex: '#6F4F28',
    rgb: '111, 79, 40',
    cmyk: '0, 30, 80, 70',
    pantone: 'Pantone 4625 C',
    hsl: '30, 50%, 30%',
    hsv: '30, 80%, 43%',
    conversions: [
      { format: 'HEX', value: '#6F4F28' },
      { format: 'RGB', value: '111, 79, 40' },
      { format: 'CMYK', value: '0, 30, 80, 70' },
      { format: 'Pantone', value: '4625 C' },
    ],
    description: `Pantone Brown represents earthiness, reliability, and warmth. It is often used in organic and rustic branding.`,
    usage: `Seen in coffee brands, wood-based products, and natural packaging to emphasize warmth and authenticity.`,
    psychology: `Brown evokes feelings of comfort, stability, and connection to nature.`,
    relatedColors: getRelatedColors('6F4F28', 'Pantone 4625 C'),
  },
];
