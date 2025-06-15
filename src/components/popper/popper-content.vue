<script setup lang="ts">
import { computed, shallowRef, useAttrs, watchPostEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useElementSize } from '@vueuse/core';
import { autoUpdate, useFloating } from '@floating-ui/vue';
import { useExposedElement, useForwardElement, useOmitProps } from '../../composables';
import { providePopperContentContext, usePopperRootContext } from './context';
import {
  createPopperContentPropsDefaultValue,
  getFloatingUIMiddleware,
  getPlacementFromSideAndAlign,
  getSideAndAlignFromPlacement,
  popperCssVars
} from './shared';
import type { PopperContentEmits, PopperContentProps } from './types';

defineOptions({
  name: 'PopperContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PopperContentProps>(), createPopperContentPropsDefaultValue());

const emit = defineEmits<PopperContentEmits>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(
  props,
  [
    'floatingRef',
    'side',
    'sideOffset',
    'align',
    'alignOffset',
    'avoidCollisions',
    'collisionBoundary',
    'collisionPadding',
    'arrowPadding',
    'sticky',
    'hideWhenDetached',
    'positionStrategy',
    'updatePositionStrategy',
    'disableUpdateOnLayoutShift',
    'prioritizePosition',
    'reference'
  ],
  attrs
);

const [contentElement, setContentElement] = useExposedElement();
const [arrowElement, setArrowElement] = useForwardElement();
const { anchorElement } = usePopperRootContext('PopperContent');
const { width: arrowWidth, height: arrowHeight } = useElementSize(arrowElement);
const [floatingRef, setFloatingRef] = useForwardElement(props.floatingRef);

const referenceElement = computed(() => props.reference ?? anchorElement.value);
const contentZIndex = shallowRef('');

const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(referenceElement, floatingRef, {
  strategy: () => props.positionStrategy,
  placement: () => getPlacementFromSideAndAlign(props.side, props.align),
  whileElementsMounted: (...args) => {
    const cleanup = autoUpdate(...args, {
      layoutShift: !props.disableUpdateOnLayoutShift,
      animationFrame: props.updatePositionStrategy === 'always'
    });
    return cleanup;
  },
  middleware: () => getFloatingUIMiddleware(props, arrowElement.value, arrowWidth.value, arrowHeight.value)
});

const placedSide = computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
const placedAlign = computed(() => getSideAndAlignFromPlacement(placement.value)[1]);
const cannotCenterArrow = computed(() => middlewareData.value.arrow?.centerOffset !== 0);
const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0);
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0);

const wrapperStyle = computed<CSSProperties>(() => {
  const { transformOrigin, hide } = middlewareData.value;

  return {
    ...floatingStyles.value,
    transform: isPositioned.value ? floatingStyles.value.transform : 'translate(0, -200%)',
    minWidth: 'max-content',
    zIndex: contentZIndex.value,
    [popperCssVars.transformOrigin]: [transformOrigin?.x, transformOrigin?.y].join(' '),
    ...(hide?.referenceHidden && {
      visibility: 'hidden',
      pointerEvents: 'none'
    })
  };
});

const style = computed<CSSProperties>(() => {
  return {
    animation: !isPositioned.value ? 'none' : undefined
  };
});

providePopperContentContext({
  placedSide,
  arrowX,
  arrowY,
  shouldHideArrow: cannotCenterArrow,
  setArrowElement
});

watchPostEffect(() => {
  if (contentElement.value) {
    contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
  }
});

watchPostEffect(() => {
  if (isPositioned.value) {
    emit('placed');
  }
});
</script>

<template>
  <div :ref="setFloatingRef" data-soybean-popper-content-wrapper :style="wrapperStyle">
    <div
      v-bind="forwardedProps"
      :ref="setContentElement"
      :data-side="placedSide"
      :data-align="placedAlign"
      :style="style"
    >
      <slot />
    </div>
  </div>
</template>
