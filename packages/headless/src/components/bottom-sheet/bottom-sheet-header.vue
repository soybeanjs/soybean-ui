<script setup lang="ts">
import { DialogHeader } from '../dialog';
import type { BottomSheetHeaderProps } from './types';

defineOptions({
  name: 'BottomSheetHeader'
});

const props = defineProps<BottomSheetHeaderProps>();
</script>

<template>
  <DialogHeader v-bind="props" data-soybean-bottom-sheet-header>
    <slot />
  </DialogHeader>
</template>
