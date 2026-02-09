<script setup lang="ts">
import { computed } from 'vue';
import { ToastClose, ToastDescription, ToastRoot, ToastTitle, provideToastUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import ButtonIcon from '../button/button-icon.vue';
import Icon from '../icon/icon.vue';
import { toastVariants } from './variants';
import type { ToastEmits, ToastProps, ToastType } from './types';

defineOptions({
  name: 'SToast'
});

const props = withDefaults(defineProps<ToastProps>(), {
  open: undefined,
  showIcon: true
});

const emit = defineEmits<ToastEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'color', 'titleProps', 'descriptionProps']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = toastVariants({
    color: props.color,
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

const iconRecord: Record<ToastType, { icon: string; class: string }> = {
  destructive: {
    icon: 'lucide:circle-x',
    class: 'text-destructive'
  },
  success: {
    icon: 'lucide:circle-check',
    class: 'text-success'
  },
  warning: {
    icon: 'lucide:circle-alert',
    class: 'text-warning'
  },
  info: {
    icon: 'lucide:info',
    class: 'text-info'
  }
};

const iconConfig = computed(() => {
  if (props.type) {
    return iconRecord[props.type];
  }

  return null;
});

provideToastUi(ui);
</script>

<template>
  <ToastRoot v-bind="forwardedProps" v-on="listeners">
    <ToastTitle v-bind="titleProps">
      <Icon v-if="showIcon && iconConfig" :icon="iconConfig.icon" :class="iconConfig.class" />
      <slot name="title" />
    </ToastTitle>
    <ToastDescription v-bind="descriptionProps">
      <slot name="description" />
    </ToastDescription>
    <ToastClose as-child>
      <slot name="close">
        <ButtonIcon :size="size" icon="lucide:x" />
      </slot>
    </ToastClose>
    <slot />
  </ToastRoot>
</template>
