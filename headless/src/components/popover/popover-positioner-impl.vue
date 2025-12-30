<script setup lang="ts">
import { onWatcherCleanup, watchEffect } from 'vue';
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
import { providePopoverPositionerContext, usePopoverRootContext } from './context';
import type { PopoverPositionerImplEmits, PopoverPositionerImplProps } from './types';

defineOptions({
  name: 'PopoverPositionerImpl'
});

const props = defineProps<PopoverPositionerImplProps>();

const emit = defineEmits<PopoverPositionerImplEmits>();

const { onOpenChange, modal } = usePopoverRootContext('PopoverPositionerImpl');

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

providePopoverPositionerContext({ pointerEvents });

// Make sure the whole tree has focus guards as our `Dialog` will be the last element in the DOM (because of the `Portal`)
useFocusGuards();
useHideOthers(positionerElement, modal);

watchEffect(() => {
  if (modal.value) {
    const cleanup = useBodyScrollLock();
    onWatcherCleanup(cleanup);
  }
});
</script>

<template>
  <PopperPositioner v-bind="forwardedProps" :ref="setPositionerElement" @keydown="onKeydown">
    <slot />
  </PopperPositioner>
</template>
