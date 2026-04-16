<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardElement } from '../../composables';
import { MenuAnchor } from '../menu';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { useMenubarCollectionItem, useMenubarMenuContext, useMenubarRootContext, useMenubarUi } from './context';
import { isTriggerLink } from './shared';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'MenubarTrigger'
});

const props = withDefaults(defineProps<MenubarTriggerProps>(), {
  as: 'button'
});

const { modelValue, onMenuOpen, onMenuToggle, setTriggerLink } = useMenubarRootContext('MenubarTrigger');
const {
  value,
  triggerId,
  contentId,
  triggerElement: menuTriggerElement,
  wasKeyboardTriggerOpen,
  open
} = useMenubarMenuContext('MenubarTrigger');

const cls = useMenubarUi('trigger');

const { itemProps, onItemElementChange } = useMenubarCollectionItem(() => ({ value: value.value }));

const [triggerElement, setTriggerElement] = useForwardElement(element => {
  menuTriggerElement.value = element;
  onItemElementChange(element);
});

const isFocused = shallowRef(false);

const onPointerDown = (event: PointerEvent) => {
  if (props.disabled || event.button !== 0 || event.ctrlKey) {
    return;
  }

  const wasOpen = open.value;

  onMenuOpen(value.value);

  if (!wasOpen) {
    event.preventDefault();
  }
};

const onPointerEnter = () => {
  if (!modelValue.value || open.value) return;

  if (isTriggerLink(String(value.value))) {
    setTriggerLink();
  } else {
    onMenuOpen(value.value);
  }

  triggerElement.value?.focus();
};

const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  isFocused.value = false;
};

const onKeyDown = (event: KeyboardEvent) => {
  if (props.disabled || isTriggerLink(String(value.value))) return;

  if (['Enter', ' '].includes(event.key)) {
    onMenuToggle(value.value);
  }

  if (event.key === 'ArrowDown') {
    onMenuOpen(value.value);
  }

  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
    wasKeyboardTriggerOpen.value = true;
    event.preventDefault();
  }
};
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled" :tab-stop-id="String(value)">
    <MenuAnchor as-child>
      <Primitive
        v-bind="itemProps"
        :id="triggerId"
        :ref="setTriggerElement"
        :as="as"
        :as-child="asChild"
        :class="cls"
        :type="as === 'button' ? 'button' : undefined"
        role="menuitem"
        aria-haspopup="menu"
        :aria-expanded="open"
        :aria-controls="open ? contentId : undefined"
        :data-highlighted="isFocused ? '' : undefined"
        :data-state="open ? 'open' : 'closed'"
        :data-disabled="disabled ? '' : undefined"
        :disabled="disabled"
        :data-value="value"
        data-slot="trigger"
        @pointerdown="onPointerDown"
        @pointerenter="onPointerEnter"
        @keydown.enter.space.arrow-down="onKeyDown"
        @focus="onFocus"
        @blur="onBlur"
      >
        <slot />
      </Primitive>
    </MenuAnchor>
  </RovingFocusItem>
</template>
