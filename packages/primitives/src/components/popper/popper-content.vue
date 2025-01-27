<script setup lang="ts">
import { computed, ref, watchEffect, watchPostEffect } from 'vue';
import { computedEager } from '@vueuse/core';
import {
  autoUpdate,
  flip,
  arrow as floatingUIarrow,
  hide,
  limitShift,
  offset,
  shift,
  size,
  useFloating
} from '@floating-ui/vue';
import type { Middleware, Placement } from '@floating-ui/vue';
import { useForwardExpose, useSize } from '../../composables';
import { Primitive } from '../primitive';
import { injectPopperRootContext, providePopperContentContext } from './context';
import {
  createPopperContentPropsDefaultValue,
  getSideAndAlignFromPlacement,
  isNotNull,
  transformOrigin
} from './shared';
import type { PopperContentEmits, PopperContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopperContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<PopperContentPropsWithPrimitive>(), createPopperContentPropsDefaultValue());

const emit = defineEmits<PopperContentEmits>();

const rootContext = injectPopperRootContext();
const { forwardRef, currentElement: contentElement } = useForwardExpose();

const floatingRef = ref<HTMLElement>();

const arrow = ref<HTMLElement>();
const { width: arrowWidth, height: arrowHeight } = useSize(arrow);

const desiredPlacement = computed(
  () => (props.side + (props.align !== 'center' ? `-${props.align}` : '')) as Placement
);

const collisionPadding = computed(() => {
  return typeof props.collisionPadding === 'number'
    ? props.collisionPadding
    : { top: 0, right: 0, bottom: 0, left: 0, ...props.collisionPadding };
});

const boundary = computed(() => {
  return Array.isArray(props.collisionBoundary) ? props.collisionBoundary : [props.collisionBoundary];
});

const detectOverflowOptions = computed(() => {
  return {
    padding: collisionPadding.value,
    boundary: boundary.value.filter(isNotNull),
    // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
    altBoundary: boundary.value.length > 0
  };
});

const computedMiddleware = computedEager(() => {
  return [
    offset({
      mainAxis: props.sideOffset + arrowHeight.value,
      alignmentAxis: props.alignOffset
    }),
    props.prioritizePosition &&
      props.avoidCollisions &&
      flip({
        ...detectOverflowOptions.value
      }),
    props.avoidCollisions &&
      shift({
        mainAxis: true,
        crossAxis: Boolean(props.prioritizePosition),
        limiter: props.sticky === 'partial' ? limitShift() : undefined,
        ...detectOverflowOptions.value
      }),
    !props.prioritizePosition &&
      props.avoidCollisions &&
      flip({
        ...detectOverflowOptions.value
      }),
    size({
      ...detectOverflowOptions.value,
      apply: ({ elements, rects, availableWidth, availableHeight }) => {
        const { width: anchorWidth, height: anchorHeight } = rects.reference;
        const contentStyle = elements.floating.style;
        contentStyle.setProperty('--soybean-popper-available-width', `${availableWidth}px`);
        contentStyle.setProperty('--soybean-popper-available-height', `${availableHeight}px`);
        contentStyle.setProperty('--soybean-popper-anchor-width', `${anchorWidth}px`);
        contentStyle.setProperty('--soybean-popper-anchor-height', `${anchorHeight}px`);
      }
    }),
    arrow.value && floatingUIarrow({ element: arrow.value, padding: props.arrowPadding }),
    transformOrigin({
      arrowWidth: arrowWidth.value,
      arrowHeight: arrowHeight.value
    }),
    props.hideWhenDetached && hide({ strategy: 'referenceHidden', ...detectOverflowOptions.value })
  ] as Middleware[];
});

// If provided custom reference, it will overwrite the default anchor element
const reference = computed(() => props.reference ?? rootContext.anchor.value);

const { floatingStyles, placement, isPositioned, middlewareData } = useFloating(reference, floatingRef, {
  strategy: props.positionStrategy,
  placement: desiredPlacement,
  whileElementsMounted: (...args) => {
    const cleanup = autoUpdate(...args, {
      layoutShift: !props.disableUpdateOnLayoutShift,
      animationFrame: props.updatePositionStrategy === 'always'
    });
    return cleanup;
  },
  middleware: computedMiddleware
});

const placedSide = computed(() => getSideAndAlignFromPlacement(placement.value)[0]);
const placedAlign = computed(() => getSideAndAlignFromPlacement(placement.value)[1]);

watchPostEffect(() => {
  if (isPositioned.value) emit('placed');
});

const cannotCenterArrow = computed(() => middlewareData.value.arrow?.centerOffset !== 0);

const contentZIndex = ref('');
watchEffect(() => {
  if (contentElement.value) contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
});

const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0);
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0);

providePopperContentContext({
  placedSide,
  onArrowChange: element => {
    arrow.value = element;
  },
  arrowX,
  arrowY,
  shouldHideArrow: cannotCenterArrow
});
</script>

<template>
  <div
    ref="floatingRef"
    data-soybean-popper-content-wrapper=""
    :style="{
      ...floatingStyles,
      transform: isPositioned ? floatingStyles.transform : 'translate(0, -200%)', // keep off the page when measuring
      minWidth: 'max-content',
      zIndex: contentZIndex,
      ['--soybean-popper-transform-origin' as any]: [
        middlewareData.transformOrigin?.x,
        middlewareData.transformOrigin?.y
      ].join(' '),

      // hide the content if using the hide middleware and should be hidden
      // set visibility to hidden and disable pointer events so the UI behaves
      // as if the PopperContent isn't there at all
      ...(middlewareData.hide?.referenceHidden && {
        visibility: 'hidden',
        pointerEvents: 'none'
      })
    }"
  >
    <Primitive
      :ref="forwardRef"
      v-bind="$attrs"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-side="placedSide"
      :data-align="placedAlign"
      :style="{
        // if the PopperContent hasn't been placed yet (not all measurements done)
        // we prevent animations so that users's animation don't kick in too early referring wrong sides
        animation: !isPositioned ? 'none' : undefined
      }"
    >
      <slot />
    </Primitive>
  </div>
</template>
