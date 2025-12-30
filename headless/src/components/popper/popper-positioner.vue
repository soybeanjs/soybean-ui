<script setup lang="ts">
import { computed, watchPostEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { autoUpdate } from '@floating-ui/dom';
import { getAlignment, getSide } from '@floating-ui/utils';
import { useFloating, useForwardElement } from '../../composables';
import { providePopperPositionerContext, usePopperRootContext, usePopperThemeContext } from './context';
import { createPopperPositionerDefaultProps, getFloatingUiMiddleware, getPlacement, popperCssVars } from './shared';
import type { PopperPositionerEmits, PopperPositionerProps } from './types';

defineOptions({
  name: 'PopperPositioner'
});

const props = withDefaults(defineProps<PopperPositionerProps>(), createPopperPositionerDefaultProps());

const emit = defineEmits<PopperPositionerEmits>();

const themeContext = usePopperThemeContext();
const cls = computed(() => themeContext?.ui?.value?.positioner);

const [positionerElement, setPositionerElement] = useForwardElement();
const [arrowElement, setArrowElement] = useForwardElement();
const { anchorElement } = usePopperRootContext('PopperPositioner');

const referenceElement = computed(() => props.reference ?? anchorElement.value);

const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(referenceElement, positionerElement, {
  strategy: () => props.positionStrategy,
  placement: () => props.placement ?? getPlacement(props.side, props.align),
  whileElementsMounted: (...args) =>
    autoUpdate(...args, {
      layoutShift: !props.disableUpdateOnLayoutShift,
      animationFrame: props.updatePositionStrategy === 'always'
    }),
  middleware: () => getFloatingUiMiddleware(props, arrowElement.value)
});

const placedSide = computed(() => getSide(placement.value));
const placedAlign = computed(() => getAlignment(placement.value) ?? 'center');
const arrowCentered = computed(() => middlewareData.value.arrow?.centerOffset === 0);
const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0);
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0);

const positionerStyle = computed<CSSProperties>(() => {
  const { transformOrigin, hide } = middlewareData.value;

  return {
    ...floatingStyles.value,
    transform: isPositioned.value ? floatingStyles.value.transform : 'translate(0, -200%)',
    [popperCssVars.transformOrigin]: [transformOrigin?.x, transformOrigin?.y].join(' '),
    ...(hide?.referenceHidden && {
      visibility: 'hidden',
      pointerEvents: 'none'
    })
  };
});

providePopperPositionerContext({
  arrowX,
  arrowY,
  arrowCentered,
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
  <div :ref="setPositionerElement" :class="cls" data-soybean-popper-positioner :style="positionerStyle">
    <slot />
  </div>
</template>
