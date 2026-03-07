<script setup lang="ts">
import { computed, useSlots } from 'vue';
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
  AlertDialogTrigger,
  provideAlertDialogUi
} from '@soybeanjs/headless';
import { useForwardListeners, usePickProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { mergeSlotVariants } from '@/theme';
import { dialogVariants } from '../dialog/variants';
import Icon from '../icon/icon.vue';
import { provideAlertDialogContext } from './context';
import SAlertDialogConfirm from './alert-dialog-confirm.vue';
import SAlertDialogCancel from './alert-dialog-cancel.vue';
import type { AlertDialogEmits, AlertDialogProps, AlertDialogType } from './types';

defineOptions({
  name: 'SAlertDialog'
});

const props = withDefaults(defineProps<AlertDialogProps>(), {
  open: undefined,
  defaultOpen: false,
  showIcon: true,
  showCancel: 'onlyWarning'
});

const forwardedProps = usePickProps(props, ['open', 'defaultOpen']);

const emit = defineEmits<AlertDialogEmits>();

const slots = useSlots();

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = dialogVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { content: props.class });
});

const iconRecord: Record<AlertDialogType, { icon: string; class: string }> = {
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
  if (!props.type) return null;

  return iconRecord[props.type];
});

const cancelVisible = computed(() => {
  if (typeof props.showCancel === 'boolean') {
    return props.showCancel;
  }

  return props.type === 'warning';
});

const onClose = () => {
  emit('close');
};

provideAlertDialogUi(ui);
provideAlertDialogContext({
  ...transformPropsToContext(props, ['size', 'confirmText', 'cancelText', 'showCancel', 'confirmProps', 'cancelProps']),
  beforeConfirm: props.beforeConfirm,
  beforeCancel: props.beforeCancel,
  onClose
});
</script>

<template>
  <AlertDialogRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <AlertDialogTrigger v-bind="triggerProps" :size="size" as-child>
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal v-bind="portalProps">
      <AlertDialogOverlay v-bind="overlayProps" />
      <AlertDialogContent v-bind="contentProps" v-on="listeners">
        <AlertDialogHeader v-bind="headerProps">
          <AlertDialogTitle v-bind="titleProps">
            <Icon v-if="showIcon && iconConfig" :icon="iconConfig.icon" :class="iconConfig.class" />
            <slot name="title" :close="slotProps.close">{{ title }}</slot>
          </AlertDialogTitle>
          <AlertDialogDescription v-if="slots.description || description" v-bind="descriptionProps">
            <slot name="description" :close="slotProps.close">{{ description }}</slot>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <slot :close="slotProps.close" />
        <AlertDialogFooter v-bind="footerProps">
          <slot name="footer" :close="slotProps.close">
            <SAlertDialogCancel v-if="cancelVisible" />
            <SAlertDialogConfirm />
          </slot>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
