<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue';
import { computed, onMounted, ref, toRefs, watchEffect } from 'vue';
import { onKeyStroke, unrefElement } from '@vueuse/core';
import { useCollection, useForwardExpose } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { DismissableLayerBranch } from '../dismissable-layer';
import { focusFirst, getTabbableCandidates } from '../focus-scope/shared';
import { injectToastProviderContext } from './context';
import { VIEWPORT_PAUSE, VIEWPORT_RESUME } from './shared';
import FocusProxy from './focus-proxy.vue';
import type { ToastViewportPropsWithPrimitive } from './types';

defineOptions({
  name: 'ToastViewport',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ToastViewportPropsWithPrimitive>(), {
  hotkey: () => ['F8'], // from VIEWPORT_DEFAULT_HOTKEY
  label: 'Notifications ({hotkey})',
  as: 'ol'
});

const { forwardRef, currentElement } = useForwardExpose();
const providerContext = injectToastProviderContext();
const { CollectionSlot, getItems } = useCollection();
const hasToasts = computed(() => providerContext.toastCount.value > 0);
const headFocusProxyRef = ref<HTMLElement>();
const tailFocusProxyRef = ref<HTMLElement>();
const { hotkey, label } = toRefs(props);
const hotkeyMessage = computed(() => hotkey.value.join('+').replace(/Key/g, '').replace(/Digit/g, ''));

onKeyStroke(hotkey.value, () => {
  currentElement.value.focus();
});

onMounted(() => {
  providerContext.onViewportChange(currentElement.value);
});

watchEffect(cleanupFn => {
  const viewport = currentElement.value;
  if (hasToasts.value && viewport) {
    const handlePause = () => {
      if (!providerContext.isClosePausedRef.value) {
        const pauseEvent = new CustomEvent(VIEWPORT_PAUSE);
        viewport.dispatchEvent(pauseEvent);
        providerContext.isClosePausedRef.value = true;
      }
    };

    const handleResume = () => {
      if (providerContext.isClosePausedRef.value) {
        const resumeEvent = new CustomEvent(VIEWPORT_RESUME);
        viewport.dispatchEvent(resumeEvent);
        providerContext.isClosePausedRef.value = false;
      }
    };

    const handleFocusOutResume = (event: FocusEvent) => {
      const isFocusMovingOutside = !viewport.contains(event.relatedTarget as HTMLElement);
      if (isFocusMovingOutside) handleResume();
    };

    const handlePointerLeaveResume = () => {
      const isFocusInside = viewport.contains(getActiveElement());
      if (!isFocusInside) handleResume();
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
          headFocusProxyRef.value?.focus();
          return;
        }

        const tabbingDirection = isTabbingBackwards ? 'backwards' : 'forwards';
        const sortedCandidates = getSortedTabbableCandidates({ tabbingDirection });
        const index = sortedCandidates.findIndex(candidate => candidate === focusedElement);
        if (focusFirst(sortedCandidates.slice(index + 1))) {
          event.preventDefault();
          return;
        }
        // If we can't focus that means we're at the edges so we
        // proxy to the corresponding exit point and let the browser handle
        // tab/shift+tab keypress and implicitly pass focus to the next valid element in the document
        if (isTabbingBackwards) {
          headFocusProxyRef.value?.focus();
        } else {
          tailFocusProxyRef.value?.focus();
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

    cleanupFn(() => {
      viewport.removeEventListener('focusin', handlePause);
      viewport.removeEventListener('focusout', handleFocusOutResume);
      viewport.removeEventListener('pointermove', handlePause);
      viewport.removeEventListener('pointerleave', handlePointerLeaveResume);
      viewport.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('blur', handlePause);
      window.removeEventListener('focus', handleResume);
    });
  }
});

function getSortedTabbableCandidates({ tabbingDirection }: { tabbingDirection: 'forwards' | 'backwards' }) {
  const toastItems = getItems().map(i => i.ref);
  const tabbableCandidates = toastItems.map(toastNode => {
    const toastTabbableCandidates = [toastNode, ...getTabbableCandidates(toastNode)];
    return tabbingDirection === 'forwards' ? toastTabbableCandidates : toastTabbableCandidates.reverse();
  });
  return (tabbingDirection === 'forwards' ? tabbableCandidates.reverse() : tabbableCandidates).flat();
}
</script>

<template>
  <DismissableLayerBranch
    role="region"
    :aria-label="typeof label === 'string' ? label.replace('{hotkey}', hotkeyMessage) : label(hotkeyMessage)"
    tabindex="-1"
    :style="{
      // incase list has size when empty (e.g. padding), we remove pointer events so
      // it doesn't prevent interactions with page elements that it overlays
      pointerEvents: hasToasts ? undefined : 'none'
    }"
  >
    <FocusProxy
      v-if="hasToasts"
      :ref="
        (node: ComponentPublicInstance | Element | null) => {
          headFocusProxyRef = unrefElement(node as any) as HTMLElement;
          return undefined;
        }
      "
      @focus-from-outside-viewport="
        () => {
          const tabbableCandidates = getSortedTabbableCandidates({
            tabbingDirection: 'forwards'
          });
          focusFirst(tabbableCandidates);
        }
      "
    />
    <CollectionSlot>
      <Primitive :ref="forwardRef" v-bind="$attrs" :class="props.class" :as="as" :as-child="asChild" tabindex="-1">
        <slot />
      </Primitive>
    </CollectionSlot>
    <FocusProxy
      v-if="hasToasts"
      :ref="
        (node: ComponentPublicInstance | Element | null) => {
          tailFocusProxyRef = unrefElement(node as any) as HTMLElement;
          return undefined;
        }
      "
      @focus-from-outside-viewport="
        () => {
          const tabbableCandidates = getSortedTabbableCandidates({
            tabbingDirection: 'backwards'
          });
          focusFirst(tabbableCandidates);
        }
      "
    />
  </DismissableLayerBranch>
</template>
