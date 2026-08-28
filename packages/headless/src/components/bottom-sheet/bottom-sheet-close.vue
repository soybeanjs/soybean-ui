<script setup lang="ts">
import { DialogClose } from '../dialog';
import type { BottomSheetCloseEmits, BottomSheetCloseProps } from './types';

defineOptions({
  name: 'BottomSheetClose'
});

const props = defineProps<BottomSheetCloseProps>();

const emit = defineEmits<BottomSheetCloseEmits>();
</script>

<template>
  <DialogClose v-bind="props" data-soybean-bottom-sheet-close @close="emit('close', $event)">
    <slot />
  </DialogClose>
</template>
