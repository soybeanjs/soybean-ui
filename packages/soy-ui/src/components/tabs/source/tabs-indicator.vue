<script setup lang="ts">
import { computed } from 'vue';
import { TabsIndicator } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsIndicatorProps } from '../types';

defineOptions({
  name: 'STabsIndicator'
});

const { class: cls, size, ui, orientation } = defineProps<TabsIndicatorProps>();

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
