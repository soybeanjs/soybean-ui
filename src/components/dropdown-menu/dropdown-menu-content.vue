<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners } from '../../composables';
import { MenuContent } from '../menu';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { popperCssVars } from '../popper/shared';
import { useDropdownMenuRootContext } from './context';
import { dropdownMenuCssVars } from './shared';
import type { DropdownMenuContentEmits, DropdownMenuContentProps } from './types';

defineOptions({
  name: 'DropdownMenuContent'
});

const props = defineProps<DropdownMenuContentProps>();

const emit = defineEmits<DropdownMenuContentEmits>();

const listeners = useForwardListeners(emit);

const contentElement = shallowRef<HTMLElement>();

const setContentElement = (el: HTMLElement) => {
  contentElement.value = el;
};

const { modal, initContentId, triggerElement, triggerId, contentId } =
  useDropdownMenuRootContext('DropdownMenuContent');

const style = computed(() => ({
  [dropdownMenuCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [dropdownMenuCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [dropdownMenuCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [dropdownMenuCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [dropdownMenuCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
}));

let hasInteractedOutsideRef = false;

const onCloseAutoFocus = (event: Event) => {
  if (event.defaultPrevented) return;

  if (!hasInteractedOutsideRef) {
    setTimeout(() => {
      triggerElement.value?.focus();
    }, 0);
  }
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
</script>

<template>
  <MenuContent
    v-bind="props"
    :id="contentId"
    :el-ref="setContentElement"
    :aria-labelledby="triggerId"
    :style="style"
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
