<script setup lang="ts">
import { computed, watchPostEffect } from 'vue';
import { defu } from 'defu';
import { useDismissableLayer, useForwardElement, useGraceArea } from '../../composables';
import { PopperPositioner } from '../popper';
import { useHoverCardRootContext } from './context';
import type { HoverCardPositionerImplEmits, HoverCardPositionerImplProps } from './types';

defineOptions({
  name: 'HoverCardPositionerImpl'
});

const props = defineProps<HoverCardPositionerImplProps>();

const emit = defineEmits<HoverCardPositionerImplEmits>();

const { isPointerInTransitRef, onClose, onDismiss, popupElement, triggerElement } =
  useHoverCardRootContext('HoverCardPositionerImpl');

const [positionerElement, setPositionerElement] = useForwardElement();

useGraceArea({
  triggerElement,
  areaElement: positionerElement,
  onPointerInTransitChange: value => {
    isPointerInTransitRef.value = value;
  },
  onPointerExit: () => {
    onClose();
  }
});

const { pointerEvents } = useDismissableLayer(positionerElement, {
  disableOutsidePointerEvents: false,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    event.preventDefault();
    emit('focusOutside', event);
  },
  onDismiss: () => {
    onDismiss();
  }
});

const positionerProps = computed(() =>
  defu(props, {
    side: 'bottom',
    sideOffset: 4,
    align: 'center',
    avoidCollisions: true,
    collisionBoundary: [],
    collisionPadding: 0,
    arrowPadding: 0,
    sticky: 'partial',
    hideWhenDetached: false
  } satisfies HoverCardPositionerImplProps)
);

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
