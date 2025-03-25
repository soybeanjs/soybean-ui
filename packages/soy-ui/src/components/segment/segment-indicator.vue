<script setup lang="ts">
import { computed } from 'vue';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentIndicatorProps } from './types';

defineOptions({
  name: 'SSegmentIndicator'
});

const { class: cls, orientation } = defineProps<SegmentIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator } = segmentVariants({ orientation });

  return cn(indicator(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
