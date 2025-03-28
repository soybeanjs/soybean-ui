<script setup lang="ts">
import { nextTick, ref } from 'vue';
import { useCollection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectMenuContentContext } from './context';
import { isMouseEvent } from './shared';
import type { MenuItemImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuItemImpl',
  inheritAttrs: false
});

const props = defineProps<MenuItemImplPropsWithPrimitive>();

const contentContext = injectMenuContentContext();
const { forwardRef } = useForwardExpose();
const { CollectionItem } = useCollection();

const isFocused = ref(false);

async function handlePointerMove(event: PointerEvent) {
  if (event.defaultPrevented) return;
  if (!isMouseEvent(event)) return;

  if (props.disabled) {
    contentContext.onItemLeave(event);
  } else {
    const defaultPrevented = contentContext.onItemEnter(event);
    if (!defaultPrevented) {
      const item = event.currentTarget;
      (item as HTMLElement)?.focus({ preventScroll: true });
    }
  }
}

async function handlePointerLeave(event: PointerEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  if (!isMouseEvent(event)) return;

  contentContext.onItemLeave(event);
}

async function handleFocus(event: FocusEvent) {
  await nextTick();
  if (event.defaultPrevented || props.disabled) return;
  isFocused.value = true;
}

async function handleBlur(event: FocusEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  isFocused.value = false;
}
</script>

<template>
  <CollectionItem :value="{ textValue }">
    <Primitive
      v-bind="$attrs"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      role="menuitem"
      tabindex="-1"
      :aria-disabled="disabled || undefined"
      :data-disabled="disabled ? '' : undefined"
      :data-highlighted="isFocused ? '' : undefined"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @focus="handleFocus"
      @blur="handleBlur"
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
