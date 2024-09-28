<script setup lang="ts">
import { computed } from 'vue';
import { DialogOverlay } from 'radix-vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogOverlayProps } from './types';

defineOptions({
  name: 'SDialogOverlay'
});

const { class: cls, forceMount } = defineProps<DialogOverlayProps>();

const mergedCls = computed(() => {
  const { overlay } = dialogVariants();

  return cn(overlay(), cls);
});
</script>

<template>
  <DialogOverlay :class="mergedCls" :force-mount />
</template>

<style scoped></style>
