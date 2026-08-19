<script setup lang="ts">
import { provideTimelineRootContext, useTimelineUi } from './context';
import type { TimelineRootProps } from './types';

defineOptions({
  name: 'TimelineRoot'
});

const props = withDefaults(defineProps<TimelineRootProps>(), {
  orientation: 'vertical',
  mode: 'left',
  reverse: false,
  dir: undefined
});

const cls = useTimelineUi('root');

provideTimelineRootContext(props);
</script>

<template>
  <ol
    data-soybean-timeline-root
    :dir="dir"
    :data-orientation="orientation"
    :data-mode="mode"
    :data-reverse="reverse ? '' : undefined"
    :class="cls"
  >
    <slot />
  </ol>
</template>
