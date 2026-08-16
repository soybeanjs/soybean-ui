<script setup lang="ts">
import { onWatcherCleanup, watchEffect, watchPostEffect } from 'vue';
import {
  useBodyScrollLock,
  useDismissableLayer,
  useFocusGuards,
  useFocusScope,
  useForwardElement,
  useHideOthers,
  useOmitProps
} from '../../composables';
import { PopperPositioner } from '../popper';
import { usePopoverRootContext } from './context';
import type { PopoverPositionerImplProps, PopoverPositionerImplEmits } from './types';

defineOptions({
  name: 'PopoverPositionerImpl'
});

const props = defineProps<PopoverPositionerImplProps>();

const emit = defineEmits<PopoverPositionerImplEmits>();

const { modal, popupElement, onOpenChange } = usePopoverRootContext('PopoverPositionerImpl');

const [positionerElement, setPositionerElement] = useForwardElement();

const { pointerEvents } = useDismissableLayer(positionerElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
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
  onDismiss: () => {
    onOpenChange(false);
  }
});

const { onKeydown } = useFocusScope(positionerElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(props, ['disableOutsidePointerEvents', 'trapFocus']);

// Make sure the whole tree has focus guards as our `Dialog` will be the last element in the DOM (because of the `Portal`)
useFocusGuards();
useHideOthers(positionerElement, modal);

watchEffect(() => {
  if (modal.value) {
    const cleanup = useBodyScrollLock();
    onWatcherCleanup(cleanup);
  }
});

watchPostEffect(() => {
  if (!popupElement.value) return;

  // `pointerEvents` is `undefined` when no modal layer is active above us. We must remove the inline
  // override in that case, otherwise a `pointer-events: none` set while a nested modal (e.g. a
  // DropdownMenu inside this Popover) was open would stick and block all clicks inside the popup.
  if (pointerEvents.value) {
    popupElement.value.style.pointerEvents = pointerEvents.value;
  } else {
    popupElement.value.style.removeProperty('pointer-events');
  }
});
</script>

<template>
  <PopperPositioner
    v-bind="forwardedProps"
    :ref="setPositionerElement"
    data-soybean-popover-positioner-impl
    @keydown="onKeydown"
  >
    <slot />
  </PopperPositioner>
</template>
