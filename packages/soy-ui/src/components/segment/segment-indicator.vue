<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitives';
import { cn, segmentVariants } from '@soybean-ui/variants';
import type { SegmentIndicatorProps } from './types';

defineOptions({
  name: 'SSegmentIndicator'
});

const { class: cls } = defineProps<SegmentIndicatorProps>();

const { indicator } = segmentVariants();

const mergedCls = computed(() => cn(indicator(), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>
