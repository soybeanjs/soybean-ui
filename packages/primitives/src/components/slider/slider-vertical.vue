<script setup lang="ts">
import { computed, ref, toRefs } from 'vue';
import { useForwardExpose } from '../../composables';
import { provideSliderOrientationContext } from './context';
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

const rectRef = ref<ClientRect>();
const isSlidingFromBottom = computed(() => !inverted.value);

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef.value || sliderElement.value!.getBoundingClientRect();
  const input: [number, number] = [0, rect.height];
  const output: [number, number] = isSlidingFromBottom.value ? [max.value, min.value] : [min.value, max.value];
  const value = linearScale(input, output);

  rectRef.value = rect;
  return value(pointerPosition - rect.top);
}

provideSliderOrientationContext({
  startEdge: isSlidingFromBottom.value ? 'bottom' : 'top',
  endEdge: isSlidingFromBottom.value ? 'top' : 'bottom',
  size: 'height',
  direction: isSlidingFromBottom.value ? 1 : -1
});
</script>

<template>
  <SliderImpl
    :ref="forwardRef"
    data-orientation="vertical"
    :style="{
      ['--soybean-slider-thumb-transform' as any]: 'translateY(50%)'
    }"
    @slide-start="
      event => {
        const value = getValueFromPointer(event.clientY);
        emit('slideStart', value);
      }
    "
    @slide-move="
      event => {
        const value = getValueFromPointer(event.clientY);
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
        const slideDirection = isSlidingFromBottom ? 'from-bottom' : 'from-top';
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
