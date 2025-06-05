<script setup lang="ts">
import { nextTick, shallowRef } from 'vue';
import { isMouseEvent } from '../../shared';
import { Primitive } from '../primitive';
import { useCollectionItem } from '../roving-focus/context';
import { useMenuContentContext } from './context';
import type { MenuItemImplProps } from './types';

defineOptions({
  name: 'MenuItemImpl'
});

const props = defineProps<MenuItemImplProps>();

const { onItemEnter, onItemLeave } = useMenuContentContext('MenuItemImpl');

const { itemProps } = useCollectionItem(() => ({ textValue: props.textValue }));

const isFocused = shallowRef(false);

const onPointerMove = (event: PointerEvent) => {
  if (event.defaultPrevented || !isMouseEvent(event)) return;

  if (props.disabled) {
    onItemLeave(event);
    return;
  }

  const defaultPrevented = onItemEnter(event);
  if (defaultPrevented) return;

  const target = event.currentTarget as HTMLElement;
  target?.focus({ preventScroll: true });
};

const onPointerLeave = async (event: PointerEvent) => {
  await nextTick();

  if (event.defaultPrevented || !isMouseEvent(event)) return;

  onItemLeave(event);
};

const onFocus = async (event: FocusEvent) => {
  await nextTick();

  if (event.defaultPrevented || props.disabled) return;

  isFocused.value = true;
};

const onBlur = async (event: FocusEvent) => {
  await nextTick();

  if (event.defaultPrevented) return;

  isFocused.value = false;
};
</script>

<template>
  <Primitive
    v-bind="{ ...props, ...itemProps }"
    role="menuitem"
    tabindex="-1"
    :aria-disabled="disabled || undefined"
    :data-disabled="disabled ? '' : undefined"
    :data-highlighted="isFocused ? '' : undefined"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
    @focus="onFocus"
    @blur="onBlur"
  >
    <slot />
  </Primitive>
</template>
