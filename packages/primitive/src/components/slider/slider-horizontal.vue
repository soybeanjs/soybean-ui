<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useForwardExpose } from '../../composables';
import SliderImpl from './slider-impl.vue';
import type { Direction, SliderOrientationPrivateEmits, SliderOrientationPrivateProps } from './utils';
import { BACK_KEYS, linearScale, provideSliderOrientationContext } from './utils';

interface SliderHorizontalProps extends SliderOrientationPrivateProps {
  dir?: Direction;
}

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
    :dir="dir"
    data-orientation="horizontal"
    :style="{
      ['--soybean-slider-thumb-transform' as any]: 'translateX(-50%)'
    }"
    @slide-start="
      event => {
        const value = getValueFromPointer(event.clientX);
        emit('slideStart', value);
      }
    "
    @slide-move="
      event => {
        const value = getValueFromPointer(event.clientX);
        emit('slideMove', value);
      }
    "
    @slide-end="
      () => {
        rectRef = undefined;
        emit('slideEnd');
      }
    "
    @step-key-down="
      event => {
        const slideDirection = isSlidingFromLeft ? 'from-left' : 'from-right';
        const isBackKey = BACK_KEYS[slideDirection].includes(event.key);
        emit('stepKeyDown', event, isBackKey ? -1 : 1);
      }
    "
    @end-key-down="emit('endKeyDown', $event)"
    @home-key-down="emit('homeKeyDown', $event)"
  >
    <slot />
  </SliderImpl>
</template>
