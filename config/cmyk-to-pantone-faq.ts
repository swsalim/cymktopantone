/**
 * FAQs for the homepage CMYK → Pantone experience (tool + education).
 * Answers may include simple HTML for internal links (rendered by components/faq.tsx).
 */
export const cmykToPantoneFaqs: { question: string; answer: string }[] = [
  {
    question: 'Is a Pantone match from CMYK exact?',
    answer:
      'No conversion from CMYK to Pantone can be mathematically exact. CMYK is a small print gamut; Pantone spot colors often sit outside what four process inks can reproduce. Our tool finds the <strong>closest</strong> PMS swatch. Always confirm with a physical Pantone guide or a press proof on your stock before you lock brand approvals.',
  },
  {
    question: 'What does “closest match” mean here?',
    answer:
      'We compare your CMYK build to Pantone reference colors in color space and rank the nearest swatches. “Closest” is a numerical best fit—not a guarantee that your eye will prefer that swatch under your lighting, paper, or ink limits.',
  },
  {
    question: 'How do I get CMYK values from Illustrator, Photoshop, or InDesign?',
    answer:
      'In Adobe apps, open the Color panel or Color Picker, set the document or swatch to a CMYK profile your printer expects, and read C, M, Y, K as percentages. Exporting for print? Prefer <strong>Edit → Convert to Profile</strong> to the agreed CMYK profile first so the numbers you paste into the converter match what production will use.',
  },
  {
    question: 'Why do my CMYK numbers differ from the Pantone book’s suggested CMYK?',
    answer:
      'Pantone publishes <strong>recommended process builds</strong> for many swatches, but those builds are still approximations and vary by coated vs uncoated, region, and revision. Your design file might use a different CMYK profile than the book’s build. Treat book CMYK as a starting point, not a contract.',
  },
  {
    question: 'What is the difference between Pantone (spot) and CMYK (process)?',
    answer:
      'CMYK mixes four inks on press for full-color work. Pantone spot colors are pre-mixed inks (or dedicated channels) for predictable brand hues. Logos and packaging often specify spot colors for consistency; photos and gradients usually stay in CMYK.',
  },
  {
    question: 'Should I specify coated (C) or uncoated (U) Pantone?',
    answer:
      'Match the suffix your brand guidelines require. Coated and uncoated swatches are different ink films and paper behaviors—the same hue name can look quite different. If you are unsure, ask your printer which stock and Pantone system they are profiling.',
  },
  {
    question: 'Can I use the same Pantone on coated and uncoated stock interchangeably?',
    answer:
      'You should not assume interchangeability. Specify <strong>Pantone 185 C</strong> vs <strong>Pantone 185 U</strong> explicitly, proof on the actual material, and adjust if the brand allows alternate builds for different substrates.',
  },
  {
    question: 'Can I convert Pantone back to CMYK or HEX on this site?',
    answer:
      'Yes. Open our <a href="/convert-color" class="text-violet-600 dark:text-violet-400">converter index</a> and choose Pantone as the source—e.g. <a href="/convert-pantone-pms-to-cmyk" class="text-violet-600 dark:text-violet-400">Pantone to CMYK</a> or <a href="/convert-pantone-pms-to-hex" class="text-violet-600 dark:text-violet-400">Pantone to HEX</a>—after you pick a swatch.',
  },
  {
    question: 'I only have a CMYK PDF from my client. Can I still find a Pantone?',
    answer:
      'You can read the CMYK percentages from the PDF in your design app if the file is editable or inspect separations in preflight tools. Embedded profiles matter: convert or soft-proof to your production CMYK before matching so the converter sees the same numbers your printer will chase.',
  },
  {
    question: 'Is this site affiliated with Pantone LLC?',
    answer:
      'No. CMYK Pantone is an independent tool. <strong>Pantone®</strong> is a registered trademark of Pantone LLC. Values and matches are for reference; they are not a substitute for official Pantone products or licensing.',
  },
  {
    question: 'Where can I learn more about CMYK, RGB, and HEX?',
    answer:
      'Start with our <a href="/color-models" class="text-violet-600 dark:text-violet-400">color models overview</a>, then dive into <a href="/color-models/cmyk" class="text-violet-600 dark:text-violet-400">CMYK</a>, <a href="/color-models/rgb" class="text-violet-600 dark:text-violet-400">RGB</a>, or <a href="/color-models/hex" class="text-violet-600 dark:text-violet-400">HEX</a>. For other pairs, use the full <a href="/convert-color" class="text-violet-600 dark:text-violet-400">converter list</a>.',
  },
];
