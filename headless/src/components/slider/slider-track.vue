<script setup lang="ts">
import { useForwardElement } from '../../composables';
import { Primitive } from '../primitive';
import { useSliderRootContext, useSliderUi } from './context';
import type { SliderTrackProps } from './types';

defineOptions({
  name: 'SliderTrack'
});

const props = withDefaults(defineProps<SliderTrackProps>(), {
  as: 'div'
});

const cls = useSliderUi('track');

const { disabled, orientation, setTrackElement, beginTrackDrag } = useSliderRootContext('SliderTrack');

const trackElementRef = useForwardElement(node => {
  setTrackElement(node);
});

const setElementRef = trackElementRef[1];

function onPointerDown(event: PointerEvent) {
  if (disabled.value) {
    return;
  }
  event.preventDefault();
  beginTrackDrag(event);
}
</script>

<template>
  <Primitive
    v-bind="props"
    :ref="setElementRef"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="orientation"
    @pointerdown="onPointerDown"
  >
    <slot />
  </Primitive>
</template>
