<script setup lang="ts">
import { VisuallyHidden } from '../visually-hidden';
import { injectToastProviderContext } from './toast-provider.vue';

const emit = defineEmits<{
  focusFromOutsideViewport: [void];
}>();

const providerContext = injectToastProviderContext();
</script>

<template>
  <VisuallyHidden
    aria-hidden="true"
    tabindex="0"
    style="position: fixed"
    @focus="
      (event: FocusEvent) => {
        const prevFocusedElement = event.relatedTarget as HTMLElement | null;
        const isFocusFromOutsideViewport = !providerContext.viewport.value?.contains(prevFocusedElement);
        if (isFocusFromOutsideViewport) emit('focusFromOutsideViewport');
      }
    "
  >
    <slot />
  </VisuallyHidden>
</template>
