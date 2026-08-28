<script setup lang="ts">
import { DialogFooter } from '../dialog';
import type { BottomSheetFooterProps } from './types';

defineOptions({
  name: 'BottomSheetFooter'
});

const props = defineProps<BottomSheetFooterProps>();
</script>

<template>
  <DialogFooter v-bind="props" data-soybean-bottom-sheet-footer>
    <slot />
  </DialogFooter>
</template>
