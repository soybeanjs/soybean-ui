<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardExpose } from '../../composables';
import { injectSliderRootContext, provideSliderOrientationContext } from './context';
import { BACK_KEYS, linearScale } from './shared';
import SliderImpl from './slider-impl.vue';
import type { SliderHorizontalProps, SliderOrientationPrivateEmits } from './types';

defineOptions({
  name: 'SliderHorizontal'
});

const props = defineProps<SliderHorizontalProps>();

const emit = defineEmits<SliderOrientationPrivateEmits>();

const { max, min, dir, inverted } = toRefs(props);

const { forwardRef, currentElement: sliderElement } = useForwardExpose();

const rootContext = injectSliderRootContext();

const offsetPosition = ref<number>();
const rectRef = ref<DOMRect>();
const isSlidingFromLeft = computed(
  () => (dir?.value !== 'rtl' && !inverted.value) || (dir?.value !== 'ltr' && inverted.value)
);

const style = computed<CSSProperties>(() => ({
  '--soybean-slider-thumb-transform':
    !isSlidingFromLeft.value && rootContext.thumbAlignment.value === 'overflow' ? 'translateX(50%)' : 'translateX(-50%)'
}));

function getValueFromPointerEvent(event: PointerEvent, slideStart?: boolean) {
  const rect = rectRef.value || sliderElement.value!.getBoundingClientRect();

  // Get the currently active thumb element
  const thumb = [...rootContext.thumbElements.value][rootContext.valueIndexToChangeRef.value];
  const thumbWidth = rootContext.thumbAlignment.value === 'contain' ? thumb.clientWidth : 0;

  // Calculate offset for dragging, but only when needed
  if (!offsetPosition.value && !slideStart && rootContext.thumbAlignment.value === 'contain') {
    offsetPosition.value = event.clientX - thumb.getBoundingClientRect().left;
  }

  // Define the input range (slider track width minus thumb width)
  const input: [number, number] = [0, rect.width - thumbWidth];
  const output: [number, number] = isSlidingFromLeft.value ? [min.value, max.value] : [max.value, min.value];
  const value = linearScale(input, output);

  rectRef.value = rect;
  const position = slideStart
    ? event.clientX - rect.left - thumbWidth / 2
    : event.clientX - rect.left - (offsetPosition.value ?? 0);

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
  const slideDirection = isSlidingFromLeft.value ? 'from-left' : 'from-right';
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
  emit('stepKeyDown', event, isBackKey ? -1 : 1);
}

const startEdge = computed(() => (isSlidingFromLeft.value ? 'left' : 'right'));
const endEdge = computed(() => (isSlidingFromLeft.value ? 'right' : 'left'));
const direction = computed(() => (isSlidingFromLeft.value ? 1 : -1));

provideSliderOrientationContext({
  startEdge,
  endEdge,
  direction,
  size: 'width'
});
</script>

<template>
  <SliderImpl
    :ref="forwardRef"
    data-orientation="horizontal"
    :dir="dir"
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
