<script setup lang="ts">
import { computed } from 'vue';
import { ProgressRoot, provideProgressUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import {
  CIRCLE_PROGRESS_VIEWBOX_SIZE,
  DEFAULT_CIRCLE_PROGRESS_STROKE_WIDTH,
  getCircleProgressDasharray,
  getCircleProgressDashoffset,
  getCircleProgressRadius,
  getValidCircleProgressStrokeWidth
} from './shared';
import { circleProgressVariants } from './variants';
import type { CircleProgressEmits, CircleProgressProps } from './types';

defineOptions({
  name: 'SCircleProgress'
});

const props = withDefaults(defineProps<CircleProgressProps>(), {
  strokeWidth: DEFAULT_CIRCLE_PROGRESS_STROKE_WIDTH
});

const emit = defineEmits<CircleProgressEmits>();

const forwardedProps = useOmitProps(props, ['class', 'color', 'size', 'ui', 'strokeWidth']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = circleProgressVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideProgressUi(ui);

const strokeWidth = computed(() => getValidCircleProgressStrokeWidth(props.strokeWidth));

const radius = computed(() => getCircleProgressRadius(strokeWidth.value));

const circumference = computed(() => 2 * Math.PI * radius.value);

const center = CIRCLE_PROGRESS_VIEWBOX_SIZE / 2;
</script>

<template>
  <ProgressRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <svg
      class="size-full"
      fill="none"
      :viewBox="`0 0 ${CIRCLE_PROGRESS_VIEWBOX_SIZE} ${CIRCLE_PROGRESS_VIEWBOX_SIZE}`"
      aria-hidden="true"
    >
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        class="fill-none stroke-current text-muted"
      />
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        :stroke-width="strokeWidth"
        :stroke-dasharray="getCircleProgressDasharray(circumference, slotProps.progressState)"
        :stroke-dashoffset="getCircleProgressDashoffset(slotProps.valuePercent, circumference, slotProps.progressState)"
        :data-state="slotProps.progressState"
        :data-value="slotProps.modelValue ?? undefined"
        :data-max="slotProps.max"
        :class="ui.indicator"
        fill="none"
        stroke-linecap="round"
        :transform="`rotate(-90 ${center} ${center})`"
      />
    </svg>
    <div v-if="$slots.default" class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <slot v-bind="slotProps" />
    </div>
  </ProgressRoot>
</template>
