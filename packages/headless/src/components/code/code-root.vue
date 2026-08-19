<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { copyTextToClipboard } from '../clipboard/shared';
import { escapeHtml } from './shared';
import { useCodeUi } from './context';
import type { CodeRootEmits, CodeRootProps } from './types';

defineOptions({
  name: 'CodeRoot'
});

const props = withDefaults(defineProps<CodeRootProps>(), {
  code: '',
  language: undefined,
  lineNumbers: false,
  copyable: false,
  copyText: undefined,
  highlight: undefined
});

const emit = defineEmits<CodeRootEmits>();

const rootCls = useCodeUi('root');
const codeCls = useCodeUi('code');
const lineNumbersCls = useCodeUi('lineNumbers');

const copied = ref(false);

const { start } = useTimeoutFn(
  () => {
    copied.value = false;
  },
  2000,
  { immediate: false }
);

const lineCount = computed(() => props.code.split('\n').length);

const lineNumbersList = computed(() => Array.from({ length: lineCount.value }, (_, index) => index + 1));

const highlightedCode = computed(() => {
  if (props.highlight) return props.highlight(props.code, props.language);

  return escapeHtml(props.code);
});

async function copy() {
  const text = props.copyText ?? props.code;

  try {
    await copyTextToClipboard(text, true);
    copied.value = true;
    emit('copied', text);
    start();
  } catch {
    // Clipboard unavailable — keep the copied state unchanged.
  }
}
</script>

<template>
  <div
    data-soybean-code-root
    :data-line-numbers="lineNumbers ? '' : undefined"
    :data-copyable="copyable ? '' : undefined"
    :class="rootCls"
  >
    <span v-if="lineNumbers" data-soybean-code-line-numbers :class="lineNumbersCls">
      <span v-for="number in lineNumbersList" :key="number" data-soybean-code-line-number>{{ number }}</span>
    </span>
    <pre data-soybean-code-block>
      <code data-soybean-code :data-language="language ?? undefined" :class="codeCls" v-html="highlightedCode" />
    </pre>
    <slot v-if="copyable" name="copyButton" :copied="copied" :copy="copy" />
  </div>
</template>
