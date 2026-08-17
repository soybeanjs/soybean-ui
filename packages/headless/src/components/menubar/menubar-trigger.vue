<script setup lang="ts">
import { shallowRef } from 'vue';
import { useForwardElement } from '../../composables';
import Button from '../button/button.vue';
import { MenuAnchor } from '../menu';
import { RovingFocusItem } from '../roving-focus';
import { isTriggerLink } from './shared';
import { useMenubarCollectionItem, useMenubarMenuContext, useMenubarRootContext, useMenubarUi } from './context';
import type { MenubarTriggerProps } from './types';

defineOptions({
  name: 'MenubarTrigger'
});

const props = defineProps<MenubarTriggerProps>();

const {
  isLinkTriggerHovered,
  modelValue,
  onMenuOpen,
  onMenuToggle,
  setTriggerLink,
  hoverable,
  onHoverPointerEnter,
  onHoverPointerLeave
} = useMenubarRootContext('MenubarTrigger');
const {
  value,
  triggerId,
  contentId,
  triggerElement: menuTriggerElement,
  wasKeyboardTriggerOpen,
  open
} = useMenubarMenuContext('MenubarTrigger');

const cls = useMenubarUi('trigger');

const { onItemElementChange } = useMenubarCollectionItem(() => ({ value: value.value }));

const [triggerElement, setTriggerElement] = useForwardElement(element => {
  menuTriggerElement.value = element;
  onItemElementChange(element);
});

const isFocused = shallowRef(false);
const isCurrentTriggerLink = () => isTriggerLink(triggerElement.value);

const onPointerDown = (event: PointerEvent) => {
  if (props.disabled || event.button !== 0 || event.ctrlKey) {
    return;
  }

  if (isCurrentTriggerLink()) {
    setTriggerLink();
    return;
  }

  // In hover mode the menu is opened on hover, not on click.
  if (hoverable.value) return;

  const wasOpen = open.value;

  onMenuOpen(value.value);

  if (!wasOpen) {
    event.preventDefault();
  }
};

const onPointerEnter = () => {
  if (props.disabled) return;

  // Link triggers never open a menu; hovering them closes the open menu so the
  // link can be navigated.
  if (isCurrentTriggerLink()) {
    if (modelValue.value || isLinkTriggerHovered.value) {
      setTriggerLink();
      triggerElement.value?.focus();
    }
    return;
  }

  if (open.value) return;

  if (hoverable.value) {
    onHoverPointerEnter(value.value);
  } else if (modelValue.value || isLinkTriggerHovered.value) {
    // Click mode: switching between triggers only happens once a menu is open.
    onMenuOpen(value.value);
  } else {
    return;
  }

  triggerElement.value?.focus();
};

const onPointerLeave = () => {
  if (props.disabled) return;

  if (hoverable.value) {
    onHoverPointerLeave();
  }
};

const onFocus = () => {
  isFocused.value = true;
};

const onBlur = () => {
  isFocused.value = false;
};

const onKeyDown = (event: KeyboardEvent) => {
  if (props.disabled || isCurrentTriggerLink()) return;

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
      <Button
        v-bind="props"
        :id="triggerId"
        :ref="setTriggerElement"
        data-soybean-menubar-trigger
        :class="cls"
        :aria-controls="open ? contentId : undefined"
        :aria-expanded="open"
        aria-haspopup="menu"
        :data-highlighted="isFocused ? '' : undefined"
        data-soybean-collection-item
        :data-state="open ? 'open' : 'closed'"
        :data-value="value"
        :disabled="disabled"
        role="menuitem"
        @pointerdown="onPointerDown"
        @pointerenter="onPointerEnter"
        @pointerleave="onPointerLeave"
        @keydown.enter.space.arrow-down="onKeyDown"
        @focus="onFocus"
        @blur="onBlur"
      >
        <slot />
      </Button>
    </MenuAnchor>
  </RovingFocusItem>
</template>
