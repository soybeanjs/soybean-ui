<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement } from '../../composables';
import { isMouseEvent } from '../../shared';
import { RovingFocusItem } from '../roving-focus';
import { MenuAnchor } from '../menu';
import { Primitive } from '../primitive';
import { useCollectionItem, useMenubarMenuContext, useMenubarRootContext } from './context';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'MenubarTrigger'
});

const props = withDefaults(defineProps<MenubarTriggerProps>(), {
  as: 'button'
});

const { onMenuOpen, onMenuToggle, modelValue } = useMenubarRootContext('MenubarTrigger');
const {
  contentId,
  initTriggerId,
  onTriggerElementChange,
  triggerId,
  triggerElement,
  value,
  wasKeyboardTriggerOpenRef
} = useMenubarMenuContext('MenubarTrigger');
const { onItemElementChange, itemProps } = useCollectionItem(() => ({ value: value.value }));
const [_, setTriggerElement] = useForwardElement(element => {
  onItemElementChange(element);
  onTriggerElementChange(element);
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));
const open = computed(() => modelValue.value === value.value);
const ariaControls = computed(() => (open.value ? contentId.value : undefined));
const dataDisabled = computed(() => (props.disabled ? '' : undefined));

const isFocused = shallowRef(false);

const onPointerDown = (event: PointerEvent) => {
  if (props.disabled) return;

  if (event.button === 0 && event.ctrlKey === false) {
    onMenuOpen(value.value);

    if (!open.value) {
      event.preventDefault();
    }
  }
};

const onPointerMove = (event: PointerEvent) => {
  if (!isMouseEvent(event)) return;

  const menubarOpen = Boolean(modelValue.value);

  if (props.disabled || !menubarOpen || open.value) return;

  onMenuOpen(value.value);
  triggerElement.value?.focus();
};

const onKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  if (['Enter', ' '].includes(event.key)) {
    onMenuToggle(value.value);
  }

  if (event.key === 'ArrowDown') {
    onMenuOpen(value.value);
  }

  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
    wasKeyboardTriggerOpenRef.value = true;
    event.preventDefault();
  }
};

initTriggerId();
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled" :tab-stop-id="value">
    <MenuAnchor as-child>
      <Primitive
        v-bind="itemProps"
        :id="triggerId"
        :ref="setTriggerElement"
        :as="as"
        :as-child="asChild"
        :type="tag"
        role="menuitem"
        aria-haspopup="menu"
        :aria-controls="ariaControls"
        :aria-expanded="open"
        :data-disabled="dataDisabled"
        :data-highlighted="isFocused ? '' : undefined"
        :data-state="open ? 'open' : 'closed'"
        :data-value="value"
        :disabled="disabled"
        @blur="isFocused = false"
        @focus="isFocused = true"
        @keydown.enter.space.arrow-down="onKeyDown"
        @pointerdown="onPointerDown"
        @pointermove="onPointerMove"
      >
        <slot />
      </Primitive>
    </MenuAnchor>
  </RovingFocusItem>
</template>
