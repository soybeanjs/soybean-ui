<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import type { TextareaCountProps } from './types';

defineOptions({
  name: 'STextareaCount'
});

const { class: cls, size, value, maxlength, countGraphemes } = defineProps<TextareaCountProps>();

const mergedCls = computed(() => {
  const { count } = textareaVariants({ size });

  return cn(count(), cls);
});

const count = computed(() => {
  if (!value) {
    return 0;
  }

  return countGraphemes?.(value) || String(value).length;
});

const countWithMaxLength = computed(() => {
  if (maxlength) {
    return `${count.value} / ${maxlength}`;
  }

  return count.value;
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot :count="count">{{ countWithMaxLength }}</slot>
  </Primitive>
</template>
