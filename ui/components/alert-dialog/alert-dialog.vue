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
  provideDialogThemeContext
} from '@headless';
import { useForwardListeners, useOmitProps } from '@headless/composables';
import { mergeSlotVariants, provideSizeContext } from '@theme';
import { dialogVariants } from '@variants/dialog';
import Icon from '../icon/icon.vue';
import type { AlertDialogEmits, AlertDialogProps, AlertDialogType } from './types';

defineOptions({
  name: 'SAlertDialog'
});

const props = withDefaults(defineProps<AlertDialogProps>(), {
  open: undefined,
  defaultOpen: false
});

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'type',
  'title',
  'description',
  'triggerProps',
  'contentProps',
  'headerProps',
  'footerProps',
  'titleProps',
  'descriptionProps',
  'overlayProps',
  'portalProps'
]);

const emit = defineEmits<AlertDialogEmits>();

const slots = useSlots();

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = dialogVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
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

provideDialogThemeContext({
  ui
});

provideSizeContext(() => props.size);
</script>

<template>
  <AlertDialogRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <AlertDialogTrigger v-bind="triggerProps" :size="size">
      <slot name="trigger" />
    </AlertDialogTrigger>
    <AlertDialogPortal v-bind="portalProps">
      <AlertDialogOverlay v-bind="overlayProps" />
      <AlertDialogContent v-bind="contentProps" v-on="listeners">
        <AlertDialogHeader v-bind="headerProps">
          <AlertDialogTitle v-bind="titleProps">
            <Icon v-if="iconConfig" :icon="iconConfig.icon" :class="iconConfig.class" />
            <slot name="title" v-bind="slotProps">{{ title }}</slot>
          </AlertDialogTitle>
          <AlertDialogDescription v-if="slots.description || description" v-bind="descriptionProps">
            <slot name="description" v-bind="slotProps">{{ description }}</slot>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <slot v-bind="slotProps" />
        <AlertDialogFooter v-if="slots.footer" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps" />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
