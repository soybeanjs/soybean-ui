<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import type { IconValue } from '../_icon/types';
import PopoverPortal from '../portal/portal.vue';
import PopoverClose from '../popover/popover-close.vue';
import PopoverPopup from '../popover/popover-popup.vue';
import PopoverPositioner from '../popover/popover-positioner.vue';
import PopoverRoot from '../popover/popover-root.vue';
import PopoverTrigger from '../popover/popover-trigger.vue';
import PopperArrow from '../popper/popper-arrow.vue';
import { usePopconfirmUi } from './context';
import PopconfirmHeader from './popconfirm-header.vue';
import PopconfirmTitle from './popconfirm-title.vue';
import PopconfirmDescription from './popconfirm-description.vue';
import PopconfirmContent from './popconfirm-content.vue';
import PopconfirmFooter from './popconfirm-footer.vue';
import PopconfirmCancel from './popconfirm-cancel.vue';
import PopconfirmConfirm from './popconfirm-confirm.vue';
import type { PopconfirmCompactProps, PopconfirmCompactEmits, PopconfirmCompactSlots, PopconfirmType } from './types';

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
  'triggerProps',
  'portalProps',
  'positionerProps',
  'popupProps',
  'arrowProps',
  'closeProps',
  'headerProps',
  'titleProps',
  'descriptionProps',
  'contentProps',
  'footerProps',
  'confirmProps',
  'cancelProps'
]);

const listeners = useForwardListeners(emit);

const ui = usePopconfirmUi();

const icons: Record<PopconfirmType, IconValue> = {
  error: 'lucide:circle-x',
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

const positionerProps = computed(() => ({
  ...props.positionerProps,
  placement: props.placement ?? props.positionerProps?.placement
}));

const cancelVisible = computed(() => {
  if (typeof props.showCancel === 'boolean') {
    return props.showCancel;
  }

  return props.type === 'warning';
});
</script>

<template>
  <PopoverRoot
    v-slot="slotProps"
    v-bind="forwardedRootProps"
    :data-type="type"
    @update:open="emit('update:open', $event)"
  >
    <PopoverTrigger v-bind="triggerProps">
      <slot name="trigger" v-bind="slotProps" />
    </PopoverTrigger>
    <PopoverPortal v-bind="portalProps">
      <PopoverPositioner v-bind="positionerProps" v-on="listeners">
        <PopoverPopup v-bind="popupProps">
          <PopconfirmHeader>
            <PopconfirmTitle v-bind="titleProps">
              <Icon v-if="showIcon && icon" :class="ui.icon" :icon="icon" />
              <slot name="title" v-bind="slotProps">
                <span>{{ title }}</span>
              </slot>
            </PopconfirmTitle>
            <PopconfirmDescription v-if="slots.description || description" v-bind="descriptionProps">
              <slot name="description" v-bind="slotProps">{{ description }}</slot>
            </PopconfirmDescription>
          </PopconfirmHeader>
          <PopconfirmContent v-if="slots.default || content" v-bind="contentProps">
            <slot v-bind="slotProps">{{ content }}</slot>
          </PopconfirmContent>
          <PopconfirmFooter v-bind="footerProps">
            <slot name="footer" v-bind="slotProps">
              <PopconfirmCancel v-if="cancelVisible" v-bind="cancelProps" @close="emit('cancel', $event)">
                {{ cancelText }}
              </PopconfirmCancel>
              <PopconfirmConfirm v-bind="confirmProps" @close="emit('confirm', $event)">
                {{ confirmText }}
              </PopconfirmConfirm>
            </slot>
          </PopconfirmFooter>
          <PopperArrow v-if="showArrow" v-bind="arrowProps" />
        </PopoverPopup>
        <PopoverClose v-if="slots.close" v-bind="closeProps">
          <slot name="close" v-bind="slotProps" />
        </PopoverClose>
      </PopoverPositioner>
    </PopoverPortal>
  </PopoverRoot>
</template>
