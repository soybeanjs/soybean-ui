<script setup lang="ts">
import { DialogConfirm } from '../dialog';
import type { BottomSheetConfirmEmits, BottomSheetConfirmProps } from './types';

defineOptions({
  name: 'BottomSheetConfirm'
});

const props = defineProps<BottomSheetConfirmProps>();

const emit = defineEmits<BottomSheetConfirmEmits>();
</script>

<template>
  <DialogConfirm v-bind="props" data-soybean-bottom-sheet-confirm @confirm="emit('confirm', $event)">
    <slot />
  </DialogConfirm>
</template>
