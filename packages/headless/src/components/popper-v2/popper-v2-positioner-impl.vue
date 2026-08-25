<script setup lang="ts">
import { computed, onBeforeUnmount, watchPostEffect } from 'vue';
import { useForwardElement, useGraceArea } from '../../composables';
import { createPopperV2PositionerDefaultProps } from './shared';
import { providePopperV2PositionerContext, usePopperV2RootContext, usePopperV2Ui } from './context';
import type { PopperV2PositionerEmits, PopperV2PositionerProps } from './types';
import { usePopperV2Dismiss } from './use-popper-v2-dismiss';
import { usePopperV2Positioning } from './use-popper-v2-positioning';

defineOptions({
  name: 'PopperV2PositionerImpl'
});

const props = withDefaults(defineProps<PopperV2PositionerProps>(), createPopperV2PositionerDefaultProps());

const emit = defineEmits<PopperV2PositionerEmits>();

const cls = usePopperV2Ui('positioner');

const context = usePopperV2RootContext('PopperV2PositionerImpl');
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

const { isPositioned, update, placedSide, placedAlign, arrowX, arrowY, hideArrow, positionerStyle } =
  usePopperV2Positioning({
    props,
    referenceElement,
    positionerElement,
    arrowElement,
    open: () => context.open.value,
    popupElement
  });

// Expose manual repositioning for stable virtual references (see `useVirtualPointReference`).
onPositionerUpdateChange(update);

providePopperV2PositionerContext({
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
// `disableHoverableContent` additionally disables the grace so leaving the trigger closes right away.
const graceDisabled = computed(() => triggerType.value !== 'hover' || Boolean(props.disableHoverableContent));

useGraceArea({
  triggerElement,
  areaElement: positionerElement,
  disabled: graceDisabled,
  subAreaAttribute: 'data-popper-v2-sub-popup',
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
    props.onGracePointerExit?.();
  }
});

const { pointerEvents, onPointerdownCapture, onFocusCapture, onBlurCapture, onKeydown } = usePopperV2Dismiss({
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
    data-soybean-popper-v2-positioner-impl
    data-soybean-popper-v2-positioner
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
