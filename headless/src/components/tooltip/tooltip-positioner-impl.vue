<script setup lang="ts">
import { computed, onWatcherCleanup, watchPostEffect } from 'vue';
import { defu } from 'defu';
import { useDismissableLayer, useForwardElement, useGraceArea } from '../../composables';
import { PopperPositioner } from '../popper';
import { TOOLTIP_OPEN } from './shared';
import { useTooltipOpenDelayedContext, useTooltipRootContext } from './context';
import type { TooltipPositionerImplEmits, TooltipPositionerImplProps } from './types';

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
  <PopperPositioner v-bind="positionerProps" :ref="setPositionerElement">
    <slot />
  </PopperPositioner>
</template>
