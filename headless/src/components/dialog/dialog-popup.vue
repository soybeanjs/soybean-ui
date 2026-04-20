<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePopupEvents, usePresence } from '../../composables';
import type { PointerDownOutsideEvent, FocusOutsideEvent } from '../../types';
import { useDialogRootContext } from './context';
import DialogPopupImpl from './dialog-popup-impl.vue';
import type { DialogPopupProps, DialogPopupEmits } from './types';

defineOptions({
  name: 'DialogPopup'
});

const props = defineProps<DialogPopupProps>();

const emit = defineEmits<DialogPopupEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const listeners = useForwardListeners(emit);

const { popupElement, open, modal, isAlert, triggerElement } = useDialogRootContext('DialogPopup');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);

const trapFocus = computed(() => modal.value && open.value);

const { onPointerDownOutside, onFocusOutside, onInteractOutside, onCloseAutoFocus } = usePopupEvents({
  modal,
  triggerElement
});

const handlePointerDownOutside = (event: PointerDownOutsideEvent) => {
  if (isAlert.value) {
    event.preventDefault();
  }

  onPointerDownOutside(event);
};

const handleInteractOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
  if (isAlert.value) {
    event.preventDefault();
  }

  onInteractOutside(event);
};
</script>

<template>
  <DialogPopupImpl
    v-if="isPresent"
    v-bind="forwardedProps"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="modal"
    v-on="listeners"
    @pointer-down-outside="handlePointerDownOutside"
    @focus-outside="onFocusOutside"
    @interact-outside="handleInteractOutside"
    @close-auto-focus="onCloseAutoFocus"
  >
    <slot />
  </DialogPopupImpl>
</template>
