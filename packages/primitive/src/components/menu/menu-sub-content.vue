<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '../../composables';
import type { FocusOutsideEvent } from '../../types';
import { injectMenuContext, injectMenuRootContext, injectMenuSubContext } from './context';
import { SUB_CLOSE_KEYS } from './shared';
import MenuContentImpl from './menu-content-impl.vue';
import type { MenuSubContentEmits, MenuSubContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuSubContent'
});

const props = withDefaults(defineProps<MenuSubContentPropsWithPrimitive>(), {
  prioritizePosition: true
});
const emit = defineEmits<MenuSubContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const menuContext = injectMenuContext();
const rootContext = injectMenuRootContext();
const menuSubContext = injectMenuSubContext();

const { forwardRef, currentElement: subContentElement } = useForwardExpose();

menuSubContext.contentId ||= useId(undefined, 'soybean-menu-sub-content');

function onOpenAutoFocus(_event: Event) {
  // when opening a submenu, focus content for keyboard users only
  if (rootContext.isUsingKeyboardRef.value) {
    subContentElement.value?.focus();
  }
}

function onFocusOutside(event: FocusOutsideEvent) {
  if (event.defaultPrevented) return;
  // We prevent closing when the trigger is focused to avoid triggering a re-open animation
  // on pointer interaction.
  if (event.target !== menuSubContext.trigger.value) {
    menuContext.onOpenChange(false);
  }
}

function onEscapeKeyDown(event: KeyboardEvent) {
  rootContext.onClose();
  // ensure pressing escape in submenu doesn't escape full screen mode
  event.preventDefault();
}

function onKeyDown(event: KeyboardEvent) {
  // Submenu key events bubble through portals. We only care about keys in this menu.
  const isKeyDownInside = (event.currentTarget as HTMLElement)?.contains(event.target as HTMLElement);
  const isCloseKey = SUB_CLOSE_KEYS[rootContext.dir.value].includes(event.key);
  if (isKeyDownInside && isCloseKey) {
    menuContext.onOpenChange(false);
    // We focus manually because we prevented it in `onCloseAutoFocus`
    menuSubContext.trigger.value?.focus();
    // prevent window from scrolling
    event.preventDefault();
  }
}
</script>

<template>
  <Presence :present="forceMount || menuContext.open.value">
    <MenuContentImpl
      v-bind="forwarded"
      :id="menuSubContext.contentId"
      :ref="forwardRef"
      :aria-labelledby="menuSubContext.triggerId"
      align="start"
      :side="rootContext.dir.value === 'rtl' ? 'left' : 'right'"
      :disable-outside-pointer-events="false"
      :disable-outside-scroll="false"
      :trap-focus="false"
      @open-auto-focus.prevent="onOpenAutoFocus"
      @close-auto-focus.prevent
      @focus-outside="onFocusOutside"
      @escape-key-down="onEscapeKeyDown"
      @keydown="onKeyDown"
    >
      <slot />
    </MenuContentImpl>
  </Presence>
</template>
