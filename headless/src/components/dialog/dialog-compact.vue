<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import Icon from '../icon/icon-render.vue';
import type { IconValue } from '../icon/types';
import DialogPortal from '../portal/portal.vue';
import { useDialogUi, useDialogProviderContext, provideDialogCompactContext } from './context';
import DialogClose from './dialog-close.vue';
import DialogPopup from './dialog-popup.vue';
import DialogContent from './dialog-content.vue';
import DialogDescription from './dialog-description.vue';
import DialogFooter from './dialog-footer.vue';
import DialogHeader from './dialog-header.vue';
import DialogOverlay from './dialog-overlay.vue';
import DialogRoot from './dialog-root.vue';
import DialogTitle from './dialog-title.vue';
import DialogTrigger from './dialog-trigger.vue';
import DialogCancel from './dialog-cancel.vue';
import DialogConfirm from './dialog-confirm.vue';
import type { DialogCompactProps, DialogCompactEmits, DialogCompactSlots, DialogAlertType } from './types';

defineOptions({
  name: 'DialogCompact'
});

const props = withDefaults(defineProps<DialogCompactProps>(), {
  open: undefined,
  modal: true,
  showClose: true,
  alertType: 'default',
  showCancel: 'onlyWarning',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
});

const forwardedProps = useOmitProps(props, [
  'alertType',
  'cancelProps',
  'cancelText',
  'closeProps',
  'confirmProps',
  'confirmText',
  'contentProps',
  'description',
  'descriptionProps',
  'footerProps',
  'headerProps',
  'icon',
  'overlayProps',
  'popupProps',
  'portalProps',
  'pure',
  'showCancel',
  'showClose',
  'showConfirm',
  'title',
  'titleProps',
  'triggerProps',
]);

const emit = defineEmits<DialogCompactEmits>();

const slots = defineSlots<DialogCompactSlots>();

const attrs = useAttrs();

const listeners = useForwardListeners(emit);

const providerContext = useDialogProviderContext();

const dialog = computed(() => providerContext?.getCurrentDialog(attrs['data-dialog-id'] as string));

const iconCls = computed(() => [useDialogUi().value?.icon, dialog.value?.ui?.icon].filter(Boolean).join(' '));

const triggerProps = computed(() => ({
  ...props.triggerProps,
  asChild: props.triggerProps?.asChild ?? true
}));

const icons: Record<DialogAlertType, IconValue> = {
  default: null,
  info: 'lucide:info',
  warning: 'lucide:circle-alert',
  error: 'lucide:circle-x',
  success: 'lucide:circle-check'
};

const icon = computed(() => {
  if (props.icon) return props.icon;

  if (props.isAlert && props.alertType) {
    return icons[props.alertType];
  }

  return null;
});

const showConfirm = computed(() => {
  if (typeof props.showConfirm === 'boolean') return props.showConfirm;

  return props.isAlert;
});

const showCancel = computed(() => {
  if (props.showCancel === true) return true;

  if (props.showCancel === false) return false;

  return props.isAlert === true && props.alertType === 'warning';
});

const showFooter = computed(() => {
  if (props.pure) return false;

  if (slots.footer) return true;

  return showCancel.value || showConfirm.value;
});

provideDialogCompactContext({
  dialog
});
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="forwardedProps" @update:open="emit('update:open', $event)">
    <DialogTrigger v-bind="triggerProps">
      <slot name="trigger" v-bind="slotProps" />
    </DialogTrigger>
    <DialogPortal v-bind="portalProps">
      <DialogOverlay v-bind="overlayProps" />
      <DialogPopup v-bind="popupProps" v-on="listeners">
        <DialogHeader v-if="!pure" v-bind="headerProps">
          <DialogTitle v-bind="titleProps">
            <Icon v-if="icon" :icon="icon" :class="iconCls" />
            <slot name="title" v-bind="slotProps">
              <span>{{ title }}</span>
            </slot>
          </DialogTitle>
          <DialogDescription v-if="slots.description || description" v-bind="descriptionProps">
            <slot name="description" v-bind="slotProps">{{ description }}</slot>
          </DialogDescription>
          <DialogClose v-if="!isAlert && showClose" @close="emit('close', $event)">
            <slot name="close" />
          </DialogClose>
        </DialogHeader>
        <DialogContent v-bind="contentProps">
          <slot v-bind="slotProps" />
        </DialogContent>
        <DialogClose v-if="pure && !isAlert && showClose" @close="emit('close', $event)">
          <slot name="close" />
        </DialogClose>
        <DialogFooter v-if="showFooter" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps">
            <DialogCancel v-if="showCancel" v-bind="cancelProps" @cancel="emit('cancel', $event)">
              <slot name="cancel">{{ cancelText }}</slot>
            </DialogCancel>
            <DialogConfirm v-if="showConfirm" v-bind="confirmProps" @confirm="emit('confirm', $event)">
              <slot name="confirm">{{ confirmText }}</slot>
            </DialogConfirm>
          </slot>
        </DialogFooter>
      </DialogPopup>
    </DialogPortal>
  </DialogRoot>
</template>
