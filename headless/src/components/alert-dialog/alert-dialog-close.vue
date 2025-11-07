<script setup lang="ts">
import { DialogClose } from '../dialog';
import type { AlertDialogCloseProps } from './types';
import { useAlertDialogContentContext } from './context';

defineOptions({
  name: 'AlertDialogClose'
});

defineProps<AlertDialogCloseProps>();

const { setCancelElement } = useAlertDialogContentContext('AlertDialogClose');
</script>

<template>
  <DialogClose :ref="setCancelElement" :as="as" :as-child="asChild">
    <slot />
  </DialogClose>
</template>
