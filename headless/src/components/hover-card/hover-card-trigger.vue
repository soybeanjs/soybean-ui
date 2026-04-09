<script setup lang="ts">
import { useForwardElement } from '../../composables';
import { PopperAnchor } from '../popper';
import { useHoverCardRootContext } from './context';
import type { HoverCardTriggerProps } from './types';

defineOptions({
  name: 'HoverCardTrigger'
});

withDefaults(defineProps<HoverCardTriggerProps>(), {
  as: 'button'
});

const { dataState, isPointerInTransitRef, onTriggerElementChange, onOpen, onClose } = useHoverCardRootContext(
  'HoverCardTrigger'
);

const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);

const onPointerEnter = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return;

  onOpen();
};

const onPointerLeave = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return;

  setTimeout(() => {
    if (!isPointerInTransitRef.value) {
      onClose();
    }
  }, 0);
};
</script>

<template>
  <PopperAnchor
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :reference="reference"
    :data-state="dataState"
    data-grace-area-trigger
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @focus="onOpen"
    @blur="onClose"
  >
    <slot />
  </PopperAnchor>
</template>
