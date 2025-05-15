<script setup lang="ts">
import { computed } from 'vue';
import { TabsList } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { SegmentListProps } from '../types';

defineOptions({
  name: 'SSegmentList'
});

const { class: cls, size, orientation, loop } = defineProps<SegmentListProps>();

const mergedCls = computed(() => {
  const { list } = tabsVariants({ size, orientation });

  return cn(list(), cls);
});
</script>

<template>
  <TabsList :class="mergedCls" :loop="loop">
    <slot />
  </TabsList>
</template>
