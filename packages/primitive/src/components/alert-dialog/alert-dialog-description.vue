<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { DialogDescription } from '../dialog';
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
