<script setup lang="ts">
import { computed } from 'vue';
import { TabsTrigger, useForwardProps } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsTriggerProps } from './types';

defineOptions({
  name: 'STabsTrigger'
});

const { class: cls, ...delegatedProps } = defineProps<TabsTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { trigger } = tabsVariants();

  return cn(trigger(), cls);
});
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsTrigger>
</template>

<style scoped></style>
