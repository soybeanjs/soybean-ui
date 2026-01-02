<script setup lang="ts">
import { computed, onMounted } from 'vue';
import type { CSSProperties } from 'vue';
import { useDismissableLayer, useFocusGuards, useFocusScope, useHideOthers, useOmitProps } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { useDialogRootContext, useDialogUi } from './context';
import type { DialogContentImplEmits, DialogContentImplProps } from './types';

defineOptions({
  name: 'DialogContentImpl'
});

const props = defineProps<DialogContentImplProps>();

const emit = defineEmits<DialogContentImplEmits>();

const {
  modal,
  onOpenChange,
  setTriggerElement,
  contentElement,
  setContentElement,
  contentId,
  initContentId,
  dataState,
  titleId,
  descriptionId
} = useDialogRootContext('DialogContentImpl');

const { pointerEvents } = useDismissableLayer(contentElement, {
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

const { onKeydown } = useFocusScope(contentElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(props, ['trapFocus', 'disableOutsidePointerEvents']);

const cls = useDialogUi('content');

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
useHideOthers(contentElement, modal);
initContentId();
onMounted(() => {
  preserveTriggerElement();
});
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :id="contentId"
    :ref="setContentElement"
    :class="cls"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
    data-dismissable-layer
    :data-state="dataState"
    role="dialog"
    tabindex="-1"
    :style="style"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
