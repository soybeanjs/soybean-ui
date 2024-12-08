<script setup lang="ts">
import { computed } from 'vue';
import { ToastTitle } from '@soybean-ui/primitive';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastTitleProps } from './types';

defineOptions({
  name: 'SToastTitle'
});

const { class: cls } = defineProps<ToastTitleProps>();

const { title } = toastVariants();

const mergedCls = computed(() => cn(title(), cls));
</script>

<template>
  <ToastTitle :class="mergedCls">
    <slot />
  </ToastTitle>
</template>

<style scoped></style>
