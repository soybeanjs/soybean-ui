<script setup lang="ts">
import { DialogClose } from '../dialog';
import type { AlertDialogCancelProps } from './types';
import { useAlertDialogContentContext } from './context';

defineOptions({
  name: 'AlertDialogCancel'
});

const props = defineProps<AlertDialogCancelProps>();

const { setCancelElement } = useAlertDialogContentContext('AlertDialogCancel');
</script>

<template>
  <DialogClose :ref="setCancelElement" v-bind="props">
    <slot />
  </DialogClose>
</template>
