<script setup lang="ts">
import { computed, onWatcherCleanup, shallowRef, watchPostEffect } from 'vue';
import { useForwardListeners, useGraceArea } from '../../composables';
import { MenuContent } from '../menu';
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

const contentElement = shallowRef<HTMLElement>();

const setContentElement = (el: HTMLElement) => {
  contentElement.value = el;
};

const { modal, initContentId, triggerElement, triggerId, contentId } =
  useDropdownMenuRootContext('DropdownMenuContent');

const { isPointerInTransitRef, hoverable, onClose } = useDropdownMenuHoverContext('DropdownMenuContent');

useGraceArea({
  triggerElement,
  contentElement,
  onPointerInTransitChange: v => {
    isPointerInTransitRef.value = v;
  },
  onPointerExit: () => {
    onClose();
  },
  subAreaAttribute: 'data-soybean-menu-sub-content',
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

initContentId();

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
    :id="contentId"
    :el-ref="setContentElement"
    :aria-labelledby="triggerId"
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
