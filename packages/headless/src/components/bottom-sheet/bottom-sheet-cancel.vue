<script setup lang="ts">
import { DialogCancel } from '../dialog';
import type { BottomSheetCancelProps, BottomSheetCancelEmits } from './types';

defineOptions({
  name: 'BottomSheetCancel'
});

const props = defineProps<BottomSheetCancelProps>();

const emit = defineEmits<BottomSheetCancelEmits>();
</script>

<template>
  <DialogCancel v-bind="props" data-soybean-bottom-sheet-cancel @cancel="emit('cancel', $event)">
    <slot />
  </DialogCancel>
</template>
