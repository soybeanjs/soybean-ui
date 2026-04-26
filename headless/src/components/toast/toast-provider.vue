<script setup lang="ts">
import Toaster from './toaster.vue';
import type { ToastProviderProps } from './types';

defineOptions({
  name: 'ToastProvider'
});

const props = defineProps<ToastProviderProps>();
</script>

<template>
  <Toaster v-bind="props">
    <slot />
  </Toaster>
</template>
