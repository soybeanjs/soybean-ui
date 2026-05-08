<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import { transformPropsToContext } from '../../shared';
import Icon from '../_icon/icon.vue';
import PopoverPortal from '../portal/portal.vue';
import PopoverClose from '../popover/popover-close.vue';
import PopoverPopup from '../popover/popover-popup.vue';
import PopoverPositioner from '../popover/popover-positioner.vue';
import PopoverRoot from '../popover/popover-root.vue';
import PopoverTrigger from '../popover/popover-trigger.vue';
import PopperArrow from '../popper/popper-arrow.vue';
import { providePopconfirmContext, usePopconfirmUi } from './context';
import PopconfirmCancel from './popconfirm-cancel.vue';
import PopconfirmConfirm from './popconfirm-confirm.vue';
import type {
  PopconfirmCompactEmits,
  PopconfirmCompactProps,
  PopconfirmCompactSlots,
  PopconfirmIcon,
  PopconfirmType
} from './types';

defineOptions({
  name: 'PopconfirmCompact'
});

const props = withDefaults(defineProps<PopconfirmCompactProps>(), {
  open: undefined,
  defaultOpen: false,
  modal: false,
  showArrow: true,
  showIcon: true,
  showCancel: 'onlyWarning',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
});

const emit = defineEmits<PopconfirmCompactEmits>();

const slots = defineSlots<PopconfirmCompactSlots>();

const forwardedRootProps = useOmitProps(props, [
  'type',
  'placement',
  'title',
  'description',
  'content',
  'showArrow',
  'showIcon',
  'confirmText',
  'cancelText',
  'showCancel',
  'beforeCancel',
  'beforeConfirm',
  'confirmProps',
  'cancelProps',
  'positionerProps',
  'popupProps',
  'triggerProps',
  'closeProps',
  'portalProps',
  'arrowProps',
  'headerProps',
  'titleProps',
  'descriptionProps',
  'contentProps',
  'footerProps'
]);

const listeners = useForwardListeners(emit);

const ui = usePopconfirmUi();

const icons: Record<PopconfirmType, PopconfirmIcon> = {
  destructive: 'lucide:circle-x',
  success: 'lucide:circle-check',
  warning: 'lucide:circle-alert',
  info: 'lucide:info'
};

const icon = computed(() => {
  if (!props.type) {
    return null;
  }

  return icons[props.type];
});

const triggerProps = computed(() => ({
  ...props.triggerProps,
  asChild: props.triggerProps?.asChild ?? true
}));

const closeProps = computed(() => ({
  ...props.closeProps,
  asChild: props.closeProps?.asChild ?? true
}));

const positionerProps = computed(() => ({
  ...props.positionerProps,
  placement: props.placement ?? props.positionerProps?.placement
}));

const popupProps = computed(() => ({
  ...props.popupProps,
  'aria-label': props.popupProps?.['aria-label'] ?? props.title
}));

const cancelVisible = computed(() => {
  if (typeof props.showCancel === 'boolean') {
    return props.showCancel;
  }

  return props.type === 'warning';
});

const handleClose = () => {
  emit('close');
};

providePopconfirmContext({
  ...transformPropsToContext(props, ['confirmText', 'cancelText', 'confirmProps', 'cancelProps']),
  beforeConfirm: props.beforeConfirm,
  beforeCancel: props.beforeCancel,
  onClose: handleClose
});
</script>

<template>
  <PopoverRoot v-slot="slotProps" v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <PopoverTrigger v-bind="triggerProps">
      <slot name="trigger" v-bind="slotProps" />
    </PopoverTrigger>
    <PopoverPortal v-bind="portalProps">
      <PopoverPositioner v-bind="positionerProps" v-on="listeners">
        <PopoverPopup v-bind="popupProps">
          <div v-bind="headerProps" :class="ui.header" data-slot="header">
            <h3 v-bind="titleProps" :class="ui.title" data-slot="title">
              <span v-if="showIcon && icon" :class="ui.icon" data-slot="icon">
                <Icon :icon="icon" />
              </span>
              <slot name="title" v-bind="slotProps">{{ title }}</slot>
            </h3>
            <p v-if="slots.description || description" v-bind="descriptionProps" :class="ui.description" data-slot="description">
              <slot name="description" v-bind="slotProps">{{ description }}</slot>
            </p>
          </div>
          <div v-if="slots.default || content" v-bind="contentProps" :class="ui.content" data-slot="content">
            <slot v-bind="slotProps">{{ content }}</slot>
          </div>
          <div v-bind="footerProps" :class="ui.footer" data-slot="footer">
            <slot name="footer" v-bind="slotProps">
              <PopconfirmCancel v-if="cancelVisible" v-bind="cancelProps" @close="handleClose">{{ cancelText }}</PopconfirmCancel>
              <PopconfirmConfirm v-bind="confirmProps" @close="handleClose">{{ confirmText }}</PopconfirmConfirm>
            </slot>
          </div>
          <PopperArrow v-if="showArrow" v-bind="arrowProps" />
        </PopoverPopup>
        <PopoverClose v-if="slots.close" v-bind="closeProps">
          <slot name="close" v-bind="slotProps" />
        </PopoverClose>
      </PopoverPositioner>
    </PopoverPortal>
  </PopoverRoot>
</template>
