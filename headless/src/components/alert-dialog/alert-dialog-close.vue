<script setup lang="ts">
import { DialogClose } from '../dialog';
import { useAlertDialogContentContext } from './context';
import type { AlertDialogCloseProps, AlertDialogCloseEmits } from './types';

defineOptions({
  name: 'AlertDialogClose'
});

defineProps<AlertDialogCloseProps>();

const emit = defineEmits<AlertDialogCloseEmits>();

const { setCancelElement } = useAlertDialogContentContext('AlertDialogClose');
</script>

<template>
  <DialogClose :ref="setCancelElement" :as="as" :as-child="asChild" :before-close="beforeClose" @close="emit('close')">
    <slot />
  </DialogClose>
</template>
