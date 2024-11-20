<script setup lang="ts">
import { syncRef } from '@vueuse/shared';
import { nextTick, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { PopperContent } from '../popper';
import { DismissableLayer } from '../dismissable-layer';
import { useForwardExpose, useForwardProps, useGraceArea } from '../../composables';
import type { HoverCardContentImplEmits, HoverCardContentImplProps } from './types';
import { injectHoverCardRootContext } from './context';
import { getTabbableNodes } from './shared';

defineOptions({
  name: 'HoverCardContentImpl',
  inheritAttrs: false
});

const props = defineProps<HoverCardContentImplProps>();
const emit = defineEmits<HoverCardContentImplEmits>();
const forwarded = useForwardProps(props);

const { forwardRef, currentElement: contentElement } = useForwardExpose();
const rootContext = injectHoverCardRootContext();
const { isPointerInTransit, onPointerExit } = useGraceArea(rootContext.triggerElement, contentElement);

syncRef(rootContext.isPointerInTransitRef, isPointerInTransit, { direction: 'rtl' });

onPointerExit(() => {
  rootContext.onClose();
});

const containSelection = ref(false);

let originalBodyUserSelect: string;
watchEffect(cleanupFn => {
  if (containSelection.value) {
    const body = document.body;

    // Safari requires prefix
    originalBodyUserSelect = body.style.userSelect || body.style.webkitUserSelect;

    body.style.userSelect = 'none';
    body.style.webkitUserSelect = 'none';

    cleanupFn(() => {
      body.style.userSelect = originalBodyUserSelect;
      body.style.webkitUserSelect = originalBodyUserSelect;
    });
  }
});

function handlePointerUp() {
  containSelection.value = false;
  rootContext.isPointerDownOnContentRef.value = false;

  // Delay a frame to ensure we always access the latest selection
  nextTick(() => {
    const hasSelection = document.getSelection()?.toString() !== '';
    if (hasSelection) rootContext.hasSelectionRef.value = true;
  });
}
onMounted(() => {
  if (contentElement.value) {
    document.addEventListener('pointerup', handlePointerUp);

    const tabbables = getTabbableNodes(contentElement.value);
    tabbables.forEach(tabbable => tabbable.setAttribute('tabindex', '-1'));
  }
});

onUnmounted(() => {
  document.removeEventListener('pointerup', handlePointerUp);
  rootContext.hasSelectionRef.value = false;
  rootContext.isPointerDownOnContentRef.value = false;
});
</script>

<template>
  <DismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emit('escapeKeyDown', $event)"
    @pointer-down-outside="emit('pointerDownOutside', $event)"
    @focus-outside.prevent="emit('focusOutside', $event)"
    @dismiss="rootContext.onDismiss"
  >
    <PopperContent
      v-bind="{ ...forwarded, ...$attrs }"
      :ref="forwardRef"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :style="{
        userSelect: containSelection ? 'text' : undefined,
        // Safari requires prefix
        WebkitUserSelect: containSelection ? 'text' : undefined,
        // re-namespace exposed content custom properties
        '--soybean-hover-card-content-transform-origin': 'var(--soybean-popper-transform-origin)',
        '--soybean-hover-card-content-available-width': 'var(--soybean-popper-available-width)',
        '--soybean-hover-card-content-available-height': 'var(--soybean-popper-available-height)',
        '--soybean-hover-card-trigger-width': 'var(--soybean-popper-anchor-width)',
        '--soybean-hover-card-trigger-height': 'var(--soybean-popper-anchor-height)'
      }"
      @pointerdown="
        (event: PointerEvent) => {
          // Contain selection to current layer
          if ((event.currentTarget as HTMLElement).contains(event.target as HTMLElement)) {
            containSelection = true;
          }
          rootContext.hasSelectionRef.value = false;
          rootContext.isPointerDownOnContentRef.value = true;
        }
      "
    >
      <slot />
    </PopperContent>
  </DismissableLayer>
</template>
