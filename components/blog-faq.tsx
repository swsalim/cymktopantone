import FaqAnswer from '@/components/faq-answer';
import FaqJsonLd from '@/components/structured-data/faq-json-ld';

export default function BlogFaq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <>
      <FaqJsonLd questionListElement={items} />
      <div>
        {items.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>
              <FaqAnswer text={item.answer} />
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
