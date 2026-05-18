<script setup lang="ts">
import { computed } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { ToastProvider, provideToastUi } from '@soybeanjs/headless/toast';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { toastVariants } from '@/styles/toast';
import type { ToastProviderProps } from './types';
import toastStyles from './styles.css?raw';

defineOptions({
  name: 'SToastProvider'
});

const props = withDefaults(defineProps<ToastProviderProps>(), {
  showIcon: true,
  showClose: true
});

const forwardedProps = useOmitProps(props, ['size', 'ui']);

const ui = computed(() =>
  toastVariants(
    {
      size: props.size
    },
    props.ui
  )
);

useStyleTag(toastStyles, {
  id: '__SoybeanUI_toastStyle'
});

provideToastUi(ui);
</script>

<template>
  <ToastProvider v-bind="forwardedProps">
    <slot />
  </ToastProvider>
</template>
