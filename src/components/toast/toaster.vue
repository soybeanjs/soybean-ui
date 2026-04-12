<script setup lang="ts">
import { computed, h } from 'vue';
import { Toaster, Primitive, provideToastUi } from '@soybeanjs/headless';
import type { ToastIconType } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { miniSizeMap, mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import Button from '../button/button.vue';
import { toastVariants } from './variants';
import type { ToasterProps } from './types';
import toastStyles from './styles.css?raw';

defineOptions({
  name: 'SToaster'
});

const props = withDefaults(defineProps<ToasterProps>(), {
  showIcon: true,
  showClose: true,
  iconRender: (name: string) => h(Icon, { icon: name })
});

const forwardedProps = useOmitProps(props, ['size', 'ui', 'icons', 'buttonRender']);

const ui = computed(() => {
  const variants = toastVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

const iconMap: Record<ToastIconType, string> = {
  info: 'lucide:info',
  success: 'lucide:circle-check',
  warning: 'lucide:circle-alert',
  error: 'lucide:circle-x',
  close: 'lucide:x',
  loading: 'svg-spinners:270-ring'
};

const icons = computed(() => ({ ...iconMap, ...props.icons }));

const buttonRender = (label: string, type: 'action' | 'cancel') => {
  if (props.buttonRender) {
    return props.buttonRender(label, type);
  }

  return h(
    Button,
    {
      size: miniSizeMap[props.size ?? 'md'],
      variant: type === 'action' ? 'solid' : 'pure',
      color: 'primary'
    },
    { default: () => label }
  );
};

provideToastUi(ui);
</script>

<template>
  <Toaster v-bind="forwardedProps" :icons="icons" :button-render="buttonRender">
    <slot />
    <Primitive id="__SoybeanUI_toastStyle" as="style">{{ toastStyles }}</Primitive>
  </Toaster>
</template>
