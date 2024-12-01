<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { DialogContent } from '../dialog';
import { provideAlertDialogContentContext } from './context';
import type { AlertDialogContentEmits, AlertDialogContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogContent'
});

const props = defineProps<AlertDialogContentPropsWithPrimitive>();

const emit = defineEmits<AlertDialogContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const cancelElement = ref<HTMLElement>();

async function handleOpenAutoFocus() {
  await nextTick();
  cancelElement.value?.focus({
    preventScroll: true
  });
}

provideAlertDialogContentContext({
  cancelElement
});

useForwardExpose();
</script>

<template>
  <DialogContent
    v-bind="forwarded"
    role="alertdialog"
    @pointer-down-outside.prevent
    @interact-outside.prevent
    @open-auto-focus="handleOpenAutoFocus"
  >
    <slot />
  </DialogContent>
</template>
