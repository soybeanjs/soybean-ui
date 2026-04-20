<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { CSSProperties } from 'vue';
import { useDismissableLayer, useFocusGuards, useFocusScope, useHideOthers, useOmitProps } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { useDialogRootContext, useDialogUi } from './context';
import type { DialogPopupImplProps, DialogPopupImplEmits } from './types';

defineOptions({
  name: 'DialogPopupImpl'
});

const props = defineProps<DialogPopupImplProps>();

const emit = defineEmits<DialogPopupImplEmits>();

const {
  modal,
  isAlert,
  alertType,
  onOpenChange,
  setTriggerElement,
  popupElement,
  setPopupElement,
  popupId,
  initPopupId,
  dataState,
  titleId,
  descriptionId,
  focusCancel
} = useDialogRootContext('DialogPopupImpl');

const { pointerEvents } = useDismissableLayer(popupElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    emit('focusOutside', event);
  },
  onInteractOutside: event => {
    emit('interactOutside', event);
  },
  onDismiss: () => {
    onOpenChange(false);
  }
});

const { onKeydown } = useFocusScope(popupElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onOpenAutoFocus: event => {
    if (isAlert.value) {
      focusCancel();
    }

    emit('openAutoFocus', event);
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(props, ['trapFocus', 'disableOutsidePointerEvents']);

const cls = useDialogUi('popup');

const style = computed<CSSProperties>(() => ({
  pointerEvents: pointerEvents.value
}));

const preserveTriggerElement = () => {
  const activeElement = getActiveElement();

  // Preserve the `DialogTrigger` element in case it was triggered programmatically
  if (activeElement !== document.body) {
    setTriggerElement(activeElement);
  }
};

// Make sure the whole tree has focus guards as our `Dialog` will be
// the last element in the DOM (because of the `Portal`)
useFocusGuards();
useHideOthers(popupElement, modal);
initPopupId();
onMounted(() => {
  preserveTriggerElement();
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :id="popupId"
    :ref="setPopupElement"
    :class="cls"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
    data-dismissable-layer
    :data-state="dataState"
    :data-type="isAlert ? alertType : undefined"
    :role="isAlert ? 'alertdialog' : 'dialog'"
    :aria-live="isAlert ? (alertType === 'error' ? 'assertive' : 'polite') : undefined"
    tabindex="-1"
    :style="style"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
