<script setup lang="ts">
import { computed } from 'vue';
import { PopperAnchor } from '../popper';
import { useTooltipProviderContext, useTooltipRootContext } from './context';
import type { TooltipTriggerProps } from './types';

defineOptions({
  name: 'TooltipTrigger'
});

const props = withDefaults(defineProps<TooltipTriggerProps>(), {
  as: 'button'
});

const { isPointerInTransitRef } = useTooltipProviderContext('TooltipTrigger');
const {
  open,
  disabled,
  contentId,
  dataState,
  disableClosingTrigger,
  ignoreNonKeyboardFocus,
  setTriggerElement,
  onOpen,
  onClose,
  onTriggerEnter,
  onTriggerLeave
} = useTooltipRootContext('TooltipTrigger');

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
    v-bind="props"
    :ref="setTriggerElement"
    :aria-describedby="open ? contentId : undefined"
    :data-state="dataState"
    data-grace-area-trigger
    v-on="tooltipListeners"
  >
    <slot />
  </PopperAnchor>
</template>
