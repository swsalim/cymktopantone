import relatedColorsData from '../data/related-colors';

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
  shortDescription: string;
  conversions: ColorConversion[];
  usage: string;
  psychology: string;
  relatedColors: RelatedColor[];
}

function getRelatedColors(slug: string): RelatedColor[] {
  return relatedColorsData[slug as keyof typeof relatedColorsData] || [];
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
    shortDescription:
      'A vibrant green representing nature, growth, and sustainability, ideal for eco-friendly branding.',
    conversions: [
      { format: 'HEX', value: '#00A550' },
      { format: 'RGB', value: '0, 165, 80' },
      { format: 'CMYK', value: '100, 0, 80, 10' },
      { format: 'Pantone', value: '354 C' },
    ],
    usage:
      'Use Pantone Green for primary brand marks, packaging accents, and campaign graphics when you want an unmistakable “natural” signal without feeling muted. It works well on coated stock for punch, and as a secondary color paired with warm neutrals or deep navy for contrast. In UI, reserve strong greens for success states, progress, and eco badges so they stay meaningful rather than decorative. For print, specify coated vs. uncoated (C vs. U) up front—ink film changes how vibrant the green reads on the final substrate.',
    psychology:
      'People tend to read green as restorative, balanced, and tied to growth, which is why it shows up in wellness, outdoors, and sustainability narratives. It usually feels less aggressive than red or orange, so it can carry authority in finance or healthcare when you want calm confidence rather than alarm. Too much saturated green next to clashing reds can feel “holiday” by accident; controlling saturation and surrounding neutrals keeps the mood intentional. Lighter tints often feel fresher and more digital-friendly; deeper shades read more premium and grounded.',
    relatedColors: getRelatedColors('pantone-green'),
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
    shortDescription:
      'A deep blue representing trust, stability, and professionalism, ideal for corporate branding.',
    conversions: [
      { format: 'HEX', value: '#002366' },
      { format: 'RGB', value: '0, 35, 102' },
      { format: 'CMYK', value: '100, 85, 0, 60' },
      { format: 'Pantone', value: '281 C' },
    ],
    usage:
      'Royal Blue is a strong choice for logos, letterhead, and digital headers when the brand story is stability, expertise, or public trust. On print, it holds up well in single-color or two-color systems; on screen, check contrast against white and light gray text to keep body copy readable. Pair it with warm grays or a restrained accent (gold, orange, or red) when you need energy without losing the “institutional” feel. Always align with your Pantone suffix (C/U) and proof on the actual paper or signage material—deep blues shift noticeably under different coatings.',
    psychology:
      'Dark blues often signal competence, order, and reliability, which is why they dominate banking, enterprise tech, and civic design. The hue can feel serious or distant if overused without warmth—balance it with human photography, rounded type, or softer secondary colors when approachability matters. In dense interfaces, large fields of saturated blue can feel heavy; using it for navigation, key actions, and brand anchors while keeping content areas lighter preserves hierarchy. Cultural associations vary, but in many Western markets blue remains one of the safest “default trust” colors.',
    relatedColors: getRelatedColors('pantone-royal-blue'),
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
    shortDescription:
      'A neutral gray representing balance and sophistication, versatile for modern and traditional designs.',
    conversions: [
      { format: 'HEX', value: '#808080' },
      { format: 'RGB', value: '128, 128, 128' },
      { format: 'CMYK', value: '0, 0, 0, 50' },
      { format: 'Pantone', value: 'Cool Gray 8 C' },
    ],
    usage:
      'Mid neutrals like Cool Gray 8 excel as backgrounds, dividers, and typography in product UI, editorial layouts, and architectural branding where photography or color accents should lead. In print, gray can unify disparate campaign assets; just watch total ink limits and paper brightness, which change how “warm” or “cool” the gray feels. Use a stepped gray scale (three to five values) for consistent hierarchy instead of many one-off percentages. When gray carries the brand alone, texture, foil, or embossing can add luxury cues that flat color cannot.',
    psychology:
      'Neutral grays read as modern, understated, and professional—ideal when you want the message to feel factual rather than emotional. Too much gray without accent or imagery can feel sterile; a single bold accent or rich black for type restores warmth and focus. Cool grays often feel tech-forward; warmer grays feel more residential or artisan. Because gray adapts to context, test it in both dark-mode and light-mode digital environments if the brand spans apps and marketing sites.',
    relatedColors: getRelatedColors('pantone-grey'),
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
    shortDescription:
      'A vibrant red symbolizing passion, energy, and urgency, perfect for impactful branding and sports.',
    conversions: [
      { format: 'HEX', value: '#DA291C' },
      { format: 'RGB', value: '218, 41, 28' },
      { format: 'CMYK', value: '0, 100, 91, 0' },
      { format: 'Pantone', value: '485 C' },
    ],
    usage: `485 C–level reds are built for high-attention moments: sale tags, “order now” strips, sports identities, and packaging that must pop on a crowded shelf. In digital, use strong reds sparingly for errors, destructive actions, and critical alerts so users do not tune them out. For print, large red fields can be ink-heavy—discuss drying time and scuff resistance with your printer on packaging runs. Pair with plenty of white space or deep neutrals so the red feels intentional rather than chaotic.`,
    psychology: `Red is one of the fastest hues to grab attention, which makes it powerful for urgency, passion, and appetite-led categories. It can also read as warning or danger, so context (copy, iconography, placement) steers whether it feels exciting or alarming. In interfaces, all-red buttons compete with each other; reserve the strongest red for the single most important action. Cultural meanings differ—always validate palette choices for your primary markets.`,
    relatedColors: getRelatedColors('pantone-485-c'),
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
    shortDescription:
      'An intense orange radiating warmth and energy, ideal for sports, entertainment, and safety applications.',
    conversions: [
      { format: 'HEX', value: '#FE5000' },
      { format: 'RGB', value: '254, 80, 0' },
      { format: 'CMYK', value: '0, 70, 100, 0' },
      { format: 'Pantone', value: '021 C' },
    ],
    usage: `021 C–style orange is a workhorse for youth-oriented brands, outdoor gear, Halloween or autumn campaigns, and anything that needs friendly energy without the aggression of pure red. It performs well on merchandise and signage where distance legibility matters. On the web, test orange buttons and links for contrast against white and gray—WCAG compliance often requires a slightly darker or more red-shifted orange. In packaging, orange can signal flavor (citrus) or value tiers; keep typography weight high for small-format labels.`,
    psychology: `Orange usually reads as enthusiastic, approachable, and creative—less formal than corporate blue, less intense than emergency red. It can feel budget-forward in some categories if paired with harsh primaries; pairing it with charcoal, cream, or deep green elevates the perceived quality. Because it sits between red and yellow on the wheel, small shifts in hue change whether it feels “hot,” “fruity,” or “industrial safety.” Use photography and illustration style to anchor the emotional story.`,
    relatedColors: getRelatedColors('pantone-021-c'),
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
    shortDescription:
      'A bright yellow representing optimism and happiness, perfect for attention-grabbing branding and signage.',
    conversions: [
      { format: 'HEX', value: '#FFC72C' },
      { format: 'RGB', value: '255, 199, 44' },
      { format: 'CMYK', value: '0, 20, 100, 0' },
      { format: 'Pantone', value: '109 C' },
    ],
    usage: `Bright yellows excel for wayfinding, caution stripes, school-bus visibility, and cheerful consumer brands that want optimism at a glance. In print, yellow tints can be delicate—large pale yellow backgrounds may look uneven on uncoated stock, so discuss solids vs. screens with production. Digitally, pure yellow on white fails contrast for small text; use yellow for fills and shapes, not microcopy, unless you add a dark outline or drop it onto a dark field. For brand systems, define a darker “anchor” yellow or companion color for accessible typography.`,
    psychology: `Yellow often reads as sunny, open, and energetic, which supports education, food, and lifestyle storytelling. The same hue can flip to “caution” when paired with black stripes or warning iconography—context drives meaning. Very saturated yellow can feel cheap or loud in luxury settings; gold metallics or mustard tones shift the mood toward premium. In UI, yellow highlights draw the eye quickly but fatigue if overused across every notification.`,
    relatedColors: getRelatedColors('pantone-109-c'),
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
    shortDescription:
      'A rich green symbolizing nature and sustainability, popular with eco-friendly brands and organic products.',
    conversions: [
      { format: 'HEX', value: '#00A550' },
      { format: 'RGB', value: '0, 165, 80' },
      { format: 'CMYK', value: '100, 0, 80, 10' },
      { format: 'Pantone', value: '354 C' },
    ],
    usage: `354 C is a confident, saturated green for logos, retail signage, and digital hero sections where “fresh” and “alive” should be immediate. It pairs naturally with white for clinical cleanliness, with earth tones for organic cues, and with blues for environmental tech stories. Specify print conditions early: what looks vibrant on a coated brochure may look darker on corrugated board. For apps and dashboards, use this green for positive trends and confirmations, not for generic decoration, so the signal stays clear.`,
    psychology: `This green typically signals vitality, renewal, and outdoor connection—useful for sustainability, food, and active-lifestyle brands. It can also imply “go” or approval in interfaces, which overlaps with traffic and game metaphors—be deliberate when mixing those patterns. Deep greens can feel premium and grounded; neon-bright greens feel more tech or athletic. Balance with human stories or warm neutrals if you want to avoid a purely “corporate eco” cliché.`,
    relatedColors: getRelatedColors('pantone-green'),
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
    shortDescription:
      'A bold blue representing trust and professionalism, ideal for corporate branding and sports teams.',
    conversions: [
      { format: 'HEX', value: '#0057B7' },
      { format: 'RGB', value: '0, 87, 183' },
      { format: 'CMYK', value: '100, 50, 0, 0' },
      { format: 'Pantone', value: '293 C' },
    ],
    usage: `293 C is a classic corporate and sports blue: strong on jerseys, app icons, presentation decks, and annual reports. It works as a full brand field or as an accent against white, silver, or red. For merchandise, embroidery and screen printing can shift the hue cooler or warmer—request a sewn sample or strike-off. On the web, pair with accessible grays for body text and reserve this blue for headers, links, and primary buttons to keep scanning patterns predictable.`,
    psychology: `This shade leans into confidence, clarity, and dependability—why it anchors so many global enterprises and team identities. It can feel cool or distant without warmer photography or secondary accents; cream, orange, or green can humanize the palette. In product UI, blue links and buttons are widely understood, which aids usability but also means differentiation must come from layout, motion, and voice—not color alone.`,
    relatedColors: getRelatedColors('pantone-293-c'),
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
    shortDescription:
      'A luxurious purple associated with royalty and creativity, perfect for high-end and luxury branding.',
    conversions: [
      { format: 'HEX', value: '#5D3F91' },
      { format: 'RGB', value: '93, 63, 145' },
      { format: 'CMYK', value: '80, 90, 0, 0' },
      { format: 'Pantone', value: '2685 C' },
    ],
    usage: `2685 C suits premium packaging, fragrance cartons, velvet-touch print finishes, and editorial covers where depth and drama matter. It pairs elegantly with metallics, soft pinks, or deep charcoal for high-contrast luxury layouts. On screen, deep purples can band or crush in video gradients—test compression and OLED black levels. For inclusive campaigns, avoid leaning only on “royalty” clichés; pair purple with modern typography and diverse imagery so the story feels current.`,
    psychology: `Purple often maps to creativity, mystery, and elevated taste—historically tied to rarity and expense. Lighter lavenders can feel gentle or nostalgic; deep violets feel bold and contemporary. In some markets purple skews feminine in beauty contexts; in others it reads as tech-forward (creative software, audio gear). Use saturation and lighting in photography to steer between playful and majestic.`,
    relatedColors: getRelatedColors('pantone-2685-c'),
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
    shortDescription:
      'A vibrant pink conveying femininity and fun, ideal for cosmetics, fashion, and pop culture branding.',
    conversions: [
      { format: 'HEX', value: '#E91E63' },
      { format: 'RGB', value: '233, 30, 99' },
      { format: 'CMYK', value: '0, 80, 40, 0' },
      { format: 'Pantone', value: '226 C' },
    ],
    usage: `226 C–level pinks shine in cosmetics, fashion lookbooks, event branding, and social-first campaigns that want vibrancy on small screens. For packaging, consider matte vs. gloss varnish—gloss can push pink toward “plastic toy” if not balanced with typography and structure. In UI, hot pinks make strong secondary actions or highlights; ensure text on pink passes contrast guidelines or place copy on white cards instead. Cause-marketing pink needs sensitivity to narrative and community voice, not just color drops.`,
    psychology: `Bright pink often reads as energetic, affectionate, and youthful, though modern branding increasingly treats pink as a neutral power accent beyond gendered defaults. Softer pinks can feel calming in wellness; electric pinks feel nightlife or creator-economy bold. Pairing pink with black, navy, or kelly green changes the vibe from “sweet” to “street” quickly—test mood boards with real audiences when repositioning.`,
    relatedColors: getRelatedColors('pantone-226-c'),
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
    shortDescription:
      'A sophisticated neutral gray representing balance and professionalism, perfect for modern design.',
    conversions: [
      { format: 'HEX', value: '#A7A8AA' },
      { format: 'RGB', value: '167, 168, 170' },
      { format: 'CMYK', value: '0, 0, 0, 50' },
      { format: 'Pantone', value: 'Cool Gray 6 C' },
    ],
    usage: `Cool Gray 6 is ideal for interior trim on reports, automotive UI chrome-adjacent accents, and packaging systems that need a lighter neutral than mid-gray. It separates content blocks in presentations without the harshness of black rules. On uncoated papers it may read warmer; calibrate proofs if brand consistency spans coated brochures and kraft mailers. Digitally, use it for dividers, disabled states (with non-color cues), and secondary metadata text.`,
    psychology: `Lighter cool grays feel airy, modern, and precise—common in SaaS and automotive aesthetics. They can wash out on cheap projectors or bright outdoor screens; keep critical icons and text on higher-contrast pairings for those contexts. Emotionally, pale neutrals recede so photography and accent colors lead—great for editorial and catalog layouts.`,
    relatedColors: getRelatedColors('pantone-cool-gray-6-c'),
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
    shortDescription:
      'A timeless black representing power and sophistication, ideal for luxury branding and fashion.',
    conversions: [
      { format: 'HEX', value: '#101820' },
      { format: 'RGB', value: '16, 24, 32' },
      { format: 'CMYK', value: '0, 0, 0, 100' },
      { format: 'Pantone', value: 'Black C' },
    ],
    usage: `Pantone Black C is a designer favorite for wordmarks, fashion labels, luxury packaging interiors, and high-contrast editorial type. In print, rich black builds (adding other inks) deepen large fields but require printer agreement—pure K black is safer for small type. On textiles and leather debossing, black reads differently than on coated paper; sample each substrate. Digitally, soft black (#101820 style) reduces eye strain versus pure #000000 on OLED displays while staying on-brand.`,
    psychology: `Black signals formality, power, and exclusivity—hence its dominance in fashion, automotive, and premium goods. It can feel severe without texture, photography, or material contrast (matte vs. gloss). In UI, true black backgrounds are a deliberate aesthetic; ensure elevation, borders, or shadows separate layers so interfaces do not flatten. Culturally, black carries mourning or rebellion associations—always weigh local context for global launches.`,
    relatedColors: getRelatedColors('pantone-black-c'),
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
    shortDescription:
      'A pure white representing simplicity and minimalism, ideal for modern branding and healthcare.',
    conversions: [
      { format: 'HEX', value: '#FFFFFF' },
      { format: 'RGB', value: '255, 255, 255' },
      { format: 'CMYK', value: '0, 0, 0, 0' },
      { format: 'Pantone', value: 'White C' },
    ],
    usage: `White C supports spa and clinical identities, minimalist packaging, gallery walls, and digital layouts that rely on whitespace hierarchy. In print, “white” is often the paper color—specify unprinted margins and knockouts clearly so imposition does not add unintended screens. For product UI, white cards on light gray app backgrounds improve scannability; for OOH, pure white panels need maintenance plans. Pair with a single strong accent plus black type for timeless Swiss-style systems.`,
    psychology: `White reads as clean, open, and honest—useful for healthcare, beauty, and tech that want a “blank canvas” feeling. Too much undifferentiated white can feel unfinished; grid, typography, and photography carry the design. In some cultures white associates with purity or mourning differently—validate palette narratives for key regions. Contrast and shadow become the emotional carriers when chroma is minimal.`,
    relatedColors: getRelatedColors('pantone-white-c'),
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
    shortDescription:
      'A passionate red representing energy and excitement, perfect for impactful branding and sports teams.',
    usage: `The Pantone Red family is built for campaigns that must interrupt scrolling: retail windows, poster headlines, app badges, and sports merchandise. Rotate reds with neutrals in long-form reading environments so fatigue does not set in. Food brands often anchor packaging red with appetizing photography and warm yellows; tech brands may pair red with black for a sharper edge. Always proof reds under store lighting and mobile night modes—screens and print rarely match without adjustment.`,
    psychology: `Red communicates heat, desire, and immediacy, which supports romance, competition, and limited-time offers. It can also heighten stress if overused in productivity tools—reserve it for true errors or critical deadlines. Appetite associations help QSR categories but may feel off-brand for sleep or meditation apps. Layer storytelling (texture, people, motion) so the hue does not carry the entire message alone.`,
    relatedColors: getRelatedColors('pantone-red'),
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
    shortDescription:
      'A vibrant orange radiating warmth and creativity, ideal for fun and friendly branding.',
    usage: `Pantone Orange fits streaming promos, festival posters, toy aisles, and CTA buttons where friendliness should feel loud but not alarming. It differentiates secondary actions from primary red CTAs in ecommerce flows when used consistently. For safety gear, compliance specs may dictate specific fluorescent formulas—treat brand orange as separate from regulatory high-vis colors. In print, orange can be sensitive to skin-tone adjacency in photography; adjust surrounding hues in retouching if casts appear.`,
    psychology: `Orange invites spontaneity and social energy—great for community platforms, workshops, and entertainment. It sits between the urgency of red and the anxiety of yellow, which can feel “active but not panicked” when tuned well. In luxury, orange is unconventional; use it as a sharp accent rather than a dominant field unless the brand strategy is deliberately disruptive.`,
    relatedColors: getRelatedColors('pantone-021-c'),
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
    shortDescription:
      'A bright yellow representing optimism and happiness, perfect for attention-grabbing signage and branding.',
    usage: `Pantone Yellow supports cheerful retail signage, taxi and delivery branding, breakfast categories, and education products. For digital ads on social feeds, yellow thumbnails stop thumbs—but pair with bold type for message clarity at small sizes. In print, yellow + black remains a legibility classic for warnings; for premium brands, shift toward mustard or gold-ink finishes instead of pure primaries. Manage ink opacity on kraft stocks to avoid muddiness.`,
    psychology: `Yellow leans optimistic and stimulating, which helps learning, leisure, and food contexts. The same hue in striped patterns flips to hazard—pairing and iconography matter more than the hex. Extended exposure to bright yellow backgrounds can feel abrasive; alternate with white or soft gray breathing room in long scroll experiences.`,
    relatedColors: getRelatedColors('pantone-109-c'),
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
    shortDescription:
      'A trustworthy blue representing professionalism and reliability, ideal for corporate and financial branding.',
    usage: `Pantone Blue anchors fintech dashboards, civic portals, airline apps, and B2B software where users expect orderly, credible visuals. Use it for navigation shells, data visualization series (with non-color differentiation too), and trust badges. When every competitor is also blue, differentiation comes from illustration, motion, and voice—consider a distinctive secondary accent. Large blue photography overlays should be tested for skin-tone fidelity and accessibility.`,
    psychology: `Blue broadly signals calm, clarity, and integrity—useful for institutions handling money, health, or personal data. Excessive blue without warmth can feel cold or bureaucratic; human faces, rounded UI, or warm neutrals offset that. Lighter blues feel airy and social; deeper blues feel stately. Map meanings to your category: healthcare blues often skew cleaner; social apps skew brighter.`,
    relatedColors: getRelatedColors('pantone-293-c'),
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
    shortDescription:
      'A luxurious purple representing creativity and mystery, perfect for high-end and luxury branding.',
    usage: `Pantone Purple supports indie beauty, creative agencies, spiritual wellness, and premium confectionery where differentiation from “safe” blue-red palettes helps shelf impact. It works on dark mode UI as accent lines, toggles, and illustration fills. For global retail, check cultural associations—purple can read regal, mystical, or playful depending on region and category. Metallic purple foils and spot UV can elevate packaging without raising saturation in the base ink.`,
    psychology: `Purple blends the stability of blue with the energy of red, so it often reads as imaginative, luxurious, or unconventional. Pastel purples skew gentle or nostalgic; electric purples skew gaming or nightlife. In corporate contexts, use purple sparingly to signal innovation teams or creative sub-brands without unsettling core blue identities.`,
    relatedColors: getRelatedColors('pantone-2685-c'),
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
    shortDescription:
      'A playful pink representing romance and youth, ideal for cosmetics, fashion, and entertainment branding.',
    usage: `Pantone Pink fits cosmetics, confectionery, dating apps, and creator merch where bold friendliness should read instantly on mobile. For packaging, soft-touch coatings make hot pink feel more premium; cheap gloss can skew toy-aisle. In data viz, pink can encode a second series—avoid implying gender unless the dataset truly calls for it. Pair with teal, charcoal, or lime for contemporary palettes that escape vintage clichés.`,
    psychology: `Pink often communicates care, softness, and celebration—useful for community, self-care, and lifestyle brands. It is no longer confined to gendered marketing; context and typography steer whether it feels retro, punk, or minimalist. Very light pinks can soothe; saturated magentas energize. Test with color-blind simulation when pink encodes meaning next to red or orange.`,
    relatedColors: getRelatedColors('pantone-226-c'),
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
    shortDescription:
      'An earthy brown representing reliability and warmth, perfect for organic and rustic branding.',
    usage: `Pantone Brown supports coffee, chocolate, leather goods, outdoor gear, and artisanal food branding where earth cues build trust. It performs on kraft substrates and uncoated papers where richer blacks might feel harsh. In UI, brown works for backgrounds in reading apps or rustic ecommerce themes—watch contrast for buttons and links. Photography of grain, wood, and soil reinforces the palette; without texture, brown can feel flat.`,
    psychology: `Brown reads grounded, honest, and durable—associations drawn from soil, wood, and roasted flavors. Lighter tans feel casual or summery; deep espressos feel premium. Too much flat brown can feel dated; crisp white type, sage green, or copper foil modernizes the story. In tech, brown is rare—use it when authenticity or heritage is the differentiator.`,
    relatedColors: getRelatedColors('pantone-brown'),
  },
  {
    name: 'Pantone 342 C',
    slug: 'pantone-342-c',
    hex: '#006747',
    rgb: '0, 103, 71',
    cmyk: '100, 0, 31, 60',
    pantone: 'Pantone 342 C',
    hsl: '161, 100%, 20%',
    hsv: '161, 100%, 40%',
    conversions: [
      { format: 'HEX', value: '#006747' },
      { format: 'RGB', value: '0, 103, 71' },
      { format: 'CMYK', value: '100, 0, 31, 60' },
      { format: 'Pantone', value: '342 C' },
    ],
    description: `Pantone 342 C is a deep, rich green that symbolizes growth, stability, and natural harmony. This dark forest green is often associated with environmental consciousness and premium branding.`,
    shortDescription:
      'A deep forest green symbolizing growth and stability, ideal for environmental and premium branding.',
    usage: `342 C is a deep, trustworthy green for banks that want an organic edge, outdoor retailers, and premium CPG brands signaling longevity over neon “eco” tropes. It holds up in embroidered apparel and debossed leather tags. On screen, use it for nav bars and KPI highlights; pair with warm off-whites to avoid a chilly hospital feel. Specify lighting for retail graphics—this green can look almost black in dim environments.`,
    psychology: `Dark forest greens signal resilience, heritage, and measured growth—less “startup bright” than spring greens. They can feel serious and upscale when paired with gold, cream, or charcoal. In sustainability messaging, deeper greens imply maturity and commitment rather than trend-chasing; support with concrete proof points so color is not doing all the ethical lifting.`,
    relatedColors: getRelatedColors('pantone-342-c'),
  },
  {
    name: 'Pantone 1837 C',
    slug: 'pantone-1837-c',
    hex: '#81D8D0',
    rgb: '129, 216, 208',
    cmyk: '46, 0, 23, 0',
    pantone: 'Pantone 1837 C',
    hsl: '175, 50%, 68%',
    hsv: '175, 40%, 85%',
    description: `Pantone 1837 C, famously known as Tiffany Blue, is the iconic robin's egg blue color associated with luxury jewelry brand Tiffany & Co. This distinctive shade was officially standardized by Pantone in 2001 as a private custom color, ensuring consistent reproduction across all brand materials.`,
    shortDescription:
      "The iconic Tiffany Blue, a luxurious robin's egg blue representing elegance and exclusivity.",
    conversions: [
      { format: 'HEX', value: '#81D8D0' },
      { format: 'RGB', value: '129, 216, 208' },
      { format: 'CMYK', value: '46, 0, 23, 0' },
      { format: 'Pantone', value: '1837 C' },
    ],
    usage: `1837 C is a proprietary brand color tied to Tiffany & Co.—treat it as reference inspiration unless you have explicit licensing. Designers study it to understand how a single recognizable tint can carry an entire unboxing experience across boxes, ribbons, digital campaigns, and retail environments. If you are building your own premium palette, borrow the lesson (consistent substrate, lighting, and photography) rather than the exact swatch. Always respect trademark and brand-guideline constraints in client work.`,
    psychology: `Robin’s-egg blues often read as celebratory, refined, and gift-oriented because of decades of cultural association with jewelry and milestones. The emotional lift comes from context—type, materials, and service—not from the RGB numbers alone. For unrelated categories, similar hues can feel spa-like or coastal instead; test naming and visuals so you do not unintentionally echo another brand’s equity.`,
    relatedColors: getRelatedColors('pantone-1837-c'),
  },
];
