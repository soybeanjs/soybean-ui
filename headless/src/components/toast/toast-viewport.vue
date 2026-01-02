<script setup lang="ts">
import { computed, onWatcherCleanup, useAttrs, watchEffect } from 'vue';
import { onKeyStroke } from '@vueuse/core';
import { useForwardElement } from '../../composables';
import { getActiveElement, getTabbableCandidates, tryFocusFirst } from '../../shared';
import { Primitive } from '../primitive';
import { useCollectionContext, useToastProviderContext, useToastViewportUi } from './context';
import ToastFocusProxy from './toast-focus-proxy.vue';
import { VIEWPORT_PAUSE, VIEWPORT_RESUME } from './shared';
import type { TabbingDirection, ToastViewportProps } from './types';

defineOptions({
  name: 'ToastViewport',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastViewportProps>(), {
  as: 'ol',
  hotkey: () => ['F8'],
  label: 'Notifications ({hotkey})'
});

const attrs = useAttrs();

const cls = useToastViewportUi();

const { onViewportElementChange, toastCount, isClosePausedRef } = useToastProviderContext('ToastViewport');
const { onContainerElementChange, getOrderedElements } = useCollectionContext('ToastViewport');
const [headFocusProxyElement, setHeadFocusProxyElement] = useForwardElement();
const [tailFocusProxyElement, setTailFocusProxyElement] = useForwardElement();
const [viewportElement, setViewportElement] = useForwardElement(el => {
  onViewportElementChange(el);
  onContainerElementChange(el);
});

const hasToasts = computed(() => toastCount.value > 0);
const hotkeyMessage = computed(() => props.hotkey.join('+').replace(/Key/g, '').replace(/Digit/g, ''));
const ariaLabel = computed(() =>
  typeof props.label === 'string'
    ? props.label.replace('{hotkey}', hotkeyMessage.value)
    : props.label(hotkeyMessage.value)
);

onKeyStroke(props.hotkey, () => {
  viewportElement.value?.focus();
});

const onFocusFromOutsideViewport = (tabbingDirection: TabbingDirection) => {
  const tabbableCandidates = getSortedTabbableCandidates(tabbingDirection);
  tryFocusFirst(tabbableCandidates);
};

watchEffect(() => {
  const viewport = viewportElement.value;
  if (!viewport || !hasToasts.value) return;

  const handlePause = () => {
    if (!isClosePausedRef.value) {
      const pauseEvent = new CustomEvent(VIEWPORT_PAUSE);
      viewport.dispatchEvent(pauseEvent);
      isClosePausedRef.value = true;
    }
  };

  const handleResume = () => {
    if (isClosePausedRef.value) {
      const resumeEvent = new CustomEvent(VIEWPORT_RESUME);
      viewport.dispatchEvent(resumeEvent);
      isClosePausedRef.value = false;
    }
  };

  const handleFocusOutResume = (event: FocusEvent) => {
    const isFocusMovingOutside = !viewport.contains(event.relatedTarget as HTMLElement);
    if (isFocusMovingOutside) {
      handleResume();
    }
  };

  const handlePointerLeaveResume = () => {
    const isFocusInside = viewport.contains(getActiveElement());
    if (!isFocusInside) {
      handleResume();
    }
  };

  // We programmatically manage tabbing as we are unable to influence
  // the source order with portals, this allows us to reverse the
  // tab order so that it runs from most recent toast to least
  const handleKeyDown = (event: KeyboardEvent) => {
    const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
    const isTabKey = event.key === 'Tab' && !isMetaKey;

    if (isTabKey) {
      const focusedElement = getActiveElement();
      const isTabbingBackwards = event.shiftKey;
      const targetIsViewport = event.target === viewport;

      // If we're back tabbing after jumping to the viewport then we simply
      // proxy focus out to the preceding document
      if (targetIsViewport && isTabbingBackwards) {
        headFocusProxyElement.value?.focus();
        return;
      }

      const tabbingDirection = isTabbingBackwards ? 'backwards' : 'forwards';
      const sortedCandidates = getSortedTabbableCandidates(tabbingDirection);
      const index = sortedCandidates.findIndex(candidate => candidate === focusedElement);
      if (tryFocusFirst(sortedCandidates.slice(index + 1))) {
        event.preventDefault();
        return;
      }
      // If we can't focus that means we're at the edges so we
      // proxy to the corresponding exit point and let the browser handle
      // tab/shift+tab keypress and implicitly pass focus to the next valid element in the document
      if (isTabbingBackwards) {
        headFocusProxyElement.value?.focus();
      } else {
        tailFocusProxyElement.value?.focus();
      }
    }
  };

  viewport.addEventListener('focusin', handlePause);
  viewport.addEventListener('focusout', handleFocusOutResume);
  viewport.addEventListener('pointermove', handlePause);
  viewport.addEventListener('pointerleave', handlePointerLeaveResume);
  viewport.addEventListener('keydown', handleKeyDown);
  window.addEventListener('blur', handlePause);
  window.addEventListener('focus', handleResume);

  onWatcherCleanup(() => {
    viewport.removeEventListener('focusin', handlePause);
    viewport.removeEventListener('focusout', handleFocusOutResume);
    viewport.removeEventListener('pointermove', handlePause);
    viewport.removeEventListener('pointerleave', handlePointerLeaveResume);
    viewport.removeEventListener('keydown', handleKeyDown);
    window.removeEventListener('blur', handlePause);
    window.removeEventListener('focus', handleResume);
  });
});

function getSortedTabbableCandidates(tabbingDirection: TabbingDirection) {
  const toastItems = getOrderedElements();
  const tabbableCandidates = toastItems.map(toastNode => {
    const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)];
    return tabbingDirection === 'forwards' ? toastTabbableCandidates : toastTabbableCandidates.reverse();
  });
  return (tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates).flat();
}
</script>

<template>
  <div
    role="region"
    :aria-label="ariaLabel"
    tabindex="-1"
    :style="{
      pointerEvents: hasToasts ? undefined : 'none'
    }"
  >
    <ToastFocusProxy
      v-if="hasToasts"
      :ref="setHeadFocusProxyElement"
      @focus-from-outside-viewport="onFocusFromOutsideViewport('forwards')"
    />
    <Primitive :ref="setViewportElement" v-bind="attrs" :as="as" :as-child="asChild" :class="cls" tabindex="-1">
      <slot />
    </Primitive>
    <ToastFocusProxy
      v-if="hasToasts"
      :ref="setTailFocusProxyElement"
      @focus-from-outside-viewport="onFocusFromOutsideViewport('backwards')"
    />
  </div>
</template>
