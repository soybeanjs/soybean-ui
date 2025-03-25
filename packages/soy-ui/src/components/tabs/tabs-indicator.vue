<script setup lang="ts">
import { computed } from 'vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsIndicatorProps } from './types';

defineOptions({
  name: 'STabsIndicator'
});

const { class: cls, orientation } = defineProps<TabsIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator } = tabsVariants({ orientation });

  return cn(indicator(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
