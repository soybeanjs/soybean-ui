<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners, useOmitProps, usePopupEvents, usePresence } from '../../composables';
import { useDialogRootContext } from './context';
import DialogPopupImpl from './dialog-content-impl.vue';
import type { DialogContentEmits, DialogContentProps } from './types';

defineOptions({
  name: 'DialogPopup'
});

const props = defineProps<DialogContentProps>();

const emit = defineEmits<DialogContentEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const listeners = useForwardListeners(emit);

const { contentElement, open, modal, triggerElement } = useDialogRootContext('DialogContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

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
