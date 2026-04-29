<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import Icon from '../_icon/icon.vue';
import type { IconValue } from '../_icon/types';
import DialogPortal from '../portal/portal.vue';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogCancel,
  DialogConfirm
} from '../dialog';
import type { DialogAlertType } from '../dialog/types';
import { useBottomSheetUi } from './context';
import BottomSheetRootNested from './bottom-sheet-root-nested.vue';
import BottomSheetRoot from './bottom-sheet-root.vue';
import BottomSheetPopup from './bottom-sheet-popup.vue';
import BottomSheetOverlay from './bottom-sheet-overlay.vue';
import BottomSheetHandle from './bottom-sheet-handle.vue';
import type { BottomSheetCompactProps, BottomSheetCompactEmits, BottomSheetCompactSlots } from './types';

defineOptions({
  name: 'BottomSheetCompact'
});

const props = withDefaults(defineProps<BottomSheetCompactProps>(), {
  open: undefined,
  modal: true,
  shouldScaleBackground: true,
  setBackgroundColorOnScale: true,
  dismissible: true,
  showClose: true,
  showConfirm: true,
  alertType: 'default',
  showCancel: 'onlyWarning',
  cancelText: 'Cancel',
  confirmText: 'Confirm'
});

const forwardedProps = useOmitProps(props, [
  'title',
  'description',
  'icon',
  'showClose',
  'pure',
  'showCancel',
  'cancelText',
  'showConfirm',
  'confirmText',
  'triggerProps',
  'overlayProps',
  'portalProps',
  'popupProps',
  'headerProps',
  'contentProps',
  'footerProps',
  'titleProps',
  'descriptionProps',
  'closeProps',
  'cancelProps',
  'confirmProps',
  'handleProps'
]);

const emit = defineEmits<BottomSheetCompactEmits>();

const slots = defineSlots<BottomSheetCompactSlots>();

const listeners = useForwardListeners(emit);

const ui = useBottomSheetUi();

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

const showConfirm = computed(() => props.showConfirm ?? props.isAlert);

const showCancel = computed(() => {
  if (typeof props.showCancel === 'boolean') return props.showCancel;

  return props.isAlert === true && props.alertType === 'warning';
});

const showFooter = computed(() => {
  if (props.pure) return false;

  if (slots.footer) return true;

  return showCancel.value || showConfirm.value;
});
</script>

<template>
  <component
    :is="nested ? BottomSheetRootNested : BottomSheetRoot"
    v-slot="slotProps"
    v-bind="forwardedProps"
    @update:open="emit('update:open', $event)"
  >
    <DialogTrigger v-bind="triggerProps">
      <slot name="trigger" v-bind="slotProps" />
    </DialogTrigger>
    <DialogPortal v-bind="portalProps">
      <BottomSheetOverlay v-bind="overlayProps" />
      <BottomSheetPopup v-bind="popupProps" v-on="listeners">
        <BottomSheetHandle v-bind="handleProps" />
        <DialogHeader v-if="!pure" v-bind="headerProps">
          <DialogTitle v-bind="titleProps">
            <Icon v-if="icon" :icon="icon" :class="ui.icon" />
            <slot name="title" v-bind="slotProps">
              <span>{{ title }}</span>
            </slot>
          </DialogTitle>
          <DialogDescription v-if="slots.description || description" v-bind="descriptionProps">
            <slot name="description" v-bind="slotProps">{{ description }}</slot>
          </DialogDescription>
          <DialogClose v-if="!isAlert && showClose" @close="emit('close')">
            <slot name="close" v-bind="slotProps" />
          </DialogClose>
        </DialogHeader>
        <DialogContent v-bind="contentProps">
          <slot v-bind="slotProps" />
        </DialogContent>
        <DialogClose v-if="pure && !isAlert && showClose" @close="emit('close')">
          <slot name="close" v-bind="slotProps" />
        </DialogClose>
        <DialogFooter v-if="showFooter" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps">
            <DialogCancel v-if="showCancel" v-bind="cancelProps" @cancel="emit('cancel', $event)">
              <slot name="cancel" v-bind="slotProps">{{ cancelText }}</slot>
            </DialogCancel>
            <DialogConfirm v-if="showConfirm" v-bind="confirmProps" @confirm="emit('confirm', $event)">
              <slot name="confirm" v-bind="slotProps">{{ confirmText }}</slot>
            </DialogConfirm>
          </slot>
        </DialogFooter>
      </BottomSheetPopup>
    </DialogPortal>
  </component>
</template>
