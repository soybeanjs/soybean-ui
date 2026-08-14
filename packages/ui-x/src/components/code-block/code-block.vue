<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef, watchPostEffect } from 'vue';
import { codeBlockVariants } from '../../styles/code-block';
import type { CodeBlockProps } from './types';

defineOptions({
  name: 'SxCodeBlock'
});

const props = withDefaults(defineProps<CodeBlockProps>(), {
  language: 'text',
  showHeader: true,
  highlight: false,
  copyText: undefined,
  onCopy: undefined
});

const emit = defineEmits<{
  copy: [text: string];
}>();

const variants = codeBlockVariants();

const ui = computed(() => ({
  root: [variants.root, props.class],
  header: variants.header,
  language: variants.language,
  actions: variants.actions,
  body: variants.body,
  pre: variants.pre,
  code: variants.code
}));

const codeRef = useTemplateRef('codeRef');

const copied = ref(false);
const highlightedHtml = ref('');
const highlightError = ref(false);

const label = computed(() => (props.language && props.language !== 'text' ? props.language : 'text'));

async function copy(): Promise<void> {
  const text = props.copyText ?? props.code;
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 1500);
  } catch {
    // Clipboard may be unavailable (permissions / SSR); ignore.
  }
  emit('copy', text);
  props.onCopy?.(text);
}

async function applyHighlight(): Promise<void> {
  if (!props.highlight) return;
  try {
    const shiki = await import('shiki');
    const highlighter = await shiki.createHighlighter({
      themes: ['github-light', 'github-dark'],
      langs: [props.language]
    });
    highlightedHtml.value = highlighter.codeToHtml(props.code, { lang: props.language, theme: 'github-light' });
  } catch {
    highlightError.value = true;
  }
}

onMounted(applyHighlight);

const displayHtml = computed(() => (props.highlight && highlightedHtml.value ? highlightedHtml.value : null));

watchPostEffect(() => {
  if (!codeRef.value) return;

  codeRef.value.innerHTML = displayHtml.value ?? props.code;
});
</script>

<template>
  <div :class="ui.root">
    <div v-if="showHeader" :class="ui.header">
      <span :class="ui.language">{{ label }}</span>
      <div :class="ui.actions">
        <slot name="actions" />

        <button
          type="button"
          :aria-label="copied ? 'Copied' : 'Copy code'"
          class="text-xs text-muted-foreground transition-colors hover:text-foreground"
          @click="copy"
        >
          <slot name="copy-label">{{ copied ? 'Copied' : 'Copy' }}</slot>
        </button>
      </div>
    </div>
    <div :class="ui.body">
      <pre :class="ui.pre">
        <code ref="codeRef" class="ui.code" />
      </pre>
    </div>
  </div>
</template>
