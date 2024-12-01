<script setup lang="ts">
import { ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits, useId } from '../../composables';
import { MenuContent } from '../menu';
import { injectDropdownMenuRootContext } from './context';
import type { DropdownMenuContentEmits, DropdownMenuContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuContent'
});

const props = defineProps<DropdownMenuContentPropsWithPrimitive>();
const emit = defineEmits<DropdownMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();

const rootContext = injectDropdownMenuRootContext();

const hasInteractedOutsideRef = ref(false);

function handleCloseAutoFocus(event: Event) {
  if (event.defaultPrevented) return;
  if (!hasInteractedOutsideRef.value) {
    setTimeout(() => {
      rootContext.triggerElement.value?.focus();
    }, 0);
  }
  hasInteractedOutsideRef.value = false;

  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault();
}

rootContext.contentId ||= useId(undefined, 'soybean-dropdown-menu-content');
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    :id="rootContext.contentId"
    :aria-labelledby="rootContext?.triggerId"
    :style="{
      '--soybean-dropdown-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-dropdown-menu-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-dropdown-menu-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-dropdown-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-dropdown-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
    @close-auto-focus="handleCloseAutoFocus"
    @interact-outside="
      event => {
        if (event.defaultPrevented) return;

        const originalEvent = event.detail.originalEvent as PointerEvent;
        const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
        const isRightClick = originalEvent.button === 2 || ctrlLeftClick;
        if (!rootContext.modal.value || isRightClick) hasInteractedOutsideRef = true;
        if (rootContext.triggerElement.value?.contains(event.target as HTMLElement)) event.preventDefault();
      }
    "
  >
    <slot />
  </MenuContent>
</template>
