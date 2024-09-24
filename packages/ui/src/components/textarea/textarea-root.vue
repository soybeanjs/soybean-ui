<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import type { TextareaRootProps } from './types';

defineOptions({
  name: 'STextareaRoot'
});

const props = defineProps<TextareaRootProps>();

const cls = computed(() => {
  const { root } = textareaVariants();

  return cn(root(), props.class);
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot />
  </Primitive>
</template>
