<script setup lang="ts">
import { computed, nextTick, ref, toRefs, watch } from 'vue';
import { useVModel } from '@vueuse/core';
import { useDirection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { provideStepperRootContext } from './context';
import type { StepperRootEmits, StepperRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'StepperRoot'
});

const props = withDefaults(defineProps<StepperRootPropsWithPrimitive>(), {
  orientation: 'horizontal',
  linear: true,
  defaultValue: 1
});

const emit = defineEmits<StepperRootEmits>();

const { dir: propDir, orientation: propOrientation, linear } = toRefs(props);
const dir = useDirection(propDir);

const totalStepperItems = ref<Set<HTMLElement>>(new Set());

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
});

const totalStepperItemsArray = computed(() => Array.from(totalStepperItems.value));

const isFirstStep = computed(() => modelValue.value === 1);
const isLastStep = computed(() => modelValue.value === totalStepperItemsArray.value.length);

const totalSteps = computed(() => totalStepperItems.value.size);

function goToStep(step: number) {
  if (step > totalSteps.value) return;

  if (step < 1) return;

  if (
    totalStepperItems.value.size &&
    Boolean(totalStepperItemsArray.value[step]) &&
    Boolean(totalStepperItemsArray.value[step].getAttribute('disabled'))
  )
    return;

  if (linear.value) {
    if (step > (modelValue.value ?? 1) + 1) return;
  }

  modelValue.value = step;
}

function nextStep() {
  goToStep((modelValue.value ?? 1) + 1);
}

function prevStep() {
  goToStep((modelValue.value ?? 1) - 1);
}

function hasNext() {
  return (modelValue.value ?? 1) < totalSteps.value;
}

function hasPrev() {
  return (modelValue.value ?? 1) > 1;
}

const nextStepperItem = ref<HTMLElement | null>(null);
const prevStepperItem = ref<HTMLElement | null>(null);
const isNextDisabled = computed(() =>
  nextStepperItem.value ? nextStepperItem.value.getAttribute('disabled') === '' : true
);
const isPrevDisabled = computed(() =>
  prevStepperItem.value ? prevStepperItem.value.getAttribute('disabled') === '' : true
);

watch(modelValue, async () => {
  await nextTick(() => {
    nextStepperItem.value =
      totalStepperItemsArray.value.length && modelValue.value! < totalStepperItemsArray.value.length
        ? totalStepperItemsArray.value[modelValue.value!]
        : null;
    prevStepperItem.value =
      totalStepperItemsArray.value.length && modelValue.value! > 1
        ? totalStepperItemsArray.value[modelValue.value! - 2]
        : null;
  });
});
watch(totalStepperItemsArray, async () => {
  await nextTick(() => {
    nextStepperItem.value =
      totalStepperItemsArray.value.length && modelValue.value! < totalStepperItemsArray.value.length
        ? totalStepperItemsArray.value[modelValue.value!]
        : null;
    prevStepperItem.value =
      totalStepperItemsArray.value.length && modelValue.value! > 1
        ? totalStepperItemsArray.value[modelValue.value! - 2]
        : null;
  });
});

provideStepperRootContext({
  modelValue,
  changeModelValue: (value: number) => {
    modelValue.value = value;
  },
  orientation: propOrientation,
  dir,
  linear,
  totalStepperItems
});

defineExpose({
  goToStep,
  nextStep,
  prevStep,
  modelValue,
  totalSteps,
  isNextDisabled,
  isPrevDisabled,
  isFirstStep,
  isLastStep,
  hasNext,
  hasPrev
});

useForwardExpose();
</script>

<template>
  <Primitive
    role="group"
    aria-label="progress"
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :data-linear="linear ? '' : undefined"
    :data-orientation="orientation"
  >
    <slot
      :model-value="modelValue"
      :total-steps="totalStepperItems.size"
      :is-next-disabled="isNextDisabled"
      :is-prev-disabled="isPrevDisabled"
      :is-first-step="isFirstStep"
      :is-last-step="isLastStep"
      :go-to-step="goToStep"
      :next-step="nextStep"
      :prev-step="prevStep"
      :has-next="hasNext"
      :has-prev="hasPrev"
    />

    <div
      aria-live="polite"
      aria-atomic="true"
      role="status"
      :style="{
        transform: 'translateX(-100%)',
        position: 'absolute',
        pointerEvents: 'none',
        opacity: 0,
        margin: 0
      }"
    >
      Step {{ modelValue }} of {{ totalStepperItems.size }}
    </div>
  </Primitive>
</template>
