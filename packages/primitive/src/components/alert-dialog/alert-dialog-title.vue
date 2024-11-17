<script setup lang="ts">
import { DialogTitle } from '../dialog';
import { useForwardExpose } from '../../composables';
import type { AlertDialogTitlePropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogTitle'
});

const props = defineProps<AlertDialogTitlePropsWithPrimitive>();

useForwardExpose();
</script>

<template>
  <DialogTitle v-bind="props">
    <slot />
  </DialogTitle>
</template>
