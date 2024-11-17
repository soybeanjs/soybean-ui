<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits, useHideOthers } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { injectDialogRootContext } from './context';
import DialogContentImpl from './dialog-content-impl.vue';
import type { DialogContentImplEmits, DialogContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogContentModal'
});

const props = defineProps<DialogContentImplPropsWithPrimitive>();

const emit = defineEmits<DialogContentImplEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { open, triggerElement } = injectDialogRootContext();

const { forwardRef, currentElement } = useForwardExpose();

useHideOthers(currentElement);

function onCloseAutoFocus(event: Event) {
  if (!event.defaultPrevented) {
    event.preventDefault();
    triggerElement.value?.focus();
  }
}

function onPointerDownOutside(event: PointerDownOutsideEvent) {
  const originalEvent = event.detail.originalEvent;
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  // If the event is a right-click, we shouldn't close because
  // it is effectively as if we right-clicked the `Overlay`.
  if (isRightClick) {
    event.preventDefault();
  }
}

function onFocusOutside(event: FocusOutsideEvent) {
  // When focus is trapped, a `focusout` event may still happen.
  // We make sure we don't trigger our `onDismiss` in such case.
  event.preventDefault();
}
</script>

<template>
  <DialogContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="open"
    disable-outside-pointer-events
    @close-auto-focus="onCloseAutoFocus"
    @pointer-down-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
  >
    <slot />
  </DialogContentImpl>
</template>
