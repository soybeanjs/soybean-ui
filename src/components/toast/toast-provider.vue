<script setup lang="ts">
import { computed } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { ToastProvider, provideToastUi } from '@soybeanjs/headless/toast';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants, miniSizeMap } from '@/theme';
import { buttonVariants, buttonIconVariants } from '../button/variants';
import { toastVariants } from './variants';
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

const ui = computed(() => {
  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = Object.assign(
    toastVariants({
      size: props.size
    }),
    {
      $base: {
        action: buttonVariants({
          variant: 'solid',
          size: miniSize
        }),
        cancel: buttonVariants({
          variant: 'pure',
          size: miniSize
        }),
        close: buttonIconVariants({
          size: miniSize
        })
      }
    }
  );

  return mergeVariants(variants, props.ui);
});

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
