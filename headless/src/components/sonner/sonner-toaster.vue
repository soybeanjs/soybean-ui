<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import { sonnerToasts, provideSonnerContext, useSonner } from './context';
import type { SonnerToasterProps } from './types';

defineOptions({
  name: 'SonnerToaster'
});

const props = withDefaults(defineProps<SonnerToasterProps>(), {
  position: 'bottom-right',
  duration: 4000,
  visibleToasts: 3,
  expand: false,
  gap: 14,
  closeButton: false,
  richColors: false
});

// Register sonner on the window so it's accessible globally
if (typeof window !== 'undefined') {
  window.__SoybeanUI_useSonner = useSonner();
}

provideSonnerContext(props);

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    delete window.__SoybeanUI_useSonner;
  }
});
</script>

<template>
  <slot :toasts="sonnerToasts" :props="props" />
</template>
