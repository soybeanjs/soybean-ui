<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { DialogOverlay } from '../dialog';
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
