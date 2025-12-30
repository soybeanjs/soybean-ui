<script setup lang="ts">
import { computed } from 'vue';
import { useForwardElement } from '../../composables';
import { PopperAnchor } from '../popper';
import { useTooltipOpenDelayedContext, useTooltipRootContext } from './context';
import type { TooltipTriggerProps } from './types';

defineOptions({
  name: 'TooltipTrigger'
});

withDefaults(defineProps<TooltipTriggerProps>(), {
  as: 'button'
});

const { isPointerInTransitRef } = useTooltipOpenDelayedContext('TooltipTrigger');
const {
  open,
  disabled,
  popupId,
  dataState,
  disableClosingTrigger,
  ignoreNonKeyboardFocus,
  onTriggerElementChange,
  onOpen,
  onClose,
  onTriggerEnter,
  onTriggerLeave
} = useTooltipRootContext('TooltipTrigger');
const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);

let isPointerDown = false;
let hasPointerMoveOpened = false;

const onPointerUp = () => {
  setTimeout(() => {
    isPointerDown = false;
  }, 1);
};

const onPointerDown = () => {
  if (open.value && !disableClosingTrigger.value) {
    onClose();
  }
  isPointerDown = true;
  document.addEventListener('pointerup', onPointerUp, { once: true });
};

const onPointerMove = (event: PointerEvent) => {
  if (event.pointerType === 'touch') return;

  if (!hasPointerMoveOpened && !isPointerInTransitRef.value) {
    onTriggerEnter();
    hasPointerMoveOpened = true;
  }
};

const onPointerLeave = () => {
  onTriggerLeave();
  hasPointerMoveOpened = false;
};

const onFocus = (event: FocusEvent) => {
  if (isPointerDown) return;

  if (ignoreNonKeyboardFocus.value && !(event.target as HTMLElement).matches?.(':focus-visible')) {
    return;
  }

  onOpen();
};

const onBlur = () => {
  onClose();
};

const onClick = () => {
  if (!disableClosingTrigger.value) {
    onClose();
  }
};

const tooltipListeners = computed(() => {
  if (disabled.value) {
    return {};
  }

  return {
    click: onClick,
    focus: onFocus,
    pointermove: onPointerMove,
    pointerleave: onPointerLeave,
    pointerdown: onPointerDown,
    blur: onBlur
  };
});
</script>

<template>
  <PopperAnchor
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :reference="reference"
    :aria-describedby="open ? popupId : undefined"
    :data-state="dataState"
    data-grace-area-trigger
    v-on="tooltipListeners"
  >
    <slot />
  </PopperAnchor>
</template>
