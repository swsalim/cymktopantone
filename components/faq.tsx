import FaqJsonLd from '@/components/structured-data/faq-json-ld';

export default function Faqs({
  tagline,
  description,
  data,
}: {
  tagline: string;
  description: string;
  data: { question: string; answer: string }[];
}) {
  return (
    <>
      <FaqJsonLd questionListElement={data} />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-base/7 font-medium text-violet-600 dark:text-violet-400">{tagline}</p>
        <h2 className="mt-2 text-pretty text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Frequently asked questions
        </h2>
        <p className="mt-6 text-base/7 text-gray-500 dark:text-gray-300">{description}</p>
      </div>
      <div className="mt-20">
        <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 sm:space-y-0 lg:gap-x-10">
          {data.map((item, index) => (
            <div key={index}>
              <dt className="text-base/7 font-semibold text-gray-900 dark:text-gray-50">
                {item.question}
              </dt>
              <dd
                className="mt-2 text-base/7 text-gray-500 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              />
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
