import Link from 'next/link';

import { isExternalFaqHref, parseFaqAnswer } from '@/lib/faq-answer';

export default function FaqAnswer({ text }: { text: string }) {
  const parts = parseFaqAnswer(text);

  return (
    <>
      {parts.map((part, index) => {
        if (part.type === 'bold') return <strong key={index}>{part.value}</strong>;
        if (part.type === 'code') return <code key={index}>{part.value}</code>;
        if (part.type === 'link') {
          if (isExternalFaqHref(part.href)) {
            return (
              <a key={index} href={part.href} target="_blank" rel="noopener noreferrer">
                {part.label}
              </a>
            );
          }
          return (
            <Link key={index} href={part.href}>
              {part.label}
            </Link>
          );
        }
        return <span key={index}>{part.value}</span>;
      })}
    </>
  );
}
