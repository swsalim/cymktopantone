import { faqAnswerToPlainText } from '@/lib/faq-answer';

import JsonLd from '@/components/structured-data/json-ld';

export default function FaqJsonLd({
  questionListElement,
}: {
  questionListElement: {
    id?: number;
    category?: string;
    question: string;
    answer: string;
  }[];
}) {
  const listElement = questionListElement.map((item) => {
    return {
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faqAnswerToPlainText(item.answer),
      },
    };
  });

  return (
    <JsonLd id="faq-jsonld">
      {{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: listElement,
      }}
    </JsonLd>
  );
}
