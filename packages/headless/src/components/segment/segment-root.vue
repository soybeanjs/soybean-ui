<script setup lang="ts">
import { TabsRoot } from '../tabs';
import type { SegmentRootEmits, SegmentRootProps } from './types';

defineOptions({
  name: 'SegmentRoot'
});

const props = defineProps<SegmentRootProps>();

const emit = defineEmits<SegmentRootEmits>();
</script>

<template>
  <TabsRoot
    v-slot="slotProps"
    v-bind="props"
    data-soybean-segment-root
    @update:model-value="emit('update:modelValue', $event)"
  >
    <slot v-bind="slotProps" />
  </TabsRoot>
</template>
