<script setup lang="ts">
import { computed } from 'vue';
import { TabsTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { SegmentTriggerProps } from '../types';

defineOptions({
  name: 'SSegmentTrigger'
});

const { class: cls, size, enableIndicator = true, ...delegatedProps } = defineProps<SegmentTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { trigger } = tabsVariants({ size, enableIndicator });

  return cn(trigger(), cls);
});
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsTrigger>
</template>
