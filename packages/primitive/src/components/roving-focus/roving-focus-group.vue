<script setup lang="ts">
import { ref, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useCollection, useDirection } from '../../composables';
import { ENTRY_FOCUS, EVENT_OPTIONS, focusFirst } from './shared';
import { provideRovingFocusGroupContext } from './context';
import type { RovingFocusGroupEmits, RovingFocusGroupPropsWithPrimitive } from './types';

defineOptions({
  name: 'RovingFocusGroup'
});

const props = defineProps<RovingFocusGroupPropsWithPrimitive>();

const emit = defineEmits<RovingFocusGroupEmits>();

const currentTabStopId = useVModel(props, 'currentTabStopId', emit, {
  defaultValue: props.defaultCurrentTabStopId,
  passive: (props.currentTabStopId === undefined) as false
});

const { getItems, CollectionSlot } = useCollection({ isProvider: true });

const { loop, orientation, dir: propDir } = toRefs(props);
const dir = useDirection(propDir);

const isTabbingBackOut = ref(false);
const isClickFocus = ref(false);
const focusableItemsCount = ref(0);

function handleFocus(event: FocusEvent) {
  // We normally wouldn't need this check, because we already check
  // that the focus is on the current target and not bubbling to it.
  // We do this because Safari doesn't focus buttons when clicked, and
  // instead, the wrapper will get focused and not through a bubbling event.
  const isKeyboardFocus = !isClickFocus.value;

  if (!event.currentTarget || event.target !== event.currentTarget || !isKeyboardFocus || isTabbingBackOut.value) {
    isClickFocus.value = false;
    return;
  }

  const entryFocusEvent = new CustomEvent(ENTRY_FOCUS, EVENT_OPTIONS);
  event.currentTarget.dispatchEvent(entryFocusEvent);
  emit('entryFocus', entryFocusEvent);

  if (entryFocusEvent.defaultPrevented) {
    isClickFocus.value = false;
    return;
  }

  const items = getItems()
    .map(i => i.ref)
    .filter(i => i.dataset.disabled !== '');

  const activeItem = items.find(item => item.getAttribute('data-active') === 'true');
  const currentItem = items.find(item => item.id === currentTabStopId.value);
  const candidateItems = [activeItem, currentItem, ...items].filter(Boolean) as typeof items;

  focusFirst(candidateItems, props.preventScrollOnEntryFocus);
}

function handleMouseUp() {
  // reset `isClickFocus` after 1 tick because handleFocus might not triggered due to focused element
  setTimeout(() => {
    isClickFocus.value = false;
  }, 1);
}

function handleMouseDown() {
  isClickFocus.value = true;
}

function handleBlur() {
  isTabbingBackOut.value = false;
}

provideRovingFocusGroupContext({
  loop,
  dir,
  orientation,
  currentTabStopId,
  focusableItemsCount,
  isTabbingBackOut
});

defineExpose({
  getItems
});
</script>

<template>
  <CollectionSlot>
    <Primitive
      :class="props.class"
      :as
      :as-child
      :tabindex="isTabbingBackOut || focusableItemsCount === 0 ? -1 : 0"
      :data-orientation="orientation"
      :dir
      style="outline: none"
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot />
    </Primitive>
  </CollectionSlot>
</template>
