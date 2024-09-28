<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogOverlay } from 'radix-vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogOverlayProps } from './types';

defineOptions({
  name: 'SAlertDialogOverlay'
});

const { class: cls, forceMount } = defineProps<AlertDialogOverlayProps>();

const mergedCls = computed(() => {
  const { overlay } = dialogVariants();

  return cn(overlay(), cls);
});
</script>

<template>
  <AlertDialogOverlay :class="mergedCls" :force-mount />
</template>

<style scoped></style>
