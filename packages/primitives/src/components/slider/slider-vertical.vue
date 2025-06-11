<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardExpose } from '../../composables';
import { injectSliderRootContext, provideSliderOrientationContext } from './context';
import { BACK_KEYS, linearScale } from './shared';
import SliderImpl from './slider-impl.vue';
import type { SliderOrientationPrivateEmits, SliderVerticalProps } from './types';

defineOptions({
  name: 'SliderVertical'
});

const props = defineProps<SliderVerticalProps>();

const emit = defineEmits<SliderOrientationPrivateEmits>();

const { max, min, inverted } = toRefs(props);

const { forwardRef, currentElement: sliderElement } = useForwardExpose();

const rootContext = injectSliderRootContext();

const offsetPosition = ref<number>();
const rectRef = ref<DOMRect>();

const isSlidingFromBottom = computed(() => !inverted.value);

const style = computed<CSSProperties>(() => ({
  '--soybean-slider-thumb-transform':
    !isSlidingFromBottom.value && rootContext.thumbAlignment.value === 'overflow'
      ? 'translateY(-50%)'
      : 'translateY(50%)'
}));

function getValueFromPointerEvent(event: PointerEvent, slideStart?: boolean) {
  const rect = rectRef.value || sliderElement.value!.getBoundingClientRect();

  // Get the currently active thumb element
  const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
  const thumbHeight = rootContext.thumbAlignment.value === 'contain' ? thumb.clientHeight : 0;

  // Calculate offset for dragging, but only when needed
  if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === 'contain') {
    offsetPosition.value = event.clientY - thumb.getBoundingClientRect().top;
  }

  // Define the input range (slider track width minus thumb width)
  const input: [number, number] = [0, rect.height - thumbHeight];
  const output: [number, number] = isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value];
  const value = linearScale(input, output);

  const position = slideStart
    ? event.clientY - rect.top - thumbHeight / 2
    : event.clientY - rect.top - (offsetPosition.value ?? 0);

  rectRef.value = rect;
  return value(position);
}

function onSlideStart(event: PointerEvent) {
  const value = getValueFromPointerEvent(event, true);
  emit('slideStart', value);
}

function onSlideMove(event: PointerEvent) {
  const value = getValueFromPointerEvent(event);
  emit('slideMove', value);
}

function onSlideEnd() {
  rectRef.value = undefined;
  offsetPosition.value = undefined;
  emit('slideEnd');
}

function onStepKeyDown(event: KeyboardEvent) {
  const slideDirection = isSlidingFromBottom.value ? 'from-bottom' : 'from-top';
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
  emit('stepKeyDown', event, isBackKey ? -1 : 1);
}

const startEdge = computed(() => (isSlidingFromBottom.value ? 'bottom' : 'top'));
const endEdge = computed(() => (isSlidingFromBottom.value ? 'top' : 'bottom'));
const direction = computed(() => (isSlidingFromBottom.value ? 1 : -1));

provideSliderOrientationContext({
  startEdge,
  endEdge,
  direction,
  size: 'height'
});
</script>

<template>
  <SliderImpl
    :ref="forwardRef"
    data-orientation="vertical"
    :style="style"
    @slide-start="onSlideStart"
    @slide-move="onSlideMove"
    @slide-end="onSlideEnd"
    @step-key-down="onStepKeyDown"
    @end-key-down="emit('endKeyDown', $event)"
    @home-key-down="emit('homeKeyDown', $event)"
  >
    <slot />
  </SliderImpl>
</template>
