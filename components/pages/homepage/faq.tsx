import FaqJsonLd from '@/components/structured-data/faq-json-ld';

const faqs = [
  {
    id: 1,
    category: 'General',
    question: 'What does this site do?',
    answer:
      'CMYK Pantone offers free color converters between CMYK, RGB, HEX, HSL, HSV, and Pantone (PMS). The homepage focuses on CMYK to Pantone matching for print and brand work.',
  },
  {
    id: 2,
    category: 'General',
    question: 'Is a Pantone match from CMYK or HEX exact?',
    answer:
      'We show the closest Pantone color numerically. Ink, paper, and lighting still change appearance—always confirm with a physical swatch or press proof for final production.',
  },
  {
    id: 3,
    category: 'General',
    question: 'Do I need an account?',
    answer: 'No. Tools run in the browser and you can copy values without signing up.',
  },
  {
    id: 4,
    category: 'General',
    question: 'Where can I learn about color models?',
    answer:
      'Read our guides to CMYK, RGB, HEX, HSL, and HSV under Color models in the navigation, or open the full converter index from the menu.',
  },
  {
    id: 5,
    category: 'General',
    question: 'Can I convert Pantone to CMYK or HEX?',
    answer:
      'Yes. Use the Pantone picker tools to jump from a swatch to CMYK, HEX, RGB, HSL, or HSV values for handoff to developers or printers.',
  },
];

export default function GeneralFaqs() {
  return (
    <>
      <FaqJsonLd questionListElement={faqs} />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base/7 font-medium text-violet-600 dark:text-violet-400">
          Color conversion, explained
        </p>
        <h2 className="font-heading mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Frequently asked questions
        </h2>
        <p className="mt-6 text-base/7 text-gray-500 dark:text-gray-300">
          Common questions about Pantone matching and our free converters.
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
