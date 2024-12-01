<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useForwardExpose } from '../../composables';
import { injectMenuContentContext, injectMenuRootContext } from './context';
import { ITEM_SELECT, SELECTION_KEYS } from './shared';
import MenuItemImpl from './menu-item-impl.vue';
import type { MenuItemEmits, MenuItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuItem'
});

const props = defineProps<MenuItemPropsWithPrimitive>();

const emit = defineEmits<MenuItemEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectMenuRootContext();
const contentContext = injectMenuContentContext();

const isPointerDownRef = ref(false);

async function handleSelect() {
  const menuItem = currentElement.value;
  if (!props.disabled && menuItem) {
    const itemSelectEvent = new CustomEvent(ITEM_SELECT, {
      bubbles: true,
      cancelable: true
    });
    emit('select', itemSelectEvent);
    // let select event finish
    await nextTick();
    if (itemSelectEvent.defaultPrevented) isPointerDownRef.value = false;
    else rootContext.onClose();
  }
}

function handlePointerDown() {
  isPointerDownRef.value = true;
}

async function handlePointerUp(event: PointerEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  // Pointer down can move to a different menu item which should activate it on pointer up.
  // We dispatch a click for selection to allow composition with click based triggers and to
  // prevent Firefox from getting stuck in text selection mode when the menu closes.
  if (!isPointerDownRef.value) (event.currentTarget as HTMLElement)?.click();
}

async function handleKeyDown(event: KeyboardEvent) {
  const isTypingAhead = contentContext.searchRef.value !== '';
  if (props.disabled || (isTypingAhead && event.key === ' ')) return;
  if (SELECTION_KEYS.includes(event.key)) {
    (event.currentTarget as HTMLElement)?.click();
    /**
     * We prevent default browser behaviour for selection keys as they should trigger a selection only:
     *
     * - prevents space from scrolling the page.
     * - if keydown causes focus to move, prevents keydown from firing on the new target.
     */
    event.preventDefault();
  }
}
</script>

<template>
  <MenuItemImpl
    v-bind="props"
    :ref="forwardRef"
    @click="handleSelect"
    @pointerdown="handlePointerDown"
    @pointerup="handlePointerUp"
    @keydown="handleKeyDown"
  >
    <slot />
  </MenuItemImpl>
</template>
