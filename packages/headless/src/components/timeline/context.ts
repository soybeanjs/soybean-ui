import { computed } from 'vue';
import { useDirection } from '../config-provider/context';
import { useContext, useUiContext } from '../../composables';
import type { TimelineRootContext, TimelineRootProps, TimelineUiSlot } from './types';

export const [provideTimelineRootContext, useTimelineRootContext] = useContext(
  'TimelineRoot',
  (props: TimelineRootProps): TimelineRootContext => {
    const orientation = computed(() => props.orientation ?? 'vertical');
    const mode = computed(() => props.mode ?? 'left');
    const reverse = computed(() => props.reverse ?? false);
    const dir = useDirection(() => props.dir);

    let counter = 0;

    const registerItem = () => counter++;

    return {
      orientation,
      mode,
      reverse,
      dir,
      registerItem
    };
  }
);

export const [provideTimelineUi, useTimelineUi] = useUiContext<TimelineUiSlot>('TimelineUi');
