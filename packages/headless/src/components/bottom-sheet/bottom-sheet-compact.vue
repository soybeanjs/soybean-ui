<script setup lang="ts">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '../../composables';
import { useLocaleMessages } from '../../locale';
import Icon from '../_icon/icon.vue';
import type { IconValue } from '../_icon/types';
import { DialogPortal as BottomSheetPortal } from '../dialog';
import type { DialogAlertType } from '../dialog/types';
import { useBottomSheetUi } from './context';
import BottomSheetCancel from './bottom-sheet-cancel.vue';
import BottomSheetClose from './bottom-sheet-close.vue';
import BottomSheetConfirm from './bottom-sheet-confirm.vue';
import BottomSheetContent from './bottom-sheet-content.vue';
import BottomSheetDescription from './bottom-sheet-description.vue';
import BottomSheetFooter from './bottom-sheet-footer.vue';
import BottomSheetHandle from './bottom-sheet-handle.vue';
import BottomSheetHeader from './bottom-sheet-header.vue';
import BottomSheetOverlay from './bottom-sheet-overlay.vue';
import BottomSheetPopup from './bottom-sheet-popup.vue';
import BottomSheetRootNested from './bottom-sheet-root-nested.vue';
import BottomSheetRoot from './bottom-sheet-root.vue';
import BottomSheetTitle from './bottom-sheet-title.vue';
import BottomSheetTrigger from './bottom-sheet-trigger.vue';
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
  showCancel: 'onlyWarning'
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

const messages = useLocaleMessages();

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

const cancelText = computed(() => props.cancelText ?? messages.value.dialog.cancel);

const confirmText = computed(() => props.confirmText ?? messages.value.dialog.confirm);
</script>

<template>
  <component
    :is="nested ? BottomSheetRootNested : BottomSheetRoot"
    v-slot="slotProps"
    v-bind="forwardedProps"
    @update:open="emit('update:open', $event)"
  >
    <BottomSheetTrigger v-bind="triggerProps">
      <slot name="trigger" v-bind="slotProps" />
    </BottomSheetTrigger>
    <BottomSheetPortal v-bind="portalProps">
      <BottomSheetOverlay v-bind="overlayProps" />
      <BottomSheetPopup v-bind="popupProps" v-on="listeners">
        <BottomSheetHandle v-bind="handleProps" />
        <BottomSheetHeader v-if="!pure" v-bind="headerProps">
          <BottomSheetTitle v-bind="titleProps">
            <Icon v-if="icon" :icon="icon" :class="ui.icon" />
            <slot name="title" v-bind="slotProps">
              <span>{{ title }}</span>
            </slot>
          </BottomSheetTitle>
          <BottomSheetDescription v-if="slots.description || description" v-bind="descriptionProps">
            <slot name="description" v-bind="slotProps">{{ description }}</slot>
          </BottomSheetDescription>
          <BottomSheetClose v-if="!isAlert && showClose" @close="emit('close')">
            <slot name="close" v-bind="slotProps" />
          </BottomSheetClose>
        </BottomSheetHeader>
        <BottomSheetContent v-bind="contentProps">
          <slot v-bind="slotProps" />
        </BottomSheetContent>
        <BottomSheetClose v-if="pure && !isAlert && showClose" @close="emit('close')">
          <slot name="close" v-bind="slotProps" />
        </BottomSheetClose>
        <BottomSheetFooter v-if="showFooter" v-bind="footerProps">
          <slot name="footer" v-bind="slotProps">
            <BottomSheetCancel v-if="showCancel" v-bind="cancelProps" @cancel="emit('cancel', $event)">
              <slot name="cancel" v-bind="slotProps">{{ cancelText }}</slot>
            </BottomSheetCancel>
            <BottomSheetConfirm v-if="showConfirm" v-bind="confirmProps" @confirm="emit('confirm', $event)">
              <slot name="confirm" v-bind="slotProps">{{ confirmText }}</slot>
            </BottomSheetConfirm>
          </slot>
        </BottomSheetFooter>
      </BottomSheetPopup>
    </BottomSheetPortal>
  </component>
</template>
