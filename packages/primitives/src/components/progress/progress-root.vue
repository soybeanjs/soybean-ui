<script setup lang="ts">
import { computed, nextTick, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { isNullish } from '../../shared';
import { Primitive } from '../primitive';
import { provideProgressRootContext } from './context';
import { DEFAULT_MAX, isNumber, validateMax, validateValue } from './shared';
import type { ProgressRootEmits, ProgressRootPropsWithPrimitive, ProgressState } from './types';

defineOptions({
  name: 'ProgressRoot'
});

const props = withDefaults(defineProps<ProgressRootPropsWithPrimitive>(), {
  max: DEFAULT_MAX,
  getValueLabel: (value: number | null | undefined, max: number) =>
    isNumber(value) ? `${Math.round((value / max) * DEFAULT_MAX)}%` : undefined
});

const emit = defineEmits<ProgressRootEmits>();

const modelValue = useVModel(props, 'modelValue', emit, {
  passive: (props.modelValue === undefined) as false
});

const max = useVModel(props, 'max', emit, {
  passive: (props.max === undefined) as false
});

// ------- Watch for correct values -------
watch(
  () => modelValue.value,
  async value => {
    const correctedValue = validateValue(value, props.max);
    if (correctedValue !== value) {
      await nextTick();
      modelValue.value = correctedValue;
    }
  },
  { immediate: true }
);

watch(
  () => props.max,
  newMax => {
    const correctedMax = validateMax(props.max);
    if (correctedMax !== newMax) max.value = correctedMax;
  },
  { immediate: true }
);
// ------- End of watch for correct values -------

const progressState = computed<ProgressState>(() => {
  if (isNullish(modelValue.value)) return 'indeterminate';
  if (modelValue.value === max.value) return 'complete';
  return 'loading';
});

provideProgressRootContext({
  modelValue,
  max,
  progressState
});

useForwardExpose();
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :aria-valuemax="max"
    :aria-valuemin="0"
    :aria-valuenow="isNumber(modelValue) ? modelValue : undefined"
    :aria-valuetext="getValueText?.(modelValue, max)"
    :aria-label="getValueLabel(modelValue, max)"
    role="progressbar"
    :data-state="progressState"
    :data-value="modelValue ?? undefined"
    :data-max="max"
  >
    <slot :model-value="modelValue" />
  </Primitive>
</template>
