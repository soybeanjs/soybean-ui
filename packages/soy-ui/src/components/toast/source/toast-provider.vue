<script setup lang="ts">
import { computed } from 'vue';
import { ToastProvider } from '@soybean-ui/primitives';
import { provideToastContext } from '../context';
import type { ToastProviderProps } from '../types';
import Toast from './toast.vue';

defineOptions({
  name: 'ToastProvider'
});

const { ui, toastLimit = 1, toastRemoveDelay = 1000 * 1000, ...delegatedProps } = defineProps<ToastProviderProps>();

const contextParams = computed(() => ({
  toastLimit,
  toastRemoveDelay
}));

provideToastContext(contextParams);
</script>

<template>
  <ToastProvider v-bind="delegatedProps">
    <Toast :ui="ui" />
    <slot />
  </ToastProvider>
</template>
