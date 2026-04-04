<script setup lang="ts">
import { computed, useAttrs, watch } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { isNullish } from '../../shared';
import { Primitive } from '../primitive';
import { provideProgressRootContext, useProgressUi } from './context';
import type { ProgressRootEmits, ProgressRootProps, ProgressState } from './types';

defineOptions({
  name: 'ProgressRoot',
  inheritAttrs: false
});

const DEFAULT_MAX = 100;

const props = withDefaults(defineProps<ProgressRootProps>(), {
  as: 'div',
  getValueLabel: (value: number | null | undefined, max: number) => {
    const safeMax = typeof max === 'number' && max > 0 ? max : DEFAULT_MAX;

    return typeof value === 'number' ? `${Math.round((value / safeMax) * DEFAULT_MAX)}%` : undefined;
  },
  getValueText: undefined
});

const emit = defineEmits<ProgressRootEmits>();
const attrs = useAttrs();

defineSlots<{
  default?: (props: {
    modelValue: number | null | undefined;
    max: number;
    progressState: ProgressState;
    valuePercent: number | null;
  }) => any;
}>();

const cls = useProgressUi('root');

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value);
  },
  undefined
);

const max = useControllableState(
  () => props.max,
  value => {
    emit('update:max', value ?? DEFAULT_MAX);
  },
  DEFAULT_MAX
);

function getValidMax(value: number | undefined) {
  if (typeof value === 'number' && !Number.isNaN(value) && value > 0) {
    return value;
  }

  return DEFAULT_MAX;
}

function getValidModelValue(value: number | null | undefined, maxValue: number) {
  if (isNullish(value)) {
    return value;
  }

  if (typeof value !== 'number' || Number.isNaN(value) || value < 0 || value > maxValue) {
    return null;
  }

  return value;
}

const normalizedMax = computed(() => getValidMax(max.value));

const normalizedModelValue = computed(() => getValidModelValue(modelValue.value, normalizedMax.value));

const progressState = computed<ProgressState>(() => {
  if (isNullish(normalizedModelValue.value)) {
    return 'indeterminate';
  }

  if (normalizedModelValue.value === normalizedMax.value) {
    return 'complete';
  }

  return 'loading';
});

const valuePercent = computed(() => {
  if (isNullish(normalizedModelValue.value)) {
    return null;
  }

  return (normalizedModelValue.value / normalizedMax.value) * DEFAULT_MAX;
});

const valueLabel = computed(() => props.getValueLabel?.(normalizedModelValue.value, normalizedMax.value));

const valueText = computed(() => props.getValueText?.(normalizedModelValue.value, normalizedMax.value));

const ariaValueNowProps = computed(() =>
  typeof normalizedModelValue.value === 'number' ? { 'aria-valuenow': normalizedModelValue.value } : {}
);

function getStringAttr(name: 'aria-label' | 'aria-valuetext') {
  const value = attrs[name];

  return typeof value === 'string' ? value : undefined;
}

const ariaLabel = computed(() => getStringAttr('aria-label') ?? valueLabel.value);

const ariaValueText = computed(() => getStringAttr('aria-valuetext') ?? valueText.value);

const forwardedProps = useOmitProps(props, ['modelValue', 'max', 'getValueLabel', 'getValueText'], attrs, ariaValueNowProps);

watch(
  normalizedMax,
  value => {
    if (value !== max.value) {
      max.value = value;
    }
  },
  { immediate: true }
);

watch(
  normalizedModelValue,
  value => {
    if (value !== modelValue.value) {
      modelValue.value = value;
    }
  },
  { immediate: true }
);

provideProgressRootContext({
  modelValue: normalizedModelValue,
  max: normalizedMax,
  progressState,
  valuePercent
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :class="cls"
    role="progressbar"
    :aria-label="ariaLabel"
    :aria-valuemin="0"
    :aria-valuemax="normalizedMax"
    :aria-valuetext="ariaValueText"
    :data-state="progressState"
    :data-value="normalizedModelValue ?? undefined"
    :data-max="normalizedMax"
  >
    <slot :model-value="normalizedModelValue" :max="normalizedMax" :progress-state="progressState" :value-percent="valuePercent" />
  </Primitive>
</template>
