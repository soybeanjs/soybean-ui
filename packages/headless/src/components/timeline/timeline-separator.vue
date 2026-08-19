<script setup lang="ts">
import { useTimelineUi } from './context';
import type { TimelineSeparatorProps } from './types';

defineOptions({
  name: 'TimelineSeparator'
});

defineProps<TimelineSeparatorProps>();

const cls = useTimelineUi('separator');
</script>

<template>
  <div data-soybean-timeline-separator :class="cls">
    <slot />
  </div>
</template>
