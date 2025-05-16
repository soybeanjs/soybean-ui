<script setup lang="ts">
import { computed } from 'vue';
import { ToastDescription } from '@soybean-ui/primitives';
import { cn, toastVariants } from '@soybean-ui/variants';
import type { ToastDescriptionProps } from '../types';

defineOptions({
  name: 'SToastDescription'
});

const { class: cls } = defineProps<ToastDescriptionProps>();

const { description } = toastVariants();

const mergedCls = computed(() => cn(description(), cls));
</script>

<template>
  <ToastDescription :class="mergedCls">
    <slot />
  </ToastDescription>
</template>
