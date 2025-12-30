<script setup lang="ts">
import { useForwardListeners, useOmitProps } from '../../composables';
import DialogPopup from '../dialog/dialog-popup.vue';
import { provideAlertDialogContentContext } from './context';
import type { AlertDialogPopupEmits, AlertDialogPopupProps } from './types';

defineOptions({
  name: 'AlertDialogPopup'
});

const props = defineProps<AlertDialogPopupProps>();

const emit = defineEmits<AlertDialogPopupEmits>();

const forwardedProps = useOmitProps(props, ['forceMount']);

const { focusCancel } = provideAlertDialogContentContext();

const listeners = useForwardListeners(emit);

const openAutoFocus = (event: Event) => {
  if (event.defaultPrevented) return;
  event.preventDefault();
  focusCancel();
};
</script>

<template>
  <DialogPopup
    v-bind="forwardedProps"
    role="alertdialog"
    v-on="listeners"
    @open-auto-focus="openAutoFocus"
    @pointer-down-outside.prevent
    @interact-outside.prevent
  >
    <slot />
  </DialogPopup>
</template>
