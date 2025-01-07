<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { DialogTitle } from '../dialog';
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
