import { SLink } from '@soybeanjs/ui';

export function toTypeAnchorId(typeName: string) {
  const normalized = typeName
    .trim()
    .replace(/[^A-Za-z0-9_]+/g, '-')
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/_+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

  return `type-${normalized}`;
}

type TypePart = { text: string; isLink?: boolean };

const BUILTIN_TYPE_NAMES = new Set([
  'Array',
  'Record',
  'Partial',
  'Pick',
  'Omit',
  'Exclude',
  'Extract',
  'NonNullable',
  'Readonly',
  'Required',
  'Promise',
  'Map',
  'Set',
  'Date',
  'RegExp',
  'VNode',
  'Component',
  'IconifyIcon',
  'MaybePromise',
  'HTMLAttributes'
]);

function splitTypeParts(typeText: string): TypePart[] {
  if (!typeText) {
    return [{ text: '—' }];
  }

  const parts: TypePart[] = [];

  const re = /\b[A-Z][A-Za-z0-9_]*\b/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(typeText))) {
    const [word] = match;
    const start = match.index;

    if (start > lastIndex) {
      parts.push({ text: typeText.slice(lastIndex, start) });
    }

    const isLink = !BUILTIN_TYPE_NAMES.has(word) && checkFirstLetterIsUpperCase(word);
    parts.push({ text: word, isLink });
    lastIndex = start + word.length;
  }

  if (lastIndex < typeText.length) {
    parts.push({ text: typeText.slice(lastIndex) });
  }

  return parts.length ? parts : [{ text: typeText }];
}

function checkFirstLetterIsUpperCase(word: string) {
  return word.charAt(0).toUpperCase() === word.charAt(0);
}

export function typeToVNode(type?: string) {
  if (!type) return <>-</>;

  return (
    <>
      {splitTypeParts(type).map((part, idx) =>
        part.isLink ? (
          <SLink
            key={idx}
            href={`#${toTypeAnchorId(part.text)}`}
            target="_self"
            class="text-primary border-b-2 border-dashed border-primary/30 hover:border-primary duration-200"
          >
            {part.text}
          </SLink>
        ) : (
          <span key={idx}>{part.text}</span>
        )
      )}
    </>
  );
}
