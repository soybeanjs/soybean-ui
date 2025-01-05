<script setup lang="ts" generic="T extends StringOrNumber = StringOrNumber">
import { TabsRoot, useForwardPropsEmits } from '@soybean-ui/primitive';
import type { StringOrNumber } from '@soybean-ui/primitive';
import type { SegmentRootEmits, SegmentRootProps } from './types';

defineOptions({
  name: 'SSegmentRoot'
});

const { activationMode = 'manual', ...delegatedProps } = defineProps<SegmentRootProps<T>>();

const emit = defineEmits<SegmentRootEmits<T>>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <TabsRoot v-bind="forwarded" :activation-mode>
    <slot />
  </TabsRoot>
</template>
