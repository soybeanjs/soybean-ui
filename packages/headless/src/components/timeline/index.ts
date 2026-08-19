export { default as TimelineRoot } from './timeline-root.vue';
export { default as TimelineItem } from './timeline-item.vue';
export { default as TimelineSeparator } from './timeline-separator.vue';
export { default as TimelineDot } from './timeline-dot.vue';
export { default as TimelineContent } from './timeline-content.vue';

export { provideTimelineUi } from './context';

export type {
  TimelineOrientation,
  TimelineMode,
  TimelinePosition,
  TimelineRootProps,
  TimelineItemProps,
  TimelineSeparatorProps,
  TimelineDotProps,
  TimelineContentProps,
  TimelineRootContext,
  TimelineUiSlot,
  TimelineUi
} from './types';
