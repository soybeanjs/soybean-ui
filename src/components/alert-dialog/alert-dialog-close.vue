<script setup lang="ts">
import { DialogClose } from '../dialog';
import type { AlertDialogCloseProps } from './types';
import { useAlertDialogContentContext } from './context';

defineOptions({
  name: 'AlertDialogClose'
});

const props = defineProps<AlertDialogCloseProps>();

const { setCancelElement } = useAlertDialogContentContext('AlertDialogClose');
</script>

<template>
  <DialogClose v-bind="props" :ref="setCancelElement">
    <slot />
  </DialogClose>
</template>
