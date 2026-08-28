<script setup lang="ts">
import { DialogTrigger } from '../dialog';
import type { BottomSheetTriggerEmits, BottomSheetTriggerProps } from './types';

defineOptions({
  name: 'BottomSheetTrigger'
});

const props = defineProps<BottomSheetTriggerProps>();

const emit = defineEmits<BottomSheetTriggerEmits>();
</script>

<template>
  <DialogTrigger v-bind="props" data-soybean-bottom-sheet-trigger @click="emit('click', $event)">
    <slot />
  </DialogTrigger>
</template>
