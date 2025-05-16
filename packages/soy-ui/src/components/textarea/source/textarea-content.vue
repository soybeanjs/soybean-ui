<script setup lang="ts">
import { computed } from 'vue';
import { useForwardProps } from '@soybean-ui/primitives';
import { cn, textareaVariants } from '@soybean-ui/variants';
import { isBlankString } from '../../../shared';
import type { TextareaContentEmits, TextareaContentProps } from '../types';

defineOptions({
  name: 'STextareaContent'
});

const { class: cls, size, resize, modelValue, defaultValue, ...delegatedProps } = defineProps<TextareaContentProps>();

const emit = defineEmits<TextareaContentEmits>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { content } = textareaVariants({ size, resize: isBlankString(resize) || resize });

  return cn(content(), cls);
});

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <textarea v-bind="forwardedProps" :value="modelValue || defaultValue" :class="mergedCls" @input="handleInput" />
</template>
