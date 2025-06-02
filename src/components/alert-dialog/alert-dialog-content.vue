<script setup lang="ts">
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
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
  emit('openAutoFocus', event);
  if (event.defaultPrevented) return;
  event.preventDefault();
  focusCancel();
};

const pointerDownOutside = (event: PointerDownOutsideEvent) => {
  event.preventDefault();
};

const interactOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
  event.preventDefault();
};
</script>

<template>
  <DialogContent
    v-bind="props"
    role="alertdialog"
    v-on="{ ...listeners, openAutoFocus, pointerDownOutside, interactOutside }"
  >
    <slot />
  </DialogContent>
</template>
