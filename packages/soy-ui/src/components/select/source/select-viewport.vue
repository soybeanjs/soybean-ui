<script setup lang="ts">
import { computed } from 'vue';
import { SelectViewport } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectViewportProps } from '../types';

defineOptions({
  name: 'SSelectViewport'
});

const { class: cls, size, position, nonce } = defineProps<SelectViewportProps>();

const mergedCls = computed(() => {
  const { viewport } = selectVariants({ size, position });

  return cn(viewport(), cls);
});
</script>

<template>
  <SelectViewport :class="mergedCls" :nonce="nonce">
    <slot />
  </SelectViewport>
</template>
