<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useCollection, useForwardExpose } from '../../composables';
import { MenuAnchor } from '../menu';
import { Primitive } from '../primitive';
import { RovingFocusItem } from '../roving-focus';
import { injectMenubarMenuContext, injectMenubarRootContext } from './context';
import type { MenubarTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarTrigger'
});

const props = withDefaults(defineProps<MenubarTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const { modelValue, onMenuOpen, onMenuToggle } = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

const { forwardRef, currentElement: triggerElement } = useForwardExpose();
const { CollectionItem } = useCollection({ key: 'Menubar' });

const isFocused = ref(false);

const open = computed(() => modelValue.value === menuContext.value);

function onPointerDown(event: PointerEvent) {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
    onMenuOpen(menuContext.value);
    // prevent trigger focusing when opening
    // this allows the content to be given focus without competition
    if (!open.value) {
      event.preventDefault();
    }
  }
}

function onPointerEnter() {
  const menubarOpen = Boolean(modelValue.value);
  if (menubarOpen && !open.value) {
    onMenuOpen(menuContext.value);
    triggerElement.value?.focus();
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (props.disabled || props.isLink) return;
  if (['Enter', ' '].includes(event.key)) {
    onMenuToggle(menuContext.value);
  }
  if (event.key === 'ArrowDown') {
    onMenuOpen(menuContext.value);
  }
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
    menuContext.wasKeyboardTriggerOpenRef.value = true;
    event.preventDefault();
  }
}

function onFocus() {
  isFocused.value = true;
}

function onBlur() {
  isFocused.value = false;
}

onMounted(() => {
  menuContext.triggerElement = triggerElement;
});
</script>

<template>
  <RovingFocusItem as-child :focusable="!disabled" :tab-stop-id="menuContext.value">
    <CollectionItem>
      <MenuAnchor as-child>
        <Primitive
          :id="menuContext.triggerId"
          :ref="forwardRef"
          :class="props.class"
          :as="as"
          :as-child="asChild"
          :type="as === 'button' ? 'button' : undefined"
          role="menuitem"
          aria-haspopup="menu"
          :aria-expanded="open"
          :aria-controls="open ? menuContext.contentId : undefined"
          :data-highlighted="isFocused ? '' : undefined"
          :data-state="open ? 'open' : 'closed'"
          :data-disabled="disabled ? '' : undefined"
          :disabled="disabled"
          :data-value="menuContext.value"
          @pointerdown="onPointerDown"
          @pointerenter="onPointerEnter"
          @keydown.enter.space.arrow-down="onKeyDown"
          @focus="onFocus"
          @blur="onBlur"
        >
          <slot />
        </Primitive>
      </MenuAnchor>
    </CollectionItem>
  </RovingFocusItem>
</template>
