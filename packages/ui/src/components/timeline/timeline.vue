<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { TimelineRoot, provideTimelineUi } from '@soybeanjs/headless/timeline';
import { timelineVariants } from '@/styles/timeline';
import type { TimelineProps } from './types';

defineOptions({
  name: 'STimeline'
});

const props = withDefaults(defineProps<TimelineProps>(), {
  orientation: 'vertical',
  mode: 'left',
  reverse: false,
  dir: undefined
});

const forwardedProps = useOmitProps(props, ['class', 'ui']);

const ui = computed(() => timelineVariants({ orientation: props.orientation }, props.ui, { root: props.class }));

provideTimelineUi(ui);
</script>

<template>
  <TimelineRoot v-bind="forwardedProps">
    <slot />
  </TimelineRoot>
</template>
