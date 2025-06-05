<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { usePresence } from '../../composables';
import type { FocusOutsideEvent, HorizontalSide, PointerDownOutsideEvent } from '../../types';
import { useMenuRootContext, useMenuSubContext } from './context';
import MenuContentImpl from './menu-content-impl.vue';
import type { MenuSubContentEmits, MenuSubContentProps } from './types';
import { SUB_CLOSE_KEYS } from './shared';

defineOptions({
  name: 'MenuSubContent'
});

const props = withDefaults(defineProps<MenuSubContentProps>(), {
  prioritizePosition: true
});

const emit = defineEmits<MenuSubContentEmits>();

const { dir, contentElement, open, onOpenChange, isUsingKeyboard } = useMenuRootContext('MenuSubContent');
const { subContentId, subTriggerId, subTriggerElement, initSubContentId, subContentElement, setSubContentElement } =
  useMenuSubContext('MenuSubContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const side = computed<HorizontalSide>(() => {
  return dir.value === 'rtl' ? 'left' : 'right';
});

const onOpenAutoFocus = (event: Event) => {
  emit('openAutoFocus', event);

  event.preventDefault();
  // when opening a submenu, focus content for keyboard users only
  if (isUsingKeyboard.value) {
    subContentElement.value?.focus();
  }
};

const closeAutoFocus = (event: Event) => {
  emit('closeAutoFocus', event);

  event.preventDefault();
};

const focusOutside = (event: FocusOutsideEvent) => {
  emit('focusOutside', event);
  if (event.defaultPrevented) return;
  // We prevent closing when the trigger is focused to avoid triggering a re-open animation
  // on pointer interaction.
  if (event.target !== subTriggerElement.value) {
    onOpenChange(false);
  }
};

const onEscapeKeyDown = (event: KeyboardEvent) => {
  emit('escapeKeyDown', event);

  onOpenChange(false);
  // ensure pressing escape in submenu doesn't escape full screen mode
  event.preventDefault();
};

const pointerDownOutside = (event: PointerDownOutsideEvent) => {
  emit('pointerDownOutside', event);
};

const onInteractOutside = (event: PointerDownOutsideEvent | FocusOutsideEvent) => {
  emit('interactOutside', event);
};

const onEntryFocus = (event: Event) => {
  emit('entryFocus', event);
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
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :trigger-id="subTriggerId"
    align="start"
    :side="side"
    @open-auto-focus="onOpenAutoFocus"
    @close-auto-focus="closeAutoFocus"
    @escape-key-down="onEscapeKeyDown"
    @pointer-down-outside="pointerDownOutside"
    @focus-outside="focusOutside"
    @interact-outside="onInteractOutside"
    @entry-focus="onEntryFocus"
    @keydown="onKeyDown"
  >
    <slot />
  </MenuContentImpl>
</template>
