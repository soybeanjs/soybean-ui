<script setup lang="ts">
import { computed } from 'vue';
import { TabsContent, useForwardProps } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsContentProps } from './types';

defineOptions({
  name: 'STabsContent'
});

const { class: cls, orientation, ...delegatedProps } = defineProps<TabsContentProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { content } = tabsVariants({ orientation });

  return cn(content(), cls);
});
</script>

<template>
  <TabsContent v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsContent>
</template>

<style scoped></style>
