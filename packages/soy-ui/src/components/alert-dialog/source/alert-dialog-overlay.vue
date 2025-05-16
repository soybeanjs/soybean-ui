<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogOverlay } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogOverlayProps } from '../types';

defineOptions({
  name: 'SAlertDialogOverlay'
});

const { class: cls, forceMount } = defineProps<AlertDialogOverlayProps>();

const { overlay } = dialogVariants();

const mergedCls = computed(() => cn(overlay(), cls));
</script>

<template>
  <AlertDialogOverlay :class="mergedCls" :force-mount="forceMount" />
</template>
