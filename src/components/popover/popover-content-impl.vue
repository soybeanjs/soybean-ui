<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import {
  useBodyScrollLock,
  useDismissableLayer,
  useFocusGuards,
  useFocusScope,
  useHideOthers
} from '../../composables';
import { omit } from '../../shared';
import { PopperContent } from '../popper';
import { popperCssVars } from '../popper/shared';
import { usePopoverRootContext } from './context';
import { popoverCssVars } from './shared';
import type { PopoverContentImplEmits, PopoverContentImplProps } from './types';

defineOptions({
  name: 'PopoverContentImpl'
});

const props = defineProps<PopoverContentImplProps>();

const emit = defineEmits<PopoverContentImplEmits>();

const {
  onOpenChange,
  modal,
  dataState,
  triggerId,
  initTriggerId,
  contentElement,
  setContentElement,
  contentId,
  initContentId
} = usePopoverRootContext('PopoverContentImpl');

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

const forwardedProps = computed(() => ({
  ...omit(props, ['disableOutsidePointerEvents', 'trapFocus']),
  ...layerProps,
  ...focusScopeProps
}));

const cssVarsStyle = {
  [popoverCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [popoverCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [popoverCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [popoverCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [popoverCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

const style = computed(() => ({
  ...cssVarsStyle,
  ...computedStyle.value
}));

useHideOthers(contentElement, modal.value);
// Make sure the whole tree has focus guards as our `Dialog` will be the last element in the DOM (because of the `Portal`)
useFocusGuards();
initContentId();
initTriggerId();

watchEffect(onCleanup => {
  if (modal.value) {
    onCleanup(useBodyScrollLock());
  }
});
</script>

<template>
  <PopperContent
    v-bind="forwardedProps"
    :id="contentId"
    :ref="setContentElement"
    role="dialog"
    :data-state="dataState"
    :aria-labelledby="triggerId"
    :style="style"
    @keydown="onKeydown"
  >
    <slot />
  </PopperContent>
</template>
