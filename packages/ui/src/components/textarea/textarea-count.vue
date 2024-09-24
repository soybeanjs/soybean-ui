<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import type { TextareaCountProps } from './types';

defineOptions({
  name: 'STextareaCount'
});

const props = defineProps<TextareaCountProps>();

const cls = computed(() => {
  const { count } = textareaVariants({ size: props.size });

  return cn(count(), props.class);
});

const count = computed(() => {
  if (!props.value) {
    return 0;
  }

  return props.countGraphemes?.(props.value) || String(props.value).length;
});

const countWithMaxLength = computed(() => {
  if (props.maxlength) {
    return `${count.value} / ${props.maxlength}`;
  }

  return count.value;
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot :count="count">{{ countWithMaxLength }}</slot>
  </Primitive>
</template>
