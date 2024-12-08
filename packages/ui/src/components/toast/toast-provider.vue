<script setup lang="ts">
import { computed } from 'vue';
import { ToastProvider } from '@soybean-ui/primitive';
import { provideToastContext } from './context';
import type { ToastProviderProps } from './types';
import Toast from './toast.vue';

defineOptions({
  name: 'ToastProvider'
});

const { toastLimit = 1, toastRemoveDelay = 1000 * 1000, ...delegatedProps } = defineProps<ToastProviderProps>();

const contextParams = computed(() => ({
  toastLimit,
  toastRemoveDelay
}));

provideToastContext(contextParams);
</script>

<template>
  <ToastProvider v-bind="delegatedProps">
    <Toast />
    <slot />
  </ToastProvider>
</template>
