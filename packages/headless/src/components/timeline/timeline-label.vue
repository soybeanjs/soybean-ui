<script setup lang="ts">
import { useTimelineUi } from './context';
import type { TimelineLabelProps } from './types';

defineOptions({
  name: 'TimelineLabel'
});

defineProps<TimelineLabelProps>();

const cls = useTimelineUi('label');
</script>

<template>
  <div data-soybean-timeline-label :class="cls">
    <slot />
  </div>
</template>
