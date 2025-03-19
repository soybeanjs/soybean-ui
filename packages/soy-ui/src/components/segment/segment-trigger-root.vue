<script setup lang="ts">
import { computed } from 'vue';
import { TabsList, useForwardProps } from '@soybean-ui/primitives';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentTriggerRootProps } from './types';

defineOptions({
  name: 'SSegmentTriggerRoot'
});

const { class: cls, ...delegatedProps } = defineProps<SegmentTriggerRootProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { triggerRoot } = segmentVariants();

const mergedCls = computed(() => cn(triggerRoot(), cls));
</script>

<template>
  <TabsList v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsList>
</template>
