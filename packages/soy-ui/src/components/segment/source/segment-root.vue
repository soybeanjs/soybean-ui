<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { computed } from 'vue';
import { TabsRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { StringOrNumber } from '@soybean-ui/primitives';
import type { SegmentRootEmits, SegmentRootProps } from '../types';

defineOptions({
  name: 'SSegmentRoot'
});

const {
  class: cls,
  size,
  orientation,
  activationMode = 'manual',
  ...delegatedProps
} = defineProps<SegmentRootProps<T>>();

const emit = defineEmits<SegmentRootEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { root } = tabsVariants({ size, orientation, fill: 'auto' });

  return cn(root(), cls);
});
</script>

<template>
  <TabsRoot v-bind="forwarded" :class="mergedCls" :orientation="orientation" :activation-mode="activationMode">
    <slot />
  </TabsRoot>
</template>
