<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, useForwardListeners, usePresence } from '../../composables';
import type { FocusOutsideEvent, HorizontalSide } from '../../types';
import { popperCssVars } from '../popper/shared';
import { useMenuContext, useMenuRootContext, useMenuSubContext, useMenuThemeContext } from './context';
import MenuContentImpl from './menu-content-impl.vue';
import type { MenuSubContentEmits, MenuSubContentProps } from './types';
import { SUB_CLOSE_KEYS, subMenuCssVars } from './shared';

defineOptions({
  name: 'MenuSubContent'
});

const props = withDefaults(defineProps<MenuSubContentProps>(), {
  prioritizePosition: true
});

const emit = defineEmits<MenuSubContentEmits>();

const listeners = useForwardListeners(emit);
const [subContentElement, setSubContentElement] = useForwardElement();
const { open, onOpenChange } = useMenuContext('MenuSubContent');
const { dir, isUsingKeyboard, onClose } = useMenuRootContext('MenuSubContent');
const { subContentId, subTriggerId, subTriggerElement, initSubContentId } = useMenuSubContext('MenuSubContent');

const themeContext = useMenuThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.subContent, props.class]);

const style: CSSProperties = {
  [subMenuCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [subMenuCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [subMenuCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [subMenuCssVars.triggerWidth]: `var(${popperCssVars.anchorWidth})`,
  [subMenuCssVars.triggerHeight]: `var(${popperCssVars.anchorHeight})`
};

const isPresent = props.forceMount ? shallowRef(true) : usePresence(subContentElement, open);

const side = computed<HorizontalSide>(() => {
  return dir.value === 'rtl' ? 'left' : 'right';
});

const onOpenAutoFocus = () => {
  // when opening a submenu, focus content for keyboard users only
  if (isUsingKeyboard.value) {
    subContentElement.value?.focus();
  }
};

const focusOutside = (event: FocusOutsideEvent) => {
  if (event.defaultPrevented) return;
  // We prevent closing when the trigger is focused to avoid triggering a re-open animation
  // on pointer interaction.
  if (event.target !== subTriggerElement.value) {
    onOpenChange(false);
  }
};

const onEscapeKeyDown = (event: KeyboardEvent) => {
  onClose();
  // ensure pressing escape in submenu doesn't escape full screen mode
  event.preventDefault();
};

const onKeyDown = (event: KeyboardEvent) => {
  // Submenu key events bubble through portals. We only care about keys in this menu.
  const isKeyDownInside = (event.currentTarget as HTMLElement)?.contains(event.target as HTMLElement);
  const isCloseKey = SUB_CLOSE_KEYS[dir.value].includes(event.key);
  if (isKeyDownInside && isCloseKey) {
    onOpenChange(false);
    // We focus manually because we prevented it in `onCloseAutoFocus`
    subTriggerElement.value?.focus();
    // prevent window from scrolling
    event.preventDefault();
  }
};

initSubContentId();
</script>

<template>
  <MenuContentImpl
    v-if="isPresent"
    v-bind="props"
    :id="subContentId"
    :ref="setSubContentElement"
    :class="cls"
    :style="style"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :aria-labelledby="subTriggerId"
    align="start"
    :side="side"
    data-soybean-menu-sub-content
    v-on="listeners"
    @open-auto-focus.prevent="onOpenAutoFocus"
    @close-auto-focus.prevent
    @escape-key-down="onEscapeKeyDown"
    @focus-outside="focusOutside"
    @keydown="onKeyDown"
  >
    <slot />
  </MenuContentImpl>
</template>
