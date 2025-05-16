<script setup lang="ts">
import { computed } from 'vue';
import { TabsIndicator } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { SegmentIndicatorProps } from '../types';

defineOptions({
  name: 'SSegmentIndicator'
});

const { class: cls, size, ui, orientation } = defineProps<SegmentIndicatorProps>();

const mergedCls = computed(() => {
  const { indicatorRoot, indicator } = tabsVariants({ size, orientation });

  return {
    cls: cn(indicator(), cls || ui?.indicator),
    root: cn(indicatorRoot(), ui?.indicatorRoot)
  };
});
</script>

<template>
  <TabsIndicator :class="mergedCls.root">
    <div :class="mergedCls.cls"></div>
  </TabsIndicator>
</template>
