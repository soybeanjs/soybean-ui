<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
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
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
