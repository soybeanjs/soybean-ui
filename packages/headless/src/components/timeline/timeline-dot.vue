<script setup lang="ts">
import { useTimelineUi } from './context';
import type { TimelineDotProps } from './types';

defineOptions({
  name: 'TimelineDot'
});

defineProps<TimelineDotProps>();

const cls = useTimelineUi('dot');
</script>

<template>
  <span data-soybean-timeline-dot :class="cls">
    <slot />
  </span>
</template>
