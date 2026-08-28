<script setup lang="ts">
import { DialogDescription } from '../dialog';
import type { BottomSheetDescriptionProps } from './types';

defineOptions({
  name: 'BottomSheetDescription'
});

const props = defineProps<BottomSheetDescriptionProps>();
</script>

<template>
  <DialogDescription v-bind="props" data-soybean-bottom-sheet-description>
    <slot />
  </DialogDescription>
</template>
