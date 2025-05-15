<script setup lang="ts">
import { computed } from 'vue';
import { ToastViewport } from '@soybean-ui/primitives';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastViewportProps } from '../types';

defineOptions({
  name: 'SToastViewport'
});

const { class: cls, size, hotkey, label } = defineProps<ToastViewportProps>();

const mergedCls = computed(() => {
  const { viewport } = toastVariants({ size });

  return cn(viewport(), cls);
});
</script>

<template>
  <ToastViewport :class="mergedCls" :hotkey="hotkey" :label="label" />
</template>
