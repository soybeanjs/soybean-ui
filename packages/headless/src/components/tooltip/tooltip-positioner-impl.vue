<script setup lang="ts">
import { computed, onWatcherCleanup, watchPostEffect } from 'vue';
import { defu } from 'defu';
import { useDismissableLayer, useForwardElement, useGraceArea } from '../../composables';
import { PopperPositioner } from '../popper';
import { TOOLTIP_OPEN } from './shared';
import { useTooltipOpenDelayedContext, useTooltipRootContext } from './context';
import type { TooltipPositionerImplProps, TooltipPositionerImplEmits } from './types';

defineOptions({
  name: 'TooltipPositionerImpl'
});

const props = defineProps<TooltipPositionerImplProps>();

const emit = defineEmits<TooltipPositionerImplEmits>();

const { isPointerInTransitRef } = useTooltipOpenDelayedContext('TooltipPositionerImpl');
const {
  positionerProps: contextPositionerProps,
  triggerElement,
  popupElement,
  disableClosingTrigger,
  disableHoverableContent,
  onClose
} = useTooltipRootContext('TooltipPositionerImpl');

const [positionerElement, setPositionerElement] = useForwardElement();

useGraceArea({
  triggerElement,
  areaElement: positionerElement,
  onPointerInTransitChange: v => {
    isPointerInTransitRef.value = v;
  },
  onPointerExit: () => {
    onClose();
  },
  disabled: disableHoverableContent
});

const { pointerEvents, onFocusCapture, onBlurCapture } = useDismissableLayer(positionerElement, {
  disableOutsidePointerEvents: false,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    if (disableClosingTrigger.value && triggerElement.value?.contains(event.target as HTMLElement)) {
      event.preventDefault();
    }
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    event.preventDefault();
  },
  onDismiss: () => {
    onClose();
  }
});

const positionerProps = computed(() =>
  defu(props, contextPositionerProps.value ?? {}, {
    side: 'top',
    sideOffset: 0,
    align: 'center',
    avoidCollisions: true,
    collisionBoundary: [],
    collisionPadding: 0,
    arrowPadding: 0,
    sticky: 'partial',
    hideWhenDetached: false
  } satisfies TooltipPositionerImplProps)
);

watchPostEffect(() => {
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target?.contains(triggerElement.value!)) {
      onClose();
    }
  };

  window.addEventListener('scroll', handleScroll);
  document.addEventListener(TOOLTIP_OPEN, onClose);
  onWatcherCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
    document.removeEventListener(TOOLTIP_OPEN, onClose);
  });
});

watchPostEffect(() => {
  if (!popupElement.value) return;

  if (pointerEvents.value) {
    popupElement.value.style.pointerEvents = pointerEvents.value;
  } else {
    popupElement.value.style.removeProperty('pointer-events');
  }
});
</script>

<template>
  <PopperPositioner
    v-bind="positionerProps"
    :ref="setPositionerElement"
    data-soybean-tooltip-positioner-impl
    @focus.capture="onFocusCapture"
    @blur.capture="onBlurCapture"
  >
    <slot />
  </PopperPositioner>
</template>
