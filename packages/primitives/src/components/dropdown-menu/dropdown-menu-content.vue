<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import MenuContent from '../menu/menu-content.vue';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { injectDropdownMenuRootContext } from './context';
import type { DropdownMenuContentEmits, DropdownMenuContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuContent'
});

const props = defineProps<DropdownMenuContentPropsWithPrimitive>();

const emit = defineEmits<DropdownMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { initContentId, triggerElement, triggerId, contentId, modal } = injectDropdownMenuRootContext();
initContentId();

const hasInteractedOutsideRef = ref(false);

const style = computed<Record<string, string>>(() => ({
  '--soybean-dropdown-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
  '--soybean-dropdown-menu-content-available-width': 'var(--soybean-popper-available-width)',
  '--soybean-dropdown-menu-content-available-height': 'var(--soybean-popper-available-height)',
  '--soybean-dropdown-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
  '--soybean-dropdown-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
}));

function onCloseAutoFocus(event: Event) {
  if (event.defaultPrevented) return;

  if (!hasInteractedOutsideRef.value) {
    setTimeout(() => {
      triggerElement.value?.focus();
    }, 0);
  }
  hasInteractedOutsideRef.value = false;

  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault();
}

function onInteractOutside(event: PointerDownOutsideEvent | FocusOutsideEvent) {
  if (event.defaultPrevented) return;

  const originalEvent = event.detail.originalEvent as PointerEvent;
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  if (!modal.value || isRightClick) {
    hasInteractedOutsideRef.value = true;
  }
  if (triggerElement.value?.contains(event.target as HTMLElement)) {
    event.preventDefault();
  }
}

useForwardExpose();
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    :id="contentId"
    :aria-labelledby="triggerId"
    :style="style"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
