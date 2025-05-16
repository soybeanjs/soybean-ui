<script setup lang="ts">
import { computed } from 'vue';
import { ToastTitle } from '@soybean-ui/primitives';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastTitleProps } from '../types';

defineOptions({
  name: 'SToastTitle'
});

const { class: cls, size } = defineProps<ToastTitleProps>();

const mergedCls = computed(() => {
  const { title } = toastVariants({ size });

  return cn(title(), cls);
});
</script>

<template>
  <ToastTitle :class="mergedCls">
    <slot name="title-leading" />
    <slot />
    <slot name="title-trailing" />
  </ToastTitle>
</template>
