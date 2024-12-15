<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogOverlay } from '@soybean-ui/primitive';
import { alertDialogVariants, cn } from '@soybean-ui/variants';
import type { AlertDialogOverlayProps } from './types';

defineOptions({
  name: 'SAlertDialogOverlay'
});

const { class: cls, forceMount } = defineProps<AlertDialogOverlayProps>();

const { overlay } = alertDialogVariants();

const mergedCls = computed(() => cn(overlay(), cls));
</script>

<template>
  <AlertDialogOverlay :class="mergedCls" :force-mount />
</template>

<style scoped></style>
