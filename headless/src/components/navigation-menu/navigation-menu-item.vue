<script setup lang="ts">
import { computed, onBeforeUnmount, useId } from 'vue';
import { getActiveElement, getTabbableCandidates, removeFromTabOrder, tryFocusFirst } from '../../shared';
import { useArrowNavigation } from '../../composables';
import type { Align } from '../../types';
import {
  provideNavigationMenuItemContext,
  useCollectionContext,
  useNavigationMenuRootContext,
  useNavigationMenuThemeContext
} from './context';
import { createContentId, createTriggerId } from './shared';
import type { NavigationMenuItemProps } from './types';

defineOptions({
  name: 'NavigationMenuItem'
});

const props = defineProps<NavigationMenuItemProps>();

const { isRoot, baseId, modelValue, onItemDismiss, addValue, removeValue } =
  useNavigationMenuRootContext('NavigationMenuItem');
const { getOrderedElements } = useCollectionContext('NavigationMenuItem');

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => (isRoot ? themeContext?.ui?.value?.item : themeContext?.ui?.value?.subItem));

const value = props.value ?? useId();

const contentId = createContentId(baseId, value);
const triggerId = createTriggerId(baseId, value);

let restoreContentTabOrder: () => void = () => ({});

const onContentEntry = async (side: Exclude<Align, 'center'> = 'start') => {
  const el = document.getElementById(contentId);
  if (!el) return;

  restoreContentTabOrder();
  const candidates = getTabbableCandidates(el);
  if (candidates.length) {
    tryFocusFirst(side === 'start' ? candidates : candidates.reverse());
  }
};

const onContentExit = () => {
  const el = document.getElementById(contentId);
  if (!el) return;

  const candidates = getTabbableCandidates(el);
  if (candidates.length) {
    restoreContentTabOrder = removeFromTabOrder(candidates);
  }
};

const { triggerElement } = provideNavigationMenuItemContext({
  value,
  modelValue,
  contentId,
  triggerId,
  onEntryKeyDown: onContentEntry,
  onFocusProxyEnter: onContentEntry,
  onContentFocusOutside: onContentExit,
  onRootContentClose: onContentExit
});

const onClose = () => {
  onItemDismiss();
  triggerElement.value?.focus();
};

const onKeydown = (event: KeyboardEvent) => {
  const currentFocus = getActiveElement();
  if (!currentFocus) return;

  if (event.key === 'Enter' || event.key === ' ') {
    if (modelValue.value === value) {
      onClose();
      event.preventDefault();
      return;
    }

    (event.target as HTMLElement).click();
    event.preventDefault();
    return;
  }

  const items = getOrderedElements().filter(el => el.parentElement?.hasAttribute('data-menu-item'));

  // prevent triggering when the focus is on link
  if (!items.includes(currentFocus)) return;

  const newSelectedElement = useArrowNavigation(event, currentFocus, undefined, {
    itemsArray: items,
    loop: false
  });

  newSelectedElement?.focus?.();

  event.preventDefault();
  event.stopPropagation();
};

addValue(value);

onBeforeUnmount(() => {
  removeValue(value);
});
</script>

<template>
  <li :class="cls" data-menu-item @keydown.up.down.left.right.home.end.space="onKeydown">
    <slot />
  </li>
</template>
