<script setup lang="ts">
import { computed, useSlots } from 'vue';
import {
  PopoverArrow,
  PopoverClose,
  PopoverPopup,
  PopoverPortal,
  PopoverPositioner,
  PopoverRoot,
  PopoverTrigger,
  providePopoverUi
} from '@soybeanjs/headless';
import { useForwardListeners, usePickProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { providePopconfirmContext } from './context';
import { popconfirmVariants } from './variants';
import SPopconfirmCancel from './popconfirm-cancel.vue';
import SPopconfirmConfirm from './popconfirm-confirm.vue';
import type { PopconfirmEmits, PopconfirmProps, PopconfirmType } from './types';

defineOptions({
  name: 'SPopconfirm'
});

const props = withDefaults(defineProps<PopconfirmProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
  showArrow: true,
  showIcon: true,
  showCancel: 'onlyWarning'
});

const emit = defineEmits<PopconfirmEmits>();

const slots = useSlots();

const forwardedRootProps = usePickProps(props, ['defaultOpen', 'open', 'modal']);

const listeners = useForwardListeners(emit);

const ui = computed(() => {
  const variants = popconfirmVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { popup: props.class });
});

const iconRecord: Record<PopconfirmType, { icon: string; class: string }> = {
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

const positionerProps = computed(() => {
  return {
    placement: props.placement,
    ...props.positionerProps
  };
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

providePopoverUi(ui);
providePopconfirmContext({
  ...transformPropsToContext(props, ['size', 'confirmText', 'cancelText', 'showCancel', 'cancelProps', 'confirmProps']),
  beforeConfirm: props.beforeConfirm,
  beforeCancel: props.beforeCancel,
  onClose
});
</script>

<template>
  <PopoverRoot v-slot="slotProps" v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <PopoverTrigger v-bind="triggerProps" as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal v-bind="portalProps">
      <PopoverPositioner v-bind="positionerProps" v-on="listeners">
        <PopoverPopup v-bind="popupProps">
          <div v-bind="headerProps" :class="ui.header">
            <h3 v-bind="titleProps" :class="ui.title">
              <Icon v-if="showIcon && iconConfig" :icon="iconConfig.icon" :class="iconConfig.class" />
              <slot name="title" :close="slotProps.close">{{ title }}</slot>
            </h3>
            <p v-if="slots.description || description" :class="ui.description">
              <slot name="description" :close="slotProps.close">{{ description }}</slot>
            </p>
          </div>
          <div v-if="$slots.content || content" v-bind="contentProps" :class="ui.content">
            <slot :close="slotProps.close">{{ content }}</slot>
          </div>
          <div :class="ui.footer">
            <slot name="footer" :close="slotProps.close">
              <SPopconfirmCancel v-if="cancelVisible" />
              <SPopconfirmConfirm :text="confirmText" />
            </slot>
          </div>
          <PopoverArrow v-if="showArrow" v-bind="arrowProps" />
        </PopoverPopup>
        <PopoverClose v-if="$slots.close" as-child>
          <slot name="close" />
        </PopoverClose>
      </PopoverPositioner>
    </PopoverPortal>
  </PopoverRoot>
</template>
