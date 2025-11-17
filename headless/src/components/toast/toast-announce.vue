<script setup lang="ts">
import { shallowRef } from 'vue';
import { useTimeout } from '@vueuse/shared';
import { useRafFn } from '@vueuse/core';
import { VisuallyHidden } from '../visually-hidden';
import { useToastProviderContext } from './context';

defineOptions({
  name: 'ToastAnnounce'
});

const { label } = useToastProviderContext('ToastAnnounce');

const isAnnounced = useTimeout(1000);
const renderAnnounceText = shallowRef(false);

useRafFn(() => {
  renderAnnounceText.value = true;
});
</script>

<template>
  <VisuallyHidden v-if="isAnnounced || renderAnnounceText">
    {{ label }}
    <slot />
  </VisuallyHidden>
</template>
