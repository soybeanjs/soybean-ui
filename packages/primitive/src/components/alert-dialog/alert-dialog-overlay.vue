<script setup lang="ts">
import { DialogOverlay } from '../dialog';
import { useForwardExpose } from '../../composables';
import type { AlertDialogOverlayPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogOverlay'
});

const props = defineProps<AlertDialogOverlayPropsWithPrimitive>();

useForwardExpose();
</script>

<template>
  <DialogOverlay v-bind="props">
    <slot />
  </DialogOverlay>
</template>
