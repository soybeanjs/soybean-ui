<script setup lang="ts">
import { computed } from 'vue';
import { DialogOverlay } from 'radix-vue';
import { cn, sheetVariants } from '@soybean-ui/variants';
import type { SheetOverlayProps } from './types';

defineOptions({
  name: 'SSheetOverlay'
});

const { class: cls, forceMount } = defineProps<SheetOverlayProps>();

const mergedCls = computed(() => {
  const { overlay } = sheetVariants();

  return cn(overlay(), cls);
});
</script>

<template>
  <DialogOverlay :class="mergedCls" :force-mount />
</template>

<style scoped></style>
