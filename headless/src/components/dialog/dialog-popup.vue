<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePopupEvents, usePresence } from '../../composables';
import { useDialogRootContext } from './context';
import DialogPopupImpl from './dialog-popup-impl.vue';
import type { DialogPopupEmits, DialogPopupProps } from './types';

defineOptions({
  name: 'DialogPopup'
});

const props = defineProps<DialogPopupProps>();

const emit = defineEmits<DialogPopupEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const listeners = useForwardListeners(emit);

const { popupElement, open, modal, triggerElement } = useDialogRootContext('DialogPopup');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(popupElement, open);

const trapFocus = computed(() => modal.value && open.value);

const { onPointerDownOutside, onFocusOutside, onInteractOutside, onCloseAutoFocus } = usePopupEvents({
  modal,
  triggerElement
});
</script>

<template>
  <DialogPopupImpl
    v-if="isPresent"
    v-bind="forwardedProps"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="modal"
    v-on="listeners"
    @pointer-down-outside="onPointerDownOutside"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @close-auto-focus="onCloseAutoFocus"
  >
    <slot />
  </DialogPopupImpl>
</template>
