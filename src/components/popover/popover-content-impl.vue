<script setup lang="ts">
import { computed, onWatcherCleanup, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import {
  useBodyScrollLock,
  useDismissableLayer,
  useFocusGuards,
  useFocusScope,
  useForwardElement,
  useHideOthers,
  useOmitProps
} from '../../composables';
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

const { onOpenChange, modal, dataState, triggerId, onContentElementChange, contentId, initContentId } =
  usePopoverRootContext('PopoverContentImpl');

const [floatingElement, setFloatingElement] = useForwardElement(props.floatingRef);
const [contentElement, setContentElement] = useForwardElement(onContentElementChange);

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

const { onKeydown, focusScopeProps } = useFocusScope(floatingElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(props, ['disableOutsidePointerEvents', 'trapFocus'], layerProps, focusScopeProps);

const cssVarsStyle: CSSProperties = {
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

// Make sure the whole tree has focus guards as our `Dialog` will be the last element in the DOM (because of the `Portal`)
useFocusGuards();
useHideOthers(contentElement, modal);
initContentId();

watchEffect(() => {
  if (modal.value) {
    const cleanup = useBodyScrollLock();
    onWatcherCleanup(cleanup);
  }
});
</script>

<template>
  <PopperContent
    v-bind="forwardedProps"
    :id="contentId"
    :ref="setContentElement"
    :floating-ref="setFloatingElement"
    role="dialog"
    :data-state="dataState"
    :aria-labelledby="triggerId"
    :style="style"
    @keydown="onKeydown"
  >
    <slot />
  </PopperContent>
</template>
