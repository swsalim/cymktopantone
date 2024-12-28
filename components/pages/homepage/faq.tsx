import FaqJsonLd from '@/components/structured-data/faq-json-ld';

const faqs = [
  {
    id: 1,
    category: 'General',
    question: 'What is this tool for?',
    answer:
      "Not happy with your photo? Try flipping it! A quick horizontal or vertical flip can transform your image, adding a fresh perspective or creating an entirely new visual effect. It's an easy way to breathe new life into a shot that didn't quite work the first time.",
  },
  {
    id: 6,
    category: 'General',
    question: 'When would you need to flip an image?',
    answer:
      "Have you ever looked at a photo and thought, \"Something just doesn't feel right\"? Sometimes, simply flipping an image can work magic. It's like giving your picture a quick makeover. When you flip a photo, you can change how it catches your eye. We naturally tend to scan images from left to right, so a flip can make the photo feel more balanced and interesting. It's almost like rearranging furniture - a small change that can completely transform the feel of the whole scene.",
  },
  {
    id: 2,
    category: 'General',
    question: 'Is the tool free to use?',
    answer: 'Yes, this tool is completely free to use and requires no sign-up or login.',
  },
  {
    id: 3,
    category: 'General',
    question: 'What file formats are supported?',
    answer: 'You can upload images in popular formats like JPEG, PNG, and WebP.',
  },
  {
    id: 4,
    category: 'General',
    question: 'Will my uploaded images be stored on the server?',
    answer:
      'No, your images are processed in real-time and not stored on our servers to ensure your privacy.',
  },
];

export default function GeneralFaqs() {
  return (
    <>
      <FaqJsonLd questionListElement={faqs} />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base/7 font-medium text-violet-600 dark:text-violet-400">
          You have full rights and ownership of your photos
        </p>
        <h2 className="mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Frequently asked questions
        </h2>
        <p className="mt-6 text-base/7 text-gray-500 dark:text-gray-300">
          Answers to common questions about our free image flipper.
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
