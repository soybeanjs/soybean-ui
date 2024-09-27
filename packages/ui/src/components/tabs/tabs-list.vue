<script setup lang="ts">
import { computed } from 'vue';
import { TabsList, useForwardProps } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsListProps } from './types';

defineOptions({
  name: 'STabsList'
});

const { class: cls, orientation, ...delegatedProps } = defineProps<TabsListProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { list } = tabsVariants({ orientation });

  return cn(list(), cls);
});
</script>

<template>
  <TabsList v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsList>
</template>

<style scoped></style>
