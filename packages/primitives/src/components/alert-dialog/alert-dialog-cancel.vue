<script setup lang="ts">
import { onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import { DialogClose } from '../dialog';
import { injectAlertDialogContentContext } from './context';
import type { AlertDialogCancelPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogCancel'
});

const props = defineProps<AlertDialogCancelPropsWithPrimitive>();

const { forwardRef, currentElement } = useForwardExpose();

const contentContext = injectAlertDialogContentContext();

onMounted(() => {
  contentContext.onCancelElementChange(currentElement.value);
});
</script>

<template>
  <DialogClose v-bind="props" :ref="forwardRef">
    <slot />
  </DialogClose>
</template>
