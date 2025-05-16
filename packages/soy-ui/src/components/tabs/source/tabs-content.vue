<script setup lang="ts">
import { computed } from 'vue';
import { TabsContent } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsContentProps } from '../types';

defineOptions({
  name: 'STabsContent'
});

const { class: cls, size, orientation, value, forceMount } = defineProps<TabsContentProps>();

const mergedCls = computed(() => {
  const { content } = tabsVariants({ size, orientation });

  return cn(content(), cls);
});
</script>

<template>
  <TabsContent :class="mergedCls" :value="value" :force-mount="forceMount">
    <slot />
  </TabsContent>
</template>
