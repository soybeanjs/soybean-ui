<script setup lang="ts">
import { computed } from 'vue';
import { TabsIndicator } from '@soybean-ui/primitive';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsIndicatorRootProps } from './types';

defineOptions({
  name: 'STabsIndicatorRoot'
});

const { class: cls, orientation } = defineProps<TabsIndicatorRootProps>();

const mergedCls = computed(() => {
  const { indicatorRoot } = tabsVariants({ orientation });

  return cn(indicatorRoot(), cls);
});
</script>

<template>
  <TabsIndicator :class="mergedCls">
    <slot />
  </TabsIndicator>
</template>
