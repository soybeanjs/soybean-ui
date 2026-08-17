<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { wrapArray } from '../../shared';
import { useMenuContext } from '../menu/context';
import { useForwardListeners, useGraceArea } from '../../composables';
import type { FocusOutsideEvent } from '../../types';
import { MenuContent } from '../menu';
import { isTriggerLink } from './shared';
import { useMenubarCollectionContext, useMenubarMenuContext, useMenubarRootContext } from './context';
import type { MenubarContentProps, MenubarContentEmits } from './types';

defineOptions({
  name: 'MenubarContent'
});

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start',
  avoidCollisions: true,
  prioritizePosition: true
});

const emit = defineEmits<MenubarContentEmits>();

const listeners = useForwardListeners(emit);

const { popupElement } = useMenuContext('MenubarContent');
const { containerElement, getOrderedItems } = useMenubarCollectionContext('MenubarContent');

const { dir, isLinkTriggerHovered, loop, modelValue, onMenuOpen, onMenuClose, hoverable, setTriggerLink } =
  useMenubarRootContext('MenubarContent');
const { value, triggerId, contentId, triggerElement, wasKeyboardTriggerOpen, open } =
  useMenubarMenuContext('MenubarContent');

const hasInteractedOutside = shallowRef(false);

// In hover mode, keep the open menu alive while the pointer moves between the
// menubar and the content, and close it once the pointer leaves both.
// The grace area must be armed only while this menu is open: a closing content
// (kept mounted during its exit animation) must not close the menu that just
// replaced it.
// Submenu popups (teleported to body, e.g. inside the overflow "more" menu)
// count as valid hover targets so moving into one does not close the menu.
useGraceArea({
  triggerElement: containerElement,
  areaElement: popupElement,
  onPointerExit: () => {
    if (open.value) {
    onMenuClose();
    }
  },
  subAreaAttribute: 'data-soybean-menu-sub-popup',
  disabled: computed(() => !hoverable.value || !open.value)
});

const onCloseAutoFocus = (event: Event) => {
  if (!modelValue.value && !hasInteractedOutside.value && !isLinkTriggerHovered.value) {
    triggerElement.value?.focus();
  }

  hasInteractedOutside.value = false;
  event.preventDefault();
};

const onFocusOutside = (event: FocusOutsideEvent) => {
  const target = event.target as HTMLElement;
  const isMenubarTrigger = getOrderedItems().some(item => item.element.contains(target));

  if (isMenubarTrigger) {
    event.preventDefault();
  }
};

const onInteractOutside = () => {
  hasInteractedOutside.value = true;
};

const onEntryFocus = (event: Event) => {
  if (!wasKeyboardTriggerOpen.value) {
    event.preventDefault();
  }
};

const onArrowNavigation = (event: KeyboardEvent) => {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute('data-soybean-menubar-sub-trigger');

  const previousKey = dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const isPreviousKey = event.key === previousKey;

  if (!isPreviousKey && targetIsSubTrigger) return;

  const orderedItems = getOrderedItems();
  const candidateValues = orderedItems.map(item => item.data.value);

  if (isPreviousKey) {
    candidateValues.reverse();
  }

  const currentIndex = candidateValues.findIndex(v => v === value.value);
  const nextValues = loop.value
    ? wrapArray(candidateValues, currentIndex + 1)
    : candidateValues.slice(currentIndex + 1);
  const nextValue = nextValues[0];
  const nextItem = orderedItems.find(item => item.data.value === nextValue);

  if (!nextValue || !nextItem) return;

  if (!isTriggerLink(nextItem.element)) {
    onMenuOpen(nextValue);
  } else {
    setTriggerLink();
    nextItem.element.focus();
  }
};
</script>

<template>
  <MenuContent
    v-bind="props"
    :id="contentId"
    data-soybean-menubar-content
    :aria-labelledby="triggerId"
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @entry-focus="onEntryFocus"
    @keydown.arrow-right.arrow-left="onArrowNavigation"
  >
    <slot />
  </MenuContent>
</template>
