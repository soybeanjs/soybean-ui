<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, shallowRef, watch } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { snapValueToStep } from '../../shared';
import { useDirection } from '../config-provider/context';
import { Primitive } from '../primitive';
import { provideSliderRootContext, useSliderUi } from './context';
import {
  ARROW_KEYS,
  BACK_KEYS,
  convertValueToPercentage,
  getClosestValueIndex,
  getNextSortedValues,
  getSliderSideState,
  getSliderValueFromPointer,
  getThumbLabel,
  getValidMinStepsBetweenThumbs,
  getValidSliderMax,
  getValidSliderMin,
  getValidSliderStep,
  hasMinStepsBetweenValues,
  isSliderValuesEqual,
  normalizeSliderValues,
  PAGE_KEYS
} from './shared';
import type { SliderRootContext, SliderRootEmits, SliderRootProps } from './types';

defineOptions({
  name: 'SliderRoot'
});

const props = withDefaults(defineProps<SliderRootProps>(), {
  as: 'div',
  modelValue: undefined,
  defaultValue: () => [0],
  disabled: false,
  orientation: 'horizontal',
  dir: undefined,
  inverted: false,
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0
});

const emit = defineEmits<SliderRootEmits>();

const cls = useSliderUi('root');

const forwardedProps = useOmitProps(props, [
  'modelValue',
  'defaultValue',
  'disabled',
  'orientation',
  'dir',
  'inverted',
  'min',
  'max',
  'step',
  'minStepsBetweenThumbs'
]);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? []);
  },
  props.defaultValue
);

const dir = useDirection(() => props.dir);
const disabled = computed(() => props.disabled);
const orientation = computed(() => (props.orientation === 'vertical' ? 'vertical' : 'horizontal'));
const inverted = computed(() => props.inverted);
const min = computed(() => getValidSliderMin(props.min));
const max = computed(() => getValidSliderMax(props.max, min.value));
const step = computed(() => getValidSliderStep(props.step));
const minStepsBetweenThumbs = computed(() => getValidMinStepsBetweenThumbs(props.minStepsBetweenThumbs));
const normalizedModelValue = computed(() =>
  normalizeSliderValues(modelValue.value, {
    defaultValue: props.defaultValue,
    min: min.value,
    max: max.value,
    step: step.value
  })
);
const pendingModelValue = shallowRef<number[]>();
const currentModelValue = computed(() => pendingModelValue.value ?? normalizedModelValue.value);

watch(
  normalizedModelValue,
  value => {
    if (!isSliderValuesEqual(value, modelValue.value)) {
      modelValue.value = value;
    }

    if (pendingModelValue.value && isSliderValuesEqual(value, pendingModelValue.value)) {
      pendingModelValue.value = undefined;
    }
  },
  { immediate: true }
);

const isHorizontal = computed(() => orientation.value === 'horizontal');
const sliderSideState = computed(() => getSliderSideState(orientation.value, dir.value, inverted.value));
const startEdge = computed(() => sliderSideState.value.startEdge);
const endEdge = computed(() => sliderSideState.value.endEdge);
const slideDirection = computed(() => sliderSideState.value.slideDirection);

const activeThumbIndex = shallowRef(0);
const trackElement = shallowRef<HTMLElement>();
const thumbElements = shallowRef<(HTMLElement | undefined)[]>([]);
const dragOffset = shallowRef(0);
const dragPointerId = shallowRef<number | null>(null);
const valuesBeforeDrag = shallowRef<number[]>(currentModelValue.value);
let cleanupDragListeners: (() => void) | null = null;

watch(
  () => currentModelValue.value.length,
  value => {
    thumbElements.value = thumbElements.value.slice(0, value);
  }
);

function setTrackElement(el: HTMLElement) {
  if (trackElement.value === el) {
    return;
  }

  trackElement.value = el;
}

function setThumbElement(index: number, el: HTMLElement) {
  if (thumbElements.value[index] === el) {
    return;
  }

  const nextThumbElements = [...thumbElements.value];

  nextThumbElements[index] = el;
  thumbElements.value = nextThumbElements;
}

function getPercentage(value: number) {
  return convertValueToPercentage(value, min.value, max.value);
}

function focusThumb(index: number) {
  nextTick(() => {
    thumbElements.value[index]?.focus();
  });
}

function getClosestIndex(value: number) {
  return getClosestValueIndex(currentModelValue.value, value);
}

function isDraggingPointer(pointerId: number) {
  return dragPointerId.value === pointerId;
}

function stopDragListeners() {
  cleanupDragListeners?.();
  cleanupDragListeners = null;
}

function startDragListeners(doc: Document) {
  stopDragListeners();

  const handlePointerMove = (event: PointerEvent) => {
    moveDrag(event);
  };

  const handlePointerUp = (event: PointerEvent) => {
    endDrag(event.pointerId);
  };

  doc.addEventListener('pointermove', handlePointerMove);
  doc.addEventListener('pointerup', handlePointerUp);
  doc.addEventListener('pointercancel', handlePointerUp);

  cleanupDragListeners = () => {
    doc.removeEventListener('pointermove', handlePointerMove);
    doc.removeEventListener('pointerup', handlePointerUp);
    doc.removeEventListener('pointercancel', handlePointerUp);
  };
}

function emitValueCommitIfChanged() {
  const nextValues = pendingModelValue.value ?? currentModelValue.value;

  if (!isSliderValuesEqual(valuesBeforeDrag.value, nextValues)) {
    emit('valueCommit', [...nextValues]);
  }
}

function updateValueAtIndex(value: number, atIndex: number, options: { commit?: boolean; focus?: boolean } = {}) {
  const nextValue = snapValueToStep(value, min.value, max.value, step.value);
  const nextValues = getNextSortedValues(currentModelValue.value, nextValue, atIndex);
  const minimumStep = minStepsBetweenThumbs.value * step.value;

  if (!hasMinStepsBetweenValues(nextValues, minimumStep)) {
    return;
  }

  const nextIndex = nextValues.indexOf(nextValue);

  activeThumbIndex.value = nextIndex;

  if (isSliderValuesEqual(nextValues, currentModelValue.value)) {
    if (options.focus) {
      focusThumb(nextIndex);
    }

    if (options.commit) {
      emitValueCommitIfChanged();
    }

    return;
  }

  pendingModelValue.value = nextValues;
  modelValue.value = nextValues;

  if (options.focus) {
    focusThumb(nextIndex);
  }

  if (options.commit) {
    emit('valueCommit', nextValues);
    valuesBeforeDrag.value = nextValues;
    pendingModelValue.value = undefined;
  }
}

function getValueFromPointerEvent(event: PointerEvent) {
  if (!trackElement.value) {
    return null;
  }

  const rect = trackElement.value.getBoundingClientRect();

  return getSliderValueFromPointer(event, rect, {
    min: min.value,
    max: max.value,
    orientation: orientation.value,
    startEdge: startEdge.value
  });
}

function beginTrackDrag(event: PointerEvent) {
  const value = getValueFromPointerEvent(event);

  if (disabled.value || value === null) {
    return;
  }

  dragPointerId.value = event.pointerId;
  if (trackElement.value?.ownerDocument) {
    startDragListeners(trackElement.value.ownerDocument);
  }
  valuesBeforeDrag.value = [...currentModelValue.value];
  dragOffset.value = 0;

  updateValueAtIndex(value, getClosestIndex(value), { focus: true });
}

function beginThumbDrag(index: number, event: PointerEvent) {
  if (disabled.value) {
    return;
  }

  dragPointerId.value = event.pointerId;
  if (trackElement.value?.ownerDocument) {
    startDragListeners(trackElement.value.ownerDocument);
  }
  valuesBeforeDrag.value = [...currentModelValue.value];
  activeThumbIndex.value = index;
  focusThumb(index);

  const value = getValueFromPointerEvent(event);

  dragOffset.value = value === null ? 0 : currentModelValue.value[index]! - value;
}

function moveDrag(event: PointerEvent) {
  const value = getValueFromPointerEvent(event);

  if (disabled.value || value === null || !isDraggingPointer(event.pointerId)) {
    return;
  }

  updateValueAtIndex(value + dragOffset.value, activeThumbIndex.value);
}

function endDrag(pointerId?: number) {
  if (disabled.value || (typeof pointerId === 'number' && !isDraggingPointer(pointerId))) {
    return;
  }

  const nextValues = pendingModelValue.value ?? currentModelValue.value;

  dragPointerId.value = null;
  stopDragListeners();
  dragOffset.value = 0;
  emitValueCommitIfChanged();
  valuesBeforeDrag.value = [...nextValues];
  pendingModelValue.value = undefined;
}

onBeforeUnmount(() => {
  stopDragListeners();
});

function stepValue(index: number, direction: number, multiplier = 1) {
  const currentValue = currentModelValue.value[index];

  if (disabled.value || typeof currentValue !== 'number') {
    return;
  }

  updateValueAtIndex(currentValue + step.value * direction * multiplier, index, { commit: true, focus: true });
}

function setToLimit(index: number, limit: 'min' | 'max') {
  updateValueAtIndex(limit === 'min' ? min.value : max.value, index, { commit: true, focus: true });
}

const context: SliderRootContext = {
  modelValue,
  currentModelValue,
  disabled,
  orientation,
  dir,
  inverted,
  min,
  max,
  step,
  minStepsBetweenThumbs,
  isHorizontal,
  startEdge,
  endEdge,
  slideDirection,
  activeThumbIndex,
  trackElement,
  thumbElements,
  setTrackElement,
  setThumbElement,
  getPercentage,
  getClosestValueIndex: getClosestIndex,
  getThumbLabel: index => getThumbLabel(index, currentModelValue.value.length),
  beginTrackDrag,
  beginThumbDrag,
  moveDrag,
  endDrag,
  stepValue,
  setToLimit
};

provideSliderRootContext(context);

const dataDisabled = computed(() => (disabled.value ? '' : undefined));

function onKeyDown(event: KeyboardEvent) {
  if (disabled.value || typeof activeThumbIndex.value !== 'number') {
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    setToLimit(activeThumbIndex.value, 'min');
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    setToLimit(activeThumbIndex.value, 'max');
    return;
  }

  if (!PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
    return;
  }

  event.preventDefault();

  const isBackKey = BACK_KEYS[slideDirection.value].includes(event.key);
  const multiplier = PAGE_KEYS.includes(event.key) || (event.shiftKey && ARROW_KEYS.includes(event.key)) ? 10 : 1;

  stepValue(activeThumbIndex.value, isBackKey ? -1 : 1, multiplier);
}
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :dir="dir"
    :data-disabled="dataDisabled"
    :data-orientation="orientation"
    @keydown="onKeyDown"
  >
    <slot :model-value="currentModelValue" />
  </Primitive>
</template>
