<script setup lang="ts">
import { computed } from 'vue';
import { ToastAction } from '@soybean-ui/primitive';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastActionProps } from './types';

defineOptions({
  name: 'SToastAction'
});

const { class: cls, altText } = defineProps<ToastActionProps>();

const { action } = toastVariants();

const mergedCls = computed(() => cn(action(), cls));
</script>

<template>
  <ToastAction :class="mergedCls" :alt-text="altText" />
</template>

<style scoped></style>
