<!-- <script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useDismissableLayer, useEscapeKeydown, useFocusScope, usePresence } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { Primitive } from '../primitive';
import { useDialogRootContext } from './context';
import { getDialogDescriptionWarning, getDialogTitleWarning } from './shared';
import type { DialogContentEmits, DialogContentProps } from './types';

const props = withDefaults(defineProps<DialogContentProps>(), {
  as: 'div',
  forceMount: false,
  trapFocus: true
});

const emit = defineEmits<DialogContentEmits>();

const rootContext = useDialogRootContext('DialogContent');
const {
  open,
  modal,
  onOpenChange,
  contentId,
  titleId,
  descriptionId,
  initContentId,
  initTitleId,
  initDescriptionId,
  contentElement,
  setContentElement
} = rootContext;

// Initialize IDs
initContentId();
initTitleId();
initDescriptionId();

// Presence management
const isPresent = usePresence(
  contentElement,
  computed(() => props.forceMount || open.value)
);

// Focus management
if (props.trapFocus) {
  useFocusScope(contentElement, {
    trapped: computed(() => open.value && Boolean(modal.value)),
    onMountAutoFocus: event => emit('openAutoFocus', event),
    onUnmountAutoFocus: event => emit('closeAutoFocus', event)
  });
}

// Escape key handling
useEscapeKeydown((event: KeyboardEvent) => {
  if (props.onEscapeKeyDown) {
    props.onEscapeKeyDown(event);
  } else {
    emit('escapeKeyDown', event);
    if (!event.defaultPrevented) {
      onOpenChange(false);
    }
  }
});

// Dismissable layer for modal dialogs
if (modal.value) {
  useDismissableLayer(contentElement, {
    onPointerDownOutside: (event: PointerDownOutsideEvent) => {
      if (props.onPointerDownOutside) {
        props.onPointerDownOutside(event.detail.originalEvent);
      } else {
        emit('pointerDownOutside', event.detail.originalEvent);
      }
    },
    onFocusOutside: (event: FocusOutsideEvent) => {
      if (props.onFocusOutside) {
        props.onFocusOutside(event.detail.originalEvent);
      } else {
        emit('focusOutside', event.detail.originalEvent);
      }
    },
    onInteractOutside: (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
      if (props.onInteractOutside) {
        props.onInteractOutside(event.detail.originalEvent);
      } else {
        emit('interactOutside', event.detail.originalEvent);
      }
    }
  });
}

// Accessibility warnings
onMounted(() => {
  const hasTitle = document.getElementById(titleId.value);
  if (!hasTitle) {
    console.warn(getDialogTitleWarning());
  }

  const describedById = contentElement.value?.getAttribute('aria-describedby');
  if (descriptionId.value && describedById) {
    const hasDescription = document.getElementById(descriptionId.value);
    if (!hasDescription) {
      console.warn(getDialogDescriptionWarning());
    }
  }
});
</script>

<template>
  <Primitive
    v-if="isPresent"
    v-bind="props"
    :id="contentId"
    :ref="setContentElement"
    role="dialog"
    :aria-modal="modal"
    :aria-labelledby="titleId"
    :aria-describedby="descriptionId"
    :data-state="open ? 'open' : 'closed'"
  >
    <slot />
  </Primitive>
</template> -->
