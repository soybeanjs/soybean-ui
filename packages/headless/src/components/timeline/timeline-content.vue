<script setup lang="ts">
import { useTimelineUi } from './context';
import type { TimelineContentProps } from './types';

defineOptions({
  name: 'TimelineContent'
});

defineProps<TimelineContentProps>();

const cls = useTimelineUi('content');
</script>

<template>
  <div data-soybean-timeline-content :class="cls">
    <slot />
  </div>
</template>
