<script setup lang="ts">
import { computed } from 'vue';
import { Toaster, Primitive, provideToastUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants, miniSizeMap } from '@/theme';
import { buttonVariants } from '../button/variants';
import { toastVariants } from './variants';
import type { ToasterProps } from './types';
import toastStyles from './styles.css?raw';

defineOptions({
  name: 'SToaster'
});

const props = withDefaults(defineProps<ToasterProps>(), {
  showIcon: true,
  showClose: true
});

const forwardedProps = useOmitProps(props, ['size', 'ui']);

const ui = computed(() => {
  const variants = toastVariants({
    size: props.size
  });

  const actionVariant = buttonVariants({
    variant: 'solid',
    size: miniSizeMap[props.size ?? 'md']
  });

  const cancelVariant = buttonVariants({
    variant: 'pure',
    size: miniSizeMap[props.size ?? 'md']
  });

  const closeVariant = buttonVariants({
    variant: 'ghost',
    color: 'accent',
    size: miniSizeMap[props.size ?? 'md'],
    shape: 'square',
    fitContent: true
  });

  const originalAction = variants.action;
  variants.action = () => `${actionVariant} ${originalAction()}`;

  const originalCancel = variants.cancel;
  variants.cancel = () => `${cancelVariant} ${originalCancel()}`;

  const originalClose = variants.close;
  variants.close = () => `${closeVariant} ${originalClose()}`;

  return mergeSlotVariants(variants, props.ui);
});

provideToastUi(ui);
</script>

<template>
  <Toaster v-bind="forwardedProps">
    <slot />
    <Primitive id="__SoybeanUI_toastStyle" as="style">{{ toastStyles }}</Primitive>
  </Toaster>
</template>
