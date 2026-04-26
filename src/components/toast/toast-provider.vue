<script setup lang="ts">
import { computed } from 'vue';
import { ToastProvider, Primitive, provideToastUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeBaseVariants, mergeSlotVariants, miniSizeMap } from '@/theme';
import { buttonVariants } from '../button/variants';
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
  const size = props.size ?? 'md';

  const baseVariants = toastVariants({
    size: props.size
  });

  const variants = mergeBaseVariants(baseVariants, {
    action: buttonVariants({
      variant: 'solid',
      size: miniSizeMap[size]
    }),
    cancel: buttonVariants({
      variant: 'pure',
      size: miniSizeMap[size]
    }),
    close: buttonVariants({
      variant: 'ghost',
      color: 'accent',
      size: miniSizeMap[size],
      shape: 'square',
      fitContent: true
    })
  });

  return mergeSlotVariants(variants, props.ui);
});

provideToastUi(ui);
</script>

<template>
  <ToastProvider v-bind="forwardedProps">
    <slot />
    <Primitive id="__SoybeanUI_toastStyle" as="style">{{ toastStyles }}</Primitive>
  </ToastProvider>
</template>
