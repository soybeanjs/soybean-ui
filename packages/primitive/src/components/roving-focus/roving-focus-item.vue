<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted } from 'vue';
import Primitive from '../primitive/primitive';
import { useCollection, useId, usePrimitiveElement } from '../../composables';
import { wrapArray } from '../../shared';
import { focusFirst, getFocusIntent } from './shared';
import { injectRovingFocusGroupContext } from './context';
import type { RovingFocusItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'RovingFocusItem'
});

const {
  class: className,
  as = 'span',
  focusable = true,
  active = true,
  tabStopId,
  allowShiftKey
} = defineProps<RovingFocusItemPropsWithPrimitive>();

const { primitiveElement, currentElement } = usePrimitiveElement();
const { getItems, CollectionItem } = useCollection();

const {
  currentTabStopId,
  orientation,
  dir,
  loop,
  onFocusableItemAdd,
  onFocusableItemRemove,
  onItemFocus,
  onItemShiftTab
} = injectRovingFocusGroupContext();

const rootNode = computed(() => currentElement.value?.getRootNode() as Document | ShadowRoot);
const id = computed(() => tabStopId || useId());
const isCurrentTabStop = computed(() => currentTabStopId.value === id.value);

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Tab' && event.shiftKey) {
    onItemShiftTab();
    return;
  }

  if (event.target !== event.currentTarget) return;

  const focusIntent = getFocusIntent(event, orientation.value, dir.value);

  if (focusIntent !== undefined) {
    if (event.metaKey || event.ctrlKey || event.altKey || (allowShiftKey ? false : event.shiftKey)) return;
    event.preventDefault();
    let candidateNodes = [
      ...getItems()
        .map(i => i.ref)
        .filter(i => i.dataset.disabled !== '')
    ];

    if (focusIntent === 'last') {
      candidateNodes.reverse();
    } else if (focusIntent === 'prev' || focusIntent === 'next') {
      if (focusIntent === 'prev') candidateNodes.reverse();
      const currentIndex = candidateNodes.indexOf(event.currentTarget as HTMLElement);

      candidateNodes = loop.value
        ? wrapArray(candidateNodes, currentIndex + 1)
        : candidateNodes.slice(currentIndex + 1);
    }

    nextTick(() => focusFirst(candidateNodes, false, rootNode.value));
  }
}

function handleMousedown(event: MouseEvent) {
  // We prevent focusing non-focusable items on `mousedown`.
  // Even though the item has tabIndex={-1}, that only means take it out of the tab order.
  if (!focusable) {
    event.preventDefault();
    return;
  }

  // Safari doesn't focus a button when clicked so we run our logic on mousedown also
  onItemFocus(id.value);
}

function handleFocus() {
  onItemFocus(id.value);
}

onMounted(() => {
  if (focusable) {
    onFocusableItemAdd();
  }
});

onUnmounted(() => {
  if (focusable) {
    onFocusableItemRemove();
  }
});
</script>

<template>
  <CollectionItem>
    <Primitive
      ref="primitiveElement"
      :class="className"
      :as
      :as-child
      :tabindex="isCurrentTabStop ? 0 : -1"
      :data-orientation="orientation"
      :data-active="active"
      :data-disabled="!focusable ? '' : undefined"
      @mousedown="handleMousedown"
      @focus="handleFocus"
      @keydown="handleKeydown"
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
