<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { DialogClose } from '../dialog';
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
