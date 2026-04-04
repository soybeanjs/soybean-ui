<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useProgressRootContext, useProgressUi } from './context';
import {
  DEFAULT_PROGRESS_CIRCLE_STROKE_WIDTH,
  getProgressCircleDasharray,
  getProgressCircleDashoffset,
  getProgressCircleRadius,
  getValidProgressCircleStrokeWidth,
  PROGRESS_CIRCLE_CENTER,
  PROGRESS_CIRCLE_VIEWBOX_SIZE
} from './shared';
import type { ProgressCircleProps } from './types';

defineOptions({
  name: 'ProgressCircle',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ProgressCircleProps>(), {
  strokeWidth: DEFAULT_PROGRESS_CIRCLE_STROKE_WIDTH
});

const attrs = useAttrs();

const circleCls = useProgressUi('circle');
const trackCls = useProgressUi('track');
const indicatorCls = useProgressUi('indicator');
const labelCls = useProgressUi('label');

const { max, modelValue, progressState, valuePercent } = useProgressRootContext('ProgressCircle');

const strokeWidth = computed(() => getValidProgressCircleStrokeWidth(props.strokeWidth));

const radius = computed(() => getProgressCircleRadius(strokeWidth.value));

const circumference = computed(() => 2 * Math.PI * radius.value);
</script>

<template>
  <svg
    v-bind="attrs"
    fill="none"
    :class="circleCls"
    :viewBox="`0 0 ${PROGRESS_CIRCLE_VIEWBOX_SIZE} ${PROGRESS_CIRCLE_VIEWBOX_SIZE}`"
    aria-hidden="true"
  >
    <circle
      :cx="PROGRESS_CIRCLE_CENTER"
      :cy="PROGRESS_CIRCLE_CENTER"
      :r="radius"
      :stroke-width="strokeWidth"
      :class="trackCls"
    />
    <circle
      :cx="PROGRESS_CIRCLE_CENTER"
      :cy="PROGRESS_CIRCLE_CENTER"
      :r="radius"
      :stroke-width="strokeWidth"
      :stroke-dasharray="getProgressCircleDasharray(circumference, progressState)"
      :stroke-dashoffset="getProgressCircleDashoffset(valuePercent, circumference, progressState)"
      :data-state="progressState"
      :data-value="modelValue ?? undefined"
      :data-max="max"
      :class="indicatorCls"
      stroke-linecap="round"
      :transform="`rotate(-90 ${PROGRESS_CIRCLE_CENTER} ${PROGRESS_CIRCLE_CENTER})`"
    />
  </svg>
  <div v-if="$slots.default" :class="labelCls">
    <slot :model-value="modelValue" :max="max" :progress-state="progressState" :value-percent="valuePercent" />
  </div>
</template>
