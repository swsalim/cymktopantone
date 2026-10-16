import FaqJsonLd from '@/components/structured-data/faq-json-ld';

function toPlainText(value: string) {
  return value.replace(/<[^>]+>/g, '');
}

export default function BlogFaq({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <>
      <FaqJsonLd
        questionListElement={items.map((item) => ({
          question: item.question,
          answer: toPlainText(item.answer),
        }))}
      />
      <div>
        {items.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        ))}
      </div>
    </>
  );
}
