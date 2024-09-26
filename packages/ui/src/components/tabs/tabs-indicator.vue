<script setup lang="ts">
import { computed } from 'vue';
import { TabsIndicator } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsIndicatorProps } from './types';

defineOptions({
  name: 'STabsIndicator'
});

const { class: cls } = defineProps<TabsIndicatorProps>();

const mergedCls = computed(() => {
  const { indicator } = tabsVariants();

  return cn(indicator(), cls);
});
</script>

<template>
  <TabsIndicator :class="mergedCls">
    <slot />
  </TabsIndicator>
</template>

<style scoped></style>
