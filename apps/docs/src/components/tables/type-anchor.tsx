import { computed, provide, toValue } from 'vue';
import type { ComputedRef, InjectionKey, MaybeRefOrGetter } from 'vue';
import TypeReference from './type-reference.vue';

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

type TypePart = { text: string; hasPreview?: boolean };

export interface TypeRenderContext {
  component: string | null;
  activePreviewNames: string[];
}

type TypeRenderContextLike = Partial<TypeRenderContext> | null | undefined;

export function normalizeTypeRenderContext(context?: TypeRenderContextLike): TypeRenderContext {
  return {
    component: context?.component ?? null,
    activePreviewNames: Array.isArray(context?.activePreviewNames) ? context.activePreviewNames : []
  };
}

export const typeRenderContextKey: InjectionKey<ComputedRef<TypeRenderContext>> = Symbol('type-render-context');

export function provideTypeRenderContext(context: MaybeRefOrGetter<TypeRenderContext>) {
  provide(
    typeRenderContextKey,
    computed(() => normalizeTypeRenderContext(toValue(context)))
  );
}

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
  'HTMLAttributes',
  'HTMLElement'
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

    parts.push({ text: word, hasPreview: isTypeReferenceCandidate(word) });
    lastIndex = start + word.length;
  }

  if (lastIndex < typeText.length) {
    parts.push({ text: typeText.slice(lastIndex) });
  }

  return parts.length ? parts : [{ text: typeText }];
}

function isTypeReferenceCandidate(typeName: string) {
  return !BUILTIN_TYPE_NAMES.has(typeName);
}

export function typeToVNode(type?: string) {
  if (!type) return <>-</>;

  return (
    <>
      {splitTypeParts(type).map((part, idx) =>
        part.hasPreview ? <TypeReference key={idx} name={part.text} /> : <span key={idx}>{part.text}</span>
      )}
    </>
  );
}
