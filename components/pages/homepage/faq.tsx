import FaqJsonLd from '@/components/structured-data/faq-json-ld';

const faqs = [
  {
    id: 1,
    category: 'General',
    question: 'What does Color Mapper do?',
    answer:
      'Color Mapper is a free color toolkit: a palette generator, interactive color wheel, gradient generator, WCAG contrast checker, print gamut checker, color comparator, tint and shade scale builder, image palette extractor, color blindness simulator, and 18 converters between RGB, CMYK, HEX, HSL, and HSV.',
  },
  {
    id: 2,
    category: 'General',
    question: 'Do I need an account?',
    answer:
      'No. Every tool runs in the browser and you can copy values or export code without signing up.',
  },
  {
    id: 3,
    category: 'General',
    question: 'How is this different from other palette generators?',
    answer:
      'Every swatch shows its CMYK values and warns you when a color sits outside the print gamut, so palettes survive the jump from screen to press. Exports come as CSS variables, Tailwind config, or JSON tokens.',
  },
  {
    id: 4,
    category: 'General',
    question: 'Is RGB to CMYK conversion always exact?',
    answer:
      'RGB and CMYK use different color gamuts, so some screen colors shift when printed. The converters flag out-of-gamut colors — but always review a print proof for final production work.',
  },
  {
    id: 5,
    category: 'General',
    question: 'Where can I learn about color models?',
    answer:
      'Read our guides to CMYK, RGB, HEX, HSL, and HSV under Color models in the navigation, or start with the blog articles on contrast, print-safe palettes, and Tailwind scales.',
  },
];

export default function GeneralFaqs() {
  return (
    <>
      <FaqJsonLd questionListElement={faqs} />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base/7 font-medium text-violet-600 dark:text-violet-400">
          Color tools, explained
        </p>
        <h2 className="font-heading mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Frequently asked questions
        </h2>
        <p className="mt-6 text-base/7 text-gray-500 dark:text-gray-300">
          Common questions about the palette, contrast, and conversion tools.
        </p>
      </div>
      <div className="mt-20">
        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
          {faqs.map((faq) => (
            <div key={faq.id}>
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-gray-50">
                {faq.question}
              </dt>
              <dd className="mt-2 text-base/7 text-gray-500 dark:text-gray-300">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
