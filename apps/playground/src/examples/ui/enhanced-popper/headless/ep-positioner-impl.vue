<script setup lang="ts">
import { computed, onBeforeUnmount, shallowRef, watchPostEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useFloating, useForwardElement, useGraceArea } from '@soybeanjs/headless/composables';
import { autoUpdate } from '@floating-ui/dom';
import {
  createEpPositionerDefaultProps,
  getFloatingUiMiddleware,
  getPlacement,
  getPlacementAlignment,
  getPlacementSide,
  popperCssVars
} from './shared';
import { provideEpPositionerContext, useEpRootContext, useEpUi } from './context';
import type { EpPositionerEmits, EpPositionerProps } from './types';
import { usePopperDismiss } from './use-popper-dismiss';

defineOptions({
  name: 'EpPositionerImpl'
});

const props = withDefaults(defineProps<EpPositionerProps>(), createEpPositionerDefaultProps());

const emit = defineEmits<EpPositionerEmits>();

const cls = useEpUi('positioner');

const context = useEpRootContext('EpPositionerImpl');
const {
  dataState,
  popupElement,
  triggerElement,
  triggerType,
  isPointerInTransit,
  anchorElement,
  onPositionerElementChange,
  onPositionerUpdateChange
} = context;
const [positionerElement, setPositionerElement] = useForwardElement(onPositionerElementChange);
const [arrowElement, setArrowElement] = useForwardElement();

const referenceElement = computed(() => props.reference ?? anchorElement.value);

const { floatingStyles, placement, isPositioned, middlewareData, update } = useFloating(
  referenceElement,
  positionerElement,
  {
    strategy: () => props.positionStrategy,
    placement: () => props.placement ?? getPlacement(props.side, props.align),
    whileElementsMounted: (...args) =>
      autoUpdate(...args, {
        layoutShift: !props.disableUpdateOnLayoutShift,
        animationFrame: props.updatePositionStrategy === 'always'
      }),
    middleware: () => getFloatingUiMiddleware(props, arrowElement.value)
  }
);

// Expose manual repositioning for stable virtual references (see `useVirtualPointReference`).
onPositionerUpdateChange(update);

const placedSide = computed(() => getPlacementSide(placement.value));
const placedAlign = computed(() => getPlacementAlignment(placement.value) ?? 'center');
const arrowCentered = computed(() => middlewareData.value.arrow?.centerOffset === 0);
const arrowX = computed(() => middlewareData.value.arrow?.x ?? 0);
const arrowY = computed(() => middlewareData.value.arrow?.y ?? 0);
const hideArrow = computed(() => props.hideShiftedArrow && !arrowCentered.value);

const popupZIndex = shallowRef<string>();

const positionerStyle = computed<CSSProperties>(() => {
  const { transformOrigin, hide } = middlewareData.value;

  return {
    ...floatingStyles.value,
    zIndex: popupZIndex.value,
    transform: isPositioned.value ? floatingStyles.value.transform : 'translate(0, -200%)',
    [popperCssVars.transformOrigin]: [transformOrigin?.x, transformOrigin?.y].join(' '),
    ...(hide?.referenceHidden && {
      visibility: 'hidden',
      pointerEvents: 'none'
    })
  };
});

provideEpPositionerContext({
  arrowX,
  arrowY,
  hideArrow,
  placedSide,
  placedAlign,
  isPositioned: computed(() => isPositioned.value),
  setArrowElement
});

// Grace polygons only matter for hover triggers; click / contextmenu layers close on outside
// interaction instead of pointer transit, so the polygon + pointer listeners are skipped.
const isGraceDisabled = computed(() => triggerType.value !== 'hover');

useGraceArea({
  triggerElement,
  areaElement: positionerElement,
  disabled: isGraceDisabled,
  subAreaAttribute: 'data-ep-sub-popup',
  onPointerInTransitChange: value => {
    isPointerInTransit.value = value;
  },
  onSubAreaEnter: () => {
    context.cancelHoverClose();
  },
  onPointerExit: () => {
    if (triggerType.value === 'hover') {
      context.onHoverClose('trigger-hover');
    }
  }
});

const { pointerEvents, onPointerdownCapture, onFocusCapture, onBlurCapture, onKeydown } = usePopperDismiss({
  layerElement: positionerElement,
  context,
  trapFocus: () => props.trapFocus ?? context.modal.value,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    emit('focusOutside', event);
  },
  onInteractOutside: event => {
    emit('interactOutside', event);
  },
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

function onPointerEnter(event: PointerEvent) {
  if (event.pointerType === 'touch') return;
  context.onPopupPointerInsideChange(true);
  context.cancelHoverClose();
}

function onPointerLeave(event: PointerEvent) {
  if (event.pointerType === 'touch') return;
  context.onPopupPointerInsideChange(false);

  if (triggerType.value === 'hover') {
    context.onHoverClose('trigger-hover');
  }
}

watchPostEffect(() => {
  if (isPositioned.value) {
    emit('placed');
  }
});

watchPostEffect(() => {
  if (popupElement.value) {
    popupZIndex.value = window.getComputedStyle(popupElement.value).zIndex;
  }
});

watchPostEffect(() => {
  if (!popupElement.value) return;

  if (pointerEvents.value) {
    popupElement.value.style.pointerEvents = pointerEvents.value;
    return;
  }

  popupElement.value.style.removeProperty('pointer-events');
});

onBeforeUnmount(() => {
  onPositionerUpdateChange(undefined);
  context.onPopupPointerInsideChange(false);
  context.onPositionerElementChange(undefined);
  isPointerInTransit.value = false;
});
</script>

<template>
  <div
    :ref="setPositionerElement"
    data-soybean-ep-positioner-impl
    data-soybean-ep-positioner
    :class="cls"
    :style="positionerStyle"
    :data-state="dataState"
    @focus.capture="onFocusCapture"
    @blur.capture="onBlurCapture"
    @pointerdown.capture="onPointerdownCapture"
    @keydown="onKeydown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
  >
    <slot />
  </div>
</template>
