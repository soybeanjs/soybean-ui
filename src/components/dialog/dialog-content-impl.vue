<script setup lang="ts">
import { onMounted } from 'vue';
import { useDismissableLayer, useFocusGuards, useFocusScope, useHideOthers } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import type { DialogContentImplEmits, DialogContentImplProps } from './types';

defineOptions({
  name: 'DialogContentImpl'
});

const props = defineProps<DialogContentImplProps>();

const emit = defineEmits<DialogContentImplEmits>();

const {
  modal,
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

useHideOthers(contentElement, modal.value);

// Make sure the whole tree has focus guards as our `Dialog` will be
// the last element in the DOM (because of the `Portal`)
useFocusGuards();

const { computedStyle, layerProps } = useDismissableLayer(contentElement, {
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

const { onKeydown, focusScopeProps } = useFocusScope(contentElement, {
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
    v-bind="{ ...props, ...layerProps, ...focusScopeProps }"
    :id="contentId"
    :ref="setContentElement"
    :as="as"
    role="dialog"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
    :data-state="dataState"
    :style="computedStyle"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
