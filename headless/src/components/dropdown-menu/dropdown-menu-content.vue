<script setup lang="ts">
import { computed, onWatcherCleanup, watchPostEffect } from 'vue';
import { useForwardListeners, useGraceArea } from '../../composables';
import { MenuContent } from '../menu';
import { useMenuContext } from '../menu/context';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { useDropdownMenuHoverContext, useDropdownMenuRootContext } from './context';
import { DROPDOWN_MENU_HOVER_OPEN } from './shared';
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from './types';

defineOptions({
  name: 'DropdownMenuContent'
});

const props = withDefaults(defineProps<DropdownMenuContentProps>(), {
  sideOffset: 8,
  sideFlip: true,
  alignFlip: true,
  avoidCollisions: true
});

const emit = defineEmits<DropdownMenuContentEmits>();

const listeners = useForwardListeners(emit);

const { popupElement, triggerElement } = useMenuContext('DropdownMenuContent');
const { modal } = useDropdownMenuRootContext('DropdownMenuContent');

const { isPointerInTransitRef, hoverable, onClose } = useDropdownMenuHoverContext('DropdownMenuContent');

useGraceArea({
  triggerElement,
  areaElement: popupElement,
  onPointerInTransitChange: v => {
    isPointerInTransitRef.value = v;
  },
  onPointerExit: () => {
    onClose();
  },
  subAreaAttribute: 'data-soybean-menu-sub-popup',
  disabled: computed(() => !hoverable.value)
});

let hasInteractedOutsideRef = false;

const onCloseAutoFocus = (event: Event) => {
  if (event.defaultPrevented || hoverable.value || hasInteractedOutsideRef) return;

  setTimeout(() => {
    triggerElement.value?.focus();
  }, 0);

  hasInteractedOutsideRef = false;

  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault();
};

const onInteractOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
  if (event.defaultPrevented) return;

  const originalEvent = event.detail.originalEvent as PointerEvent;
  const ctrlLeftClick = originalEvent.button === 0 && originalEvent.ctrlKey === true;
  const isRightClick = originalEvent.button === 2 || ctrlLeftClick;

  if (!modal.value || isRightClick) {
    hasInteractedOutsideRef = true;
  }
  if (triggerElement.value?.contains(event.target as HTMLElement)) {
    event.preventDefault();
  }
};

watchPostEffect(() => {
  if (!hoverable.value) return;

  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target?.contains(triggerElement.value!)) {
      onClose();
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener(DROPDOWN_MENU_HOVER_OPEN, onClose);
  onWatcherCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener(DROPDOWN_MENU_HOVER_OPEN, onClose);
  });
});
</script>

<template>
  <MenuContent
    v-bind="props"
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
