<script setup lang="ts">
import { DialogContent } from '../dialog';
import type { BottomSheetContentProps } from './types';

defineOptions({
  name: 'BottomSheetContent'
});

const props = defineProps<BottomSheetContentProps>();
</script>

<template>
  <DialogContent v-bind="props" data-soybean-bottom-sheet-content>
    <slot />
  </DialogContent>
</template>
