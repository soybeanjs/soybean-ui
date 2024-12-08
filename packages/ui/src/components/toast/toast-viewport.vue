<script setup lang="ts">
import { computed } from 'vue';
import { ToastViewport, useForwardProps } from '@soybean-ui/primitive';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastViewportProps } from './types';

defineOptions({
  name: 'SToastViewport'
});

const { class: cls, ...delegatedProps } = defineProps<ToastViewportProps>();

const forwarded = useForwardProps(delegatedProps);

const { viewport } = toastVariants();

const mergedCls = computed(() => cn(viewport(), cls));
</script>

<template>
  <ToastViewport v-bind="forwarded" :class="mergedCls" />
</template>

<style scoped></style>
