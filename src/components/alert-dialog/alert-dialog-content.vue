<script setup lang="ts">
import { useForwardListeners } from '../../composables';
import { DialogContent } from '../dialog';
import { provideAlertDialogContentContext } from './context';
import type { AlertDialogContentEmits, AlertDialogContentProps } from './types';

defineOptions({
  name: 'AlertDialogContent'
});

const props = defineProps<AlertDialogContentProps>();

const emit = defineEmits<AlertDialogContentEmits>();

const { focusCancel } = provideAlertDialogContentContext();

const listeners = useForwardListeners<keyof AlertDialogContentEmits>(emit);

const openAutoFocus = (event: Event) => {
  if (event.defaultPrevented) return;
  event.preventDefault();
  focusCancel();
};
</script>

<template>
  <DialogContent
    v-bind="props"
    role="alertdialog"
    v-on="listeners"
    @open-auto-focus="openAutoFocus"
    @pointer-down-outside.prevent
    @interact-outside.prevent
  >
    <slot />
  </DialogContent>
</template>
