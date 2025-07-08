<script setup lang="ts">
import { Primitive } from '../primitive';
import { injectSliderRootContext } from './context';
import { ARROW_KEYS, PAGE_KEYS } from './shared';
import type { SliderImplEmits, SliderImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'SliderImpl'
});

const props = withDefaults(defineProps<SliderImplPropsWithPrimitive>(), {
  as: 'span'
});

const emit = defineEmits<SliderImplEmits>();
const rootContext = injectSliderRootContext();
</script>

<template>
  <Primitive
    data-slider-impl
    v-bind="props"
    @keydown="
      (event: KeyboardEvent) => {
        if (event.key === 'Home') {
          emit('homeKeyDown', event);
          // Prevent scrolling to page start
          event.preventDefault();
        } else if (event.key === 'End') {
          emit('endKeyDown', event);
          // Prevent scrolling to page end
          event.preventDefault();
        } else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
          emit('stepKeyDown', event);
          // Prevent scrolling for directional key presses
          event.preventDefault();
        }
      }
    "
    @pointerdown="
      (event: PointerEvent) => {
        const target = event.target as HTMLElement;
        target.setPointerCapture(event.pointerId);
        // Prevent browser focus behaviour because we focus a thumb manually when values change.
        event.preventDefault();
        // Touch devices have a delay before focusing so won't focus if touch immediately moves
        // away from target (sliding). We want thumb to focus regardless.
        if (rootContext.thumbElements.value.includes(target)) {
          target.focus();
        } else {
          emit('slideStart', event);
        }
      }
    "
    @pointermove="
      (event: PointerEvent) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) emit('slideMove', event);
      }
    "
    @pointerup="
      (event: PointerEvent) => {
        const target = event.target as HTMLElement;
        if (target.hasPointerCapture(event.pointerId)) {
          target.releasePointerCapture(event.pointerId);
          emit('slideEnd', event);
        }
      }
    "
  >
    <slot />
  </Primitive>
</template>
