<script setup lang="ts">
import { onWatcherCleanup, watchPostEffect } from 'vue';
import { useDismissableLayer, useForwardElement, useGraceArea } from '../../composables';
import { PopperPositioner } from '../popper';
import { TOOLTIP_OPEN } from './shared';
import { useTooltipOpenDelayedContext, useTooltipRootContext } from './context';
import type { TooltipPositionerImplEmits, TooltipPositionerImplProps } from './types';

defineOptions({
  name: 'TooltipPositionerImpl'
});

const props = withDefaults(defineProps<TooltipPositionerImplProps>(), {
  side: 'top',
  sideOffset: 0,
  align: 'center',
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  arrowPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false
});

const emit = defineEmits<TooltipPositionerImplEmits>();

const { isPointerInTransitRef } = useTooltipOpenDelayedContext('TooltipPositionerImpl');
const { triggerElement, popupElement, disableClosingTrigger, disableHoverableContent, onClose } =
  useTooltipRootContext('TooltipPositionerImpl');

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

const { pointerEvents } = useDismissableLayer(positionerElement, {
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

watchPostEffect(() => {
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target?.contains(triggerElement.value!)) {
      onClose();
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener(TOOLTIP_OPEN, onClose);
  onWatcherCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener(TOOLTIP_OPEN, onClose);
  });
});

watchPostEffect(() => {
  if (popupElement.value && pointerEvents.value) {
    popupElement.value.style.pointerEvents = pointerEvents.value;
  }
});
</script>

<template>
  <PopperPositioner v-bind="props" :ref="setPositionerElement">
    <slot />
  </PopperPositioner>
</template>
