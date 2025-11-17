<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { provideCollectionContext, provideToastProviderContext } from './context';
import type { ToastProviderProps } from './types';

defineOptions({
  name: 'ToastProvider'
});

const props = withDefaults(defineProps<ToastProviderProps>(), {
  label: 'Notification',
  duration: 5000,
  swipeDirection: 'right',
  swipeThreshold: 50
});

provideCollectionContext();
provideToastProviderContext(transformPropsToContext(props));
</script>

<template>
  <slot />
</template>
