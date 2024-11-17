<script setup lang="ts">
import { DialogDescription } from '../dialog';
import { useForwardExpose } from '../../composables';
import type { AlertDialogDescriptionPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogDescription'
});

const props = defineProps<AlertDialogDescriptionPropsWithPrimitive>();

useForwardExpose();
</script>

<template>
  <DialogDescription v-bind="props">
    <slot />
  </DialogDescription>
</template>
