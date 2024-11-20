<script setup lang="ts">
import { computed } from 'vue';
import { DialogOverlay } from '@soybean-ui/primitive';
import { cn, sheetVariants } from '@soybean-ui/variants';
import type { SheetOverlayProps } from './types';

defineOptions({
  name: 'SSheetOverlay'
});

const { class: cls, forceMount } = defineProps<SheetOverlayProps>();

const { overlay } = sheetVariants();

const mergedCls = computed(() => cn(overlay(), cls));
</script>

<template>
  <DialogOverlay :class="mergedCls" :force-mount />
</template>

<style scoped></style>
