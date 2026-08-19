<script setup lang="ts">
import { TimelineItem } from '@soybeanjs/headless/timeline';
import type { TimelineItemProps } from './types';

defineOptions({
  name: 'STimelineItem'
});

const props = defineProps<TimelineItemProps>();
</script>

<template>
  <TimelineItem v-bind="props">
    <template #label>
      <slot name="label" />
    </template>
    <template #dot>
      <slot name="dot" />
    </template>
    <slot />
  </TimelineItem>
</template>
