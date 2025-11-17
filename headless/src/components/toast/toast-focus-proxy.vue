<script setup lang="ts">
import { VisuallyHidden } from '../visually-hidden';
import { useToastProviderContext } from './context';
import type { ToastFocusProxyEmits } from './types';

defineOptions({
  name: 'ToastFocusProxy'
});

const emit = defineEmits<ToastFocusProxyEmits>();

const { viewportElement } = useToastProviderContext('ToastFocusProxy');

const onFocus = (event: FocusEvent) => {
  const prevFocusedElement = event.relatedTarget as HTMLElement | null;
  const isFocusFromOutsideViewport = !viewportElement.value?.contains(prevFocusedElement);
  if (isFocusFromOutsideViewport) {
    emit('focusFromOutsideViewport');
  }
};
</script>

<template>
  <VisuallyHidden aria-hidden="true" tabindex="0" style="position: fixed" @focus="onFocus">
    <slot />
  </VisuallyHidden>
</template>
