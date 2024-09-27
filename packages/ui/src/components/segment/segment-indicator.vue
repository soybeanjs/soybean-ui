<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentIndicatorProps } from './types';

defineOptions({
  name: 'SSegmentIndicator'
});

const { class: cls } = defineProps<SegmentIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator } = segmentVariants();

  return cn(indicator(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
