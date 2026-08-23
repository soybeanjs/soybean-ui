<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { useTimelineRootContext, useTimelineUi } from './context';
import TimelineContent from './timeline-content.vue';
import TimelineDot from './timeline-dot.vue';
import TimelineLabel from './timeline-label.vue';
import TimelineSeparator from './timeline-separator.vue';
import type { TimelineItemProps, TimelinePosition } from './types';

defineOptions({
  name: 'TimelineItem'
});

const props = defineProps<TimelineItemProps>();

const slots = useSlots();

const context = useTimelineRootContext('TimelineItem');

const cls = useTimelineUi('item');

const index = context.registerItem();

const position = computed<TimelinePosition>(() => {
  if (context.mode.value !== 'alternate') return 'left';

  return index % 2 === 0 ? 'left' : 'right';
});

const dataPosition = computed(() => (context.mode.value === 'alternate' ? position.value : undefined));
const dataOrientation = computed(() => context.orientation.value);
const dataColor = computed(() => props.color ?? undefined);
</script>

<template>
  <li
    data-soybean-timeline-item
    :data-orientation="dataOrientation"
    :data-position="dataPosition"
    :data-color="dataColor"
    :class="cls"
  >
    <TimelineLabel v-if="slots.label || label">
      <slot name="label">{{ label }}</slot>
    </TimelineLabel>
    <TimelineSeparator>
      <TimelineDot>
        <slot name="dot" />
      </TimelineDot>
    </TimelineSeparator>
    <TimelineContent>
      <slot />
    </TimelineContent>
  </li>
</template>
