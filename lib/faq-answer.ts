/**
 * FAQ answers are markdown (links, bold, code), not HTML.
 * JSON-LD receives plain text. The UI renders links as elements so the
 * serialized payload never contains raw `href="..."` strings.
 */

export type FaqTextPart =
  | { type: 'text'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'code'; value: string }
  | { type: 'link'; label: string; href: string };

const TOKEN =
  /\[([^\]\n]+)\]\(([^)\s]+)\)|\*\*([^*\n]+)\*\*|`([^`\n]+)`|<a\b([^>]*)>([\s\S]*?)<\/a>|<Link\b([^>]*)>([\s\S]*?)<\/Link>|<strong>([\s\S]*?)<\/strong>|<code>([\s\S]*?)<\/code>/gi;

function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;|&#x0*27;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, '');
}

function readHref(attrs: string): string | null {
  const match = attrs.match(/href\s*=\s*(?:\\?"([^"\\]+)\\?"|'([^']+)')/i);
  const href = match?.[1] ?? match?.[2];
  if (!href) return null;
  return href.replace(/\\"/g, '');
}

function safeHref(href: string): string | null {
  const value = href.trim();
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  if (/^https?:\/\//i.test(value)) return value;
  return null;
}

export function parseFaqAnswer(answer: string): FaqTextPart[] {
  const parts: FaqTextPart[] = [];
  const source = answer ?? '';
  let cursor = 0;
  TOKEN.lastIndex = 0;

  for (const match of source.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      parts.push({ type: 'text', value: decodeEntities(stripTags(source.slice(cursor, index))) });
    }

    const [
      ,
      mdLabel,
      mdHref,
      bold,
      code,
      anchorAttrs,
      anchorLabel,
      linkAttrs,
      linkLabel,
      strongLabel,
      codeLabel,
    ] = match;

    if (mdLabel !== undefined && mdHref !== undefined) {
      const href = safeHref(decodeEntities(mdHref));
      const label = decodeEntities(stripTags(mdLabel));
      parts.push(href ? { type: 'link', label, href } : { type: 'text', value: label });
    } else if (bold !== undefined) {
      parts.push({ type: 'bold', value: decodeEntities(stripTags(bold)) });
    } else if (code !== undefined) {
      parts.push({ type: 'code', value: decodeEntities(stripTags(code)) });
    } else if (anchorAttrs !== undefined || linkAttrs !== undefined) {
      const href = safeHref(readHref(anchorAttrs ?? linkAttrs ?? '') ?? '');
      const label = decodeEntities(stripTags(anchorLabel ?? linkLabel ?? ''));
      parts.push(href ? { type: 'link', label, href } : { type: 'text', value: label });
    } else if (strongLabel !== undefined) {
      parts.push({ type: 'bold', value: decodeEntities(stripTags(strongLabel)) });
    } else if (codeLabel !== undefined) {
      parts.push({ type: 'code', value: decodeEntities(stripTags(codeLabel)) });
    }

    cursor = index + match[0].length;
  }

  if (cursor < source.length) {
    parts.push({ type: 'text', value: decodeEntities(stripTags(source.slice(cursor))) });
  }

  return parts.filter((part) => part.type !== 'text' || part.value.length > 0);
}

export function faqAnswerToPlainText(answer: string): string {
  return parseFaqAnswer(answer)
    .map((part) => (part.type === 'link' ? part.label : part.value))
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

export function isExternalFaqHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}
