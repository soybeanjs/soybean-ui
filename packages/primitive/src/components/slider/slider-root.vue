<script setup lang="ts">
import { ref, toRaw, toRefs } from 'vue';
import { useCollection, useDirection, useFormControl, useForwardExpose } from '../../composables';
import { VisuallyHiddenInput } from '../visually-hidden';
import { clamp } from '../../shared';
import type { SliderRootEmits, SliderRootPropsWithPrimitive } from './types';
import { provideSliderRootContext } from './context';
import {
  ARROW_KEYS,
  PAGE_KEYS,
  getClosestValueIndex,
  getDecimalCount,
  getNextSortedValues,
  hasMinStepsBetweenValues,
  roundValue
} from './shared';
import SliderHorizontal from './slider-horizontal.vue';
import SliderVertical from './slider-vertical.vue';

defineOptions({
  name: 'SliderRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SliderRootPropsWithPrimitive>(), {
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
  disabled: false,
  minStepsBetweenThumbs: 0,
  defaultValue: () => [0],
  inverted: false
});

const emit = defineEmits<SliderRootEmits>();

const { min, max, step, minStepsBetweenThumbs, orientation, disabled, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);
const { forwardRef, currentElement } = useForwardExpose();
const isFormControl = useFormControl(currentElement);

const { CollectionSlot } = useCollection({ isProvider: true });

const modelValue = defineModel<number[]>({ default: props.defaultValue });

const valueIndexToChangeRef = ref(0);
const valuesBeforeSlideStartRef = ref(modelValue.value);

function handleSlideStart(value: number) {
  const closestIndex = getClosestValueIndex(modelValue.value, value);
  updateValues(value, closestIndex);
}

function handleSlideMove(value: number) {
  updateValues(value, valueIndexToChangeRef.value);
}

function handleSlideEnd() {
  const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value];
  const nextValue = modelValue.value[valueIndexToChangeRef.value];
  const hasChanged = nextValue !== prevValue;
  if (hasChanged) emit('valueCommit', toRaw(modelValue.value));
}

const thumbElements = ref<HTMLElement[]>([]);

function updateValues(value: number, atIndex: number, { commit } = { commit: false }) {
  const decimalCount = getDecimalCount(step.value);
  const snapToStep = roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount);
  const nextValue = clamp(snapToStep, min.value, max.value);

  const nextValues = getNextSortedValues(modelValue.value, nextValue, atIndex);

  if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
    valueIndexToChangeRef.value = nextValues.indexOf(nextValue);
    const hasChanged = String(nextValues) !== String(modelValue.value);
    if (hasChanged && commit) emit('valueCommit', nextValues);

    if (hasChanged) {
      thumbElements.value[valueIndexToChangeRef.value]?.focus();
      modelValue.value = nextValues;
    }
  }
}

provideSliderRootContext({
  modelValue,
  valueIndexToChangeRef,
  thumbElements,
  orientation,
  min,
  max,
  disabled
});
</script>

<template>
  <CollectionSlot>
    <component
      :is="orientation === 'horizontal' ? SliderHorizontal : SliderVertical"
      v-bind="$attrs"
      :ref="forwardRef"
      :as-child
      :as
      :min="min"
      :max="max"
      :dir="dir"
      :inverted="inverted"
      :aria-disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      @pointerdown="
        () => {
          if (!disabled) valuesBeforeSlideStartRef = modelValue;
        }
      "
      @slide-start="!disabled && handleSlideStart($event)"
      @slide-move="!disabled && handleSlideMove($event)"
      @slide-end="!disabled && handleSlideEnd()"
      @home-key-down="!disabled && updateValues(min, 0, { commit: true })"
      @end-key-down="!disabled && updateValues(max, modelValue.length - 1, { commit: true })"
      @step-key-down="
        (event, direction) => {
          if (!disabled) {
            const isPageKey = PAGE_KEYS.includes(event.key);
            const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key));
            const multiplier = isSkipKey ? 10 : 1;
            const atIndex = valueIndexToChangeRef;
            const value = modelValue[atIndex];
            const stepInDirection = step * multiplier * direction;
            updateValues(value + stepInDirection, atIndex, { commit: true });
          }
        }
      "
    >
      <slot :model-value="modelValue" />

      <VisuallyHiddenInput
        v-if="isFormControl && name"
        type="number"
        :value="modelValue"
        :name="name"
        :required="required"
        :disabled="disabled"
        :step="step"
      />
    </component>
  </CollectionSlot>
</template>
