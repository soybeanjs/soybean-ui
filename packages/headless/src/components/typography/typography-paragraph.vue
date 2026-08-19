<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import { useTimeoutFn } from '@vueuse/core';
import { copyTextToClipboard } from '../clipboard/shared';
import type { TypographyParagraphEmits, TypographyParagraphProps } from './types';

defineOptions({
  name: 'TypographyParagraph'
});

const props = withDefaults(defineProps<TypographyParagraphProps>(), {
  copyable: false,
  copyText: undefined
});

const emit = defineEmits<TypographyParagraphEmits>();

const paragraphRef = useTemplateRef('paragraphRef');

const copied = ref(false);

const { start } = useTimeoutFn(
  () => {
    copied.value = false;
  },
  2000,
  { immediate: false }
);

async function copy() {
  const text = props.copyText ?? paragraphRef.value?.textContent ?? '';

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
  <p
    ref="paragraphRef"
    data-soybean-typography-paragraph
    :data-copyable="copyable ? '' : undefined"
    :data-copied="copied ? '' : undefined"
  >
    <slot :copied="copied" :copy="copy" />
  </p>
</template>
