<script setup lang="ts">
import { computed } from 'vue';
import { TabsList, useForwardProps } from 'radix-vue';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentTriggerRootProps } from './types';

defineOptions({
  name: 'SSegmentTriggerRoot'
});

const { class: cls, ...delegatedProps } = defineProps<SegmentTriggerRootProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { triggerRoot } = segmentVariants();

  return cn(triggerRoot(), cls);
});
</script>

<template>
  <TabsList v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsList>
</template>

<style scoped></style>
