<script setup lang="ts">
import { computed } from 'vue';
import { TabsIndicator } from '@soybean-ui/primitives';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentIndicatorRootProps } from './types';

defineOptions({
  name: 'SSegmentIndicatorRoot'
});

const { class: cls, size, orientation } = defineProps<SegmentIndicatorRootProps>();

const mergedCls = computed(() => {
  const { indicatorRoot } = segmentVariants({ size, orientation });

  return cn(indicatorRoot(), cls);
});
</script>

<template>
  <TabsIndicator :class="mergedCls">
    <slot />
  </TabsIndicator>
</template>
