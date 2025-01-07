<script setup lang="ts">
import { computed } from 'vue';
import { TabsTrigger, useForwardProps } from '@soybean-ui/primitives';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentTriggerProps } from './types';

defineOptions({
  name: 'SSegmentTrigger'
});

const { class: cls, ...delegatedProps } = defineProps<SegmentTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const { trigger } = segmentVariants();

const mergedCls = computed(() => cn(trigger(), cls));
</script>

<template>
  <TabsTrigger v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </TabsTrigger>
</template>
