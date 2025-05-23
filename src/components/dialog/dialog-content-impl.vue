<script setup lang="ts">
import { onMounted } from 'vue';
import { useDismissableLayer, useFocusGuards, useFocusScope } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import type { DialogContentImplEmits, DialogContentImplProps } from './types';

const props = defineProps<DialogContentImplProps>();

const emit = defineEmits<DialogContentImplEmits>();

const {
  closeModal,
  contentId,
  contentElement,
  setContentElement,
  setTriggerElement,
  initTitleId,
  initDescriptionId,
  dataState,
  titleId,
  descriptionId
} = useDialogRootContext('DialogContentImpl');

// Make sure the whole tree has focus guards as our `Dialog` will be
// the last element in the DOM (because of the `Portal`)
useFocusGuards();

const { style, DISMISSABLE_LAYER_ATTRIBUTE } = useDismissableLayer(contentElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeydown: event => {
    emit('escapeKeydown', event);
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
    closeModal();
  }
});

const { onKeydown, tabindex } = useFocusScope(contentElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onMountAutoFocus: event => {
    emit('openAutoFocus', event);
  },
  onUnmountAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const preserveTriggerElement = () => {
  const activeElement = getActiveElement();

  // Preserve the `DialogTrigger` element in case it was triggered programmatically
  if (activeElement !== document.body) {
    setTriggerElement(activeElement);
  }
};

initTitleId();
initDescriptionId();

onMounted(() => {
  preserveTriggerElement();
});
</script>

<template>
  <Primitive
    :id="contentId"
    :ref="setContentElement"
    :class="props.class"
    :as="as"
    role="dialog"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
    :data-state="dataState"
    :[DISMISSABLE_LAYER_ATTRIBUTE]="true"
    :style="style"
    :tabindex="tabindex"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
