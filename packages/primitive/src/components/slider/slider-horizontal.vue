<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useForwardExpose } from '../../composables';
import { provideSliderOrientationContext } from './context';
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

const rectRef = ref<ClientRect>();
const isSlidingFromLeft = computed(
  () => (dir?.value === 'ltr' && !inverted.value) || (dir?.value !== 'ltr' && inverted.value)
);

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef.value || sliderElement.value!.getBoundingClientRect();
  const input: [number, number] = [0, rect.width];
  const output: [number, number] = isSlidingFromLeft.value ? [min.value, max.value] : [max.value, min.value];
  const value = linearScale(input, output);

  rectRef.value = rect;
  return value(pointerPosition - rect.left);
}

function onSlideStart(event: PointerEvent) {
  const value = getValueFromPointer(event.clientX);
  emit('slideStart', value);
}

function onSlideMove(event: PointerEvent) {
  const value = getValueFromPointer(event.clientX);
  emit('slideMove', value);
}

function onSlideEnd() {
  rectRef.value = undefined;
  emit('slideEnd');
}

function onStepKeyDown(event: KeyboardEvent) {
  const slideDirection = isSlidingFromLeft.value ? 'from-left' : 'from-right';
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
  emit('stepKeyDown', event, isBackKey ? -1 : 1);
}

provideSliderOrientationContext({
  startEdge: isSlidingFromLeft.value ? 'left' : 'right',
  endEdge: isSlidingFromLeft.value ? 'right' : 'left',
  direction: isSlidingFromLeft.value ? 1 : -1,
  size: 'width'
});
</script>

<template>
  <SliderImpl
    :ref="forwardRef"
    data-orientation="horizontal"
    :dir="dir"
    :style="{
      ['--soybean-slider-thumb-transform' as any]: 'translateX(-50%)'
    }"
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
