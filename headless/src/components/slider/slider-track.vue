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

const { disabled, orientation, setTrackElement, beginTrackDrag, moveDrag, endDrag } = useSliderRootContext('SliderTrack');

const trackElementRef = useForwardElement(node => {
  setTrackElement(node);
});

const setElementRef = trackElementRef[1];

function onPointerDown(event: PointerEvent) {
  if (disabled.value) {
    return;
  }

  const target = event.currentTarget as HTMLElement;

  target.setPointerCapture(event.pointerId);
  event.preventDefault();
  beginTrackDrag(event);
}

function onPointerMove(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;

  if (target.hasPointerCapture(event.pointerId)) {
    moveDrag(event);
  }
}

function onPointerUp(event: PointerEvent) {
  const target = event.currentTarget as HTMLElement;

  if (!target.hasPointerCapture(event.pointerId)) {
    return;
  }

  target.releasePointerCapture(event.pointerId);
  endDrag();
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
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </Primitive>
</template>
