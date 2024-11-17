<script setup lang="ts">
import { DialogClose } from '../dialog';
import { useForwardExpose } from '../../composables';
import type { AlertDialogActionPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogAction'
});

const props = defineProps<AlertDialogActionPropsWithPrimitive>();

useForwardExpose();
</script>

<template>
  <DialogClose v-bind="props">
    <slot />
  </DialogClose>
</template>
