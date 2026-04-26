<script setup lang="ts">
import type { Component } from 'vue';
import type { AnchorItemData } from '@soybeanjs/headless/anchor';
import { resetDocOutline, setDocOutline } from '@/composables/use-doc-outline';

interface Props {
  /**
   * The path to the markdown file
   *
   * @example 'components/button', 'quick-start'
   */
  path: string;
}

const props = defineProps<Props>();

interface Emits {
  /**
   * Emitted when the markdown file is loaded
   * The parameter indicates whether the loading was successful
   */
  loaded: [isSuccess: boolean];
}

const emit = defineEmits<Emits>();

const { locale } = useI18n();

const mdModules = import.meta.glob<{ default: Component }>('./**/*.md', { base: '/src/docs' });

const cp = shallowRef<Component | null>(null);
const contentRef = shallowRef<HTMLElement | null>(null);
let loadVersion = 0;

async function loadDoc() {
  loadVersion += 1;
  const currentLoadVersion = loadVersion;

  let path = props.path;
  if (path.startsWith('/')) {
    path = path.slice(1);
  }
  if (path.endsWith('.md')) {
    path = path.slice(0, -3);
  }

  const key = `./${locale.value}/${path}.md`;
  const load = mdModules[key];

  let isSuccess = false;

  resetDocOutline();

  if (load) {
    const mod = await load();

    if (currentLoadVersion !== loadVersion) {
      return;
    }

    cp.value = mod.default;
    isSuccess = true;

    await nextTick();
    updateDocOutline();
  } else {
    cp.value = null;
  }

  emit('loaded', isSuccess);
}

function updateDocOutline() {
  const container = contentRef.value;

  if (!container) {
    resetDocOutline();
    return;
  }

  const headings = Array.from(
    container.querySelectorAll<HTMLElement>('.markdown-wrapper h2, .markdown-wrapper h3, .markdown-wrapper h4')
  );

  if (!headings.length) {
    resetDocOutline();
    return;
  }

  const usedIds = new Set(
    Array.from(container.querySelectorAll<HTMLElement>('[id]'))
      .map(element => element.id)
      .filter(Boolean)
  );
  const idCounter = new Map<string, number>();

  const nodes = headings.map(heading => {
    const level = Number.parseInt(heading.tagName.slice(1), 10);
    const title = heading.textContent?.trim() ?? '';

    if (!heading.id) {
      const baseId = toHeadingId(title);
      const currentCount = idCounter.get(baseId) ?? 0;
      let nextCount = currentCount;
      let candidateId = '';

      do {
        nextCount += 1;
        candidateId = nextCount > 1 ? `${baseId}-${nextCount}` : baseId;
      } while (usedIds.has(candidateId));

      idCounter.set(baseId, nextCount);
      heading.id = candidateId;
      usedIds.add(candidateId);
    }

    return {
      level,
      item: {
        href: `#${heading.id}`,
        title
      } satisfies AnchorItemData
    };
  });

  setDocOutline(buildAnchorItems(nodes));
}

function buildAnchorItems(nodes: Array<{ level: number; item: AnchorItemData }>) {
  const root: AnchorItemData[] = [];
  const stack: Array<{ level: number; item: AnchorItemData }> = [];

  for (const node of nodes) {
    while (stack.length && stack[stack.length - 1].level >= node.level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1]?.item;

    if (parent) {
      parent.children ??= [];
      parent.children.push(node.item);
    } else {
      root.push(node.item);
    }

    stack.push(node);
  }

  return root;
}

function toHeadingId(title: string) {
  const normalized = title
    .trim()
    .toLowerCase()
    .replace(/[`~!@#$%^&*()+=[\]{}|\\:;"'<>,.?/]+/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return `doc-${normalized || 'section'}`;
}

onBeforeUnmount(() => {
  resetDocOutline();
});

watchEffect(() => {
  loadDoc();
});
</script>

<template>
  <div ref="contentRef">
    <component :is="cp" v-if="cp" />
  </div>
</template>
