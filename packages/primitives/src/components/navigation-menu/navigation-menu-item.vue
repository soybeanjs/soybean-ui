<script setup lang="ts">
import { ref } from 'vue';
import { useArrowNavigation, useCollection, useForwardExpose, useId } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import { injectNavigationMenuRootContext, provideNavigationMenuItemContext } from './context';
import { focusFirst, getTabbableCandidates, makeContentId, removeFromTabOrder } from './shared';
import type { NavigationMenuItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'NavigationMenuItem'
});

const props = withDefaults(defineProps<NavigationMenuItemPropsWithPrimitive>(), {
  as: 'li'
});

useForwardExpose();
const { getItems } = useCollection({ key: 'NavigationMenu' });

const context = injectNavigationMenuRootContext();

const value = useId(props.value);
const triggerRef = ref<HTMLElement>();
const focusProxyRef = ref<HTMLElement>();

const contentId = makeContentId(context.baseId, value);

let restoreContentTabOrderRef: () => void = () => ({});

const wasEscapeCloseRef = ref(false);
async function handleContentEntry(side = 'start') {
  const el = document.getElementById(contentId);
  if (el) {
    restoreContentTabOrderRef();
    const candidates = getTabbableCandidates(el);
    if (candidates.length) focusFirst(side === 'start' ? candidates : candidates.reverse());
  }
}

function handleContentExit() {
  const el = document.getElementById(contentId);
  if (el) {
    const candidates = getTabbableCandidates(el);
    if (candidates.length) restoreContentTabOrderRef = removeFromTabOrder(candidates);
  }
}

provideNavigationMenuItemContext({
  value,
  contentId,
  triggerRef,
  focusProxyRef,
  wasEscapeCloseRef,
  onEntryKeyDown: handleContentEntry,
  onFocusProxyEnter: handleContentEntry,
  onContentFocusOutside: handleContentExit,
  onRootContentClose: handleContentExit
});

function handleClose() {
  context.onItemDismiss();
  triggerRef.value?.focus();
}

function handleKeydown(ev: KeyboardEvent) {
  const currentFocus = getActiveElement() as HTMLElement;
  if (ev.keyCode === 32 || ev.key === 'Enter') {
    if (context.modelValue.value === value) {
      handleClose();
      ev.preventDefault();
      return;
    }

    (ev.target as HTMLElement).click();
    ev.preventDefault();
    return;
  }

  const itemsArray = getItems()
    .filter(i => i.ref.parentElement?.hasAttribute('data-menu-item'))
    .map(i => i.ref);

  // prevent triggering when the focus is on link
  if (!itemsArray.includes(currentFocus)) return;

  const newSelectedElement = useArrowNavigation(ev, currentFocus, undefined, {
    itemsArray,
    loop: false
  });

  if (newSelectedElement) newSelectedElement?.focus();

  ev.preventDefault();
  ev.stopPropagation();
}
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    data-menu-item
    @keydown.up.down.left.right.home.end.space="handleKeydown"
  >
    <slot />
  </Primitive>
</template>
