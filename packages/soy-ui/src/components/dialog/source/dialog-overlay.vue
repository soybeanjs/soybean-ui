<script setup lang="ts">
import { computed } from 'vue';
import { DialogOverlay } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogOverlayProps } from '../types';

defineOptions({
  name: 'SDialogOverlay'
});

const { class: cls, forceMount } = defineProps<DialogOverlayProps>();

const { overlay } = dialogVariants();

const mergedCls = computed(() => cn(overlay(), cls));
</script>

<template>
  <DialogOverlay :class="mergedCls" :force-mount="forceMount" />
</template>
