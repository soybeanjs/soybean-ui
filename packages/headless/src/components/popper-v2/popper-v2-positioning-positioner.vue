<script setup lang="ts">
import { computed, watchPostEffect } from 'vue';
import { useForwardElement } from '../../composables';
import { createPopperV2PositioningDefaultProps } from './shared';
import { providePopperV2PositionerContext, usePopperV2PositioningRootContext, usePopperV2Ui } from './context';
import type { PopperV2PositioningPositionerEmits, PopperV2PositioningPositionerProps } from './types';
import { usePopperV2Positioning } from './use-popper-v2-positioning';

defineOptions({
  name: 'PopperV2PositioningPositioner'
});

const props = withDefaults(defineProps<PopperV2PositioningPositionerProps>(), createPopperV2PositioningDefaultProps());

const emit = defineEmits<PopperV2PositioningPositionerEmits>();

const cls = usePopperV2Ui('positioner');

const [positionerElement, setPositionerElement] = useForwardElement();
const [arrowElement, setArrowElement] = useForwardElement();
const { anchorElement, popupElement } = usePopperV2PositioningRootContext('PopperV2PositioningPositioner');

const referenceElement = computed(() => props.reference ?? anchorElement.value);

const { isPositioned, placedSide, placedAlign, arrowX, arrowY, hideArrow, positionerStyle } = usePopperV2Positioning({
  props,
  referenceElement,
  positionerElement,
  arrowElement,
  open: () => props.open ?? true,
  popupElement
});

providePopperV2PositionerContext({
  arrowX,
  arrowY,
  hideArrow,
  placedSide,
  placedAlign,
  isPositioned: computed(() => isPositioned.value),
  setArrowElement
});

watchPostEffect(() => {
  if (isPositioned.value) {
    emit('placed');
  }
});
</script>

<template>
  <div :ref="setPositionerElement" data-soybean-popper-v2-positioning-positioner :class="cls" :style="positionerStyle">
    <slot />
  </div>
</template>
