<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useCollection } from '../../composables';
import type { ToastProviderProps } from './types';
import { provideToastProviderContext } from './context';

defineOptions({
  name: 'ToastProvider'
});

const props = withDefaults(defineProps<ToastProviderProps>(), {
  label: 'Notification',
  duration: 5000,
  swipeDirection: 'right',
  swipeThreshold: 50
});

const { label, duration, swipeDirection, swipeThreshold } = toRefs(props);
useCollection({ isProvider: true });

const viewport = ref<HTMLElement>();
const toastCount = ref(0);
const isFocusedToastEscapeKeyDownRef = ref(false);
const isClosePausedRef = ref(false);

if (props.label && typeof props.label === 'string' && !props.label.trim()) {
  const error = 'Invalid prop `label` supplied to `ToastProvider`. Expected non-empty `string`.';
  throw new Error(error);
}

provideToastProviderContext({
  label,
  duration,
  swipeDirection,
  swipeThreshold,
  toastCount,
  viewport,
  onViewportChange(el) {
    viewport.value = el;
  },
  onToastAdd() {
    toastCount.value++;
  },
  onToastRemove() {
    toastCount.value--;
  },
  isFocusedToastEscapeKeyDownRef,
  isClosePausedRef
});
</script>

<template>
  <slot />
</template>
