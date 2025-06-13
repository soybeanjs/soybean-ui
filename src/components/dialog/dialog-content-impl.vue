<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useDismissableLayer, useFocusGuards, useFocusScope, useHideOthers, useOmitProps } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { useDialogRootContext, useDialogThemeContext } from './context';
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

const themeContext = useDialogThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.content, props.class]);

const { computedStyle, layerProps } = useDismissableLayer(contentElement, {
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

const { onKeydown, focusScopeProps } = useFocusScope(contentElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(props, ['trapFocus', 'disableOutsidePointerEvents'], layerProps, focusScopeProps);

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
