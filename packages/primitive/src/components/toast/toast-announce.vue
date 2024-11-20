<script setup lang="ts">
import { ref } from 'vue';
import { useTimeout } from '@vueuse/shared';
import { useRafFn } from '@vueuse/core';
import { VisuallyHidden } from '../visually-hidden';
import { injectToastProviderContext } from './context';

defineOptions({
  name: 'ToastAnnounce'
});

const providerContext = injectToastProviderContext();

const isAnnounced = useTimeout(1000);
const renderAnnounceText = ref(false);

useRafFn(() => {
  renderAnnounceText.value = true;
});
</script>

<template>
  <VisuallyHidden v-if="isAnnounced || renderAnnounceText">
    {{ providerContext.label.value }}
    <slot />
  </VisuallyHidden>
</template>
