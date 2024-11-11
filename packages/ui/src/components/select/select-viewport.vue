<script setup lang="ts">
import { computed } from 'vue';
import { SelectViewport } from 'reka-ui';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectViewportProps } from './types';

defineOptions({
  name: 'SSelectViewport'
});

const { class: cls, position, nonce } = defineProps<SelectViewportProps>();

const mergedCls = computed(() => {
  const { viewport } = selectVariants({ position });

  return cn(viewport(), cls);
});
</script>

<template>
  <SelectViewport :class="mergedCls" :nonce>
    <slot />
  </SelectViewport>
</template>

<style scoped></style>
