<script setup lang="ts">
import { DialogTitle } from '../dialog';
import type { BottomSheetTitleProps } from './types';

defineOptions({
  name: 'BottomSheetTitle'
});

const props = defineProps<BottomSheetTitleProps>();
</script>

<template>
  <DialogTitle v-bind="props" data-soybean-bottom-sheet-title>
    <slot />
  </DialogTitle>
</template>
