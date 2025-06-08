<script setup lang="ts">
import { onWatcherCleanup, useAttrs, useTemplateRef, watchEffect } from 'vue';
import {
  useArrowNavigation,
  useBodyScrollLock,
  useDismissableLayer,
  useExposedElement,
  useFocusGuards,
  useFocusScope,
  useForwardElement,
  useHideOthers,
  useOmitProps,
  useTypeahead
} from '../../composables';
import { COLLECTION_ITEM_ATTRIBUTE } from '../../constants';
import { getActiveElement, isMouseEvent, tryFocusFirst } from '../../shared';
import { RovingFocusGroup } from '../roving-focus';
import { PopperContent } from '../popper';
import { provideMenuContentContext, useMenuContext, useMenuRootContext, useMenuSubContext } from './context';
import { FIRST_LAST_KEYS, LAST_KEYS, MENU_CONTENT_DATA_ATTRIBUTE } from './shared';
import type { MenuContentImplEmits, MenuContentImplProps } from './types';

defineOptions({
  name: 'MenuContentImpl',
  inheritAttrs: false
});

const props = defineProps<MenuContentImplProps>();

const emit = defineEmits<MenuContentImplEmits>();

const attrs = useAttrs();

const { onOpenChange, dataState, onContentElementChange } = useMenuContext('MenuContentImpl');
const { modal, dir, isUsingKeyboard } = useMenuRootContext('MenuContentImpl');
const [floatingElement, setFloatingElement] = useForwardElement(props.floatingRef);
const [contentElement, setContentElement] = useExposedElement(onContentElementChange);
const { currentItemId, searchRef, pointerSide } = provideMenuContentContext({
  contentElement
});
const subContext = useMenuSubContext();

const { handleTypeaheadSearch } = useTypeahead();
const rovingFocusGroupRef = useTemplateRef('rovingFocusGroupRef');

const { computedStyle, layerProps } = useDismissableLayer(contentElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    emit('focusOutside', event);
  },
  onInteractOutside: event => {
    emit('interactOutside', event);
  },
  onDismiss: () => {
    if (subContext) return;
    onOpenChange(false);
  }
});

const { onKeydown: onFocusScopeKeydown, focusScopeProps } = useFocusScope(floatingElement, {
  trapped: () => props.trapFocus,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
    if (event.defaultPrevented) return;
    // when opening, explicitly focus the content area only and leave
    // `onEntryFocus` in  control of focusing first item
    event.preventDefault();
    contentElement.value?.focus({
      preventScroll: true
    });
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(
  props,
  ['disableOutsidePointerEvents', 'trapFocus', 'loop'],
  attrs,
  layerProps,
  focusScopeProps
);

const onEntryFocus = (event: Event) => {
  emit('entryFocus', event);
  // only focus first item when using keyboard
  if (!isUsingKeyboard.value) {
    event.preventDefault();
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  onFocusScopeKeydown(event);

  if (event.defaultPrevented) return;
  // submenu key events bubble through portals. We only care about keys in this menu.
  const target = event.target as HTMLElement;
  const isKeyDownInside = target.closest(`[${MENU_CONTENT_DATA_ATTRIBUTE}]`) === event.currentTarget;
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
  const isCharacterKey = event.key.length === 1;

  const el = useArrowNavigation(event, getActiveElement() as HTMLElement, contentElement.value, {
    loop: props.loop,
    arrowKeyOptions: 'vertical',
    dir: dir.value,
    focus: true,
    attributeName: `[${COLLECTION_ITEM_ATTRIBUTE}]:not([data-disabled])`
  });
  if (el) {
    el.focus();
    return;
  }

  // prevent "Space" taken account into handleTypeahead
  if (event.code === 'Space') return;

  const collectionItems = rovingFocusGroupRef.value?.getItems() ?? [];

  if (isKeyDownInside) {
    // menus should not be navigated using tab key so we prevent it
    if (event.key === 'Tab') {
      event.preventDefault();
    }
    if (!isModifierKey && isCharacterKey) {
      handleTypeaheadSearch(event.key, collectionItems);
    }
  }

  // focus first/last item based on key pressed
  if (event.target !== contentElement.value) return;
  if (!FIRST_LAST_KEYS.includes(event.key)) return;

  event.preventDefault();
  const candidateNodes = [...collectionItems.map(item => item.element)];
  if (LAST_KEYS.includes(event.key)) {
    candidateNodes.reverse();
  }
  tryFocusFirst(candidateNodes);
};

function onBlur(event: FocusEvent) {
  if (!event) return;

  const { currentTarget, target } = event;

  // clear search buffer when leaving the menu
  if (!(currentTarget as HTMLElement)?.contains(target as HTMLElement)) {
    searchRef.value = '';
  }
}

let lastPointerX = 0;

function onPointerMove(event: PointerEvent) {
  if (!isMouseEvent(event)) return;
  const target = event.target as HTMLElement;
  const pointerXHasChanged = lastPointerX !== event.clientX;

  // We don't use `event.movementX` for this check because Safari will
  // always return `0` on a pointer event.
  if ((event?.currentTarget as HTMLElement)?.contains(target) && pointerXHasChanged) {
    const newSide = event.clientX > lastPointerX ? 'right' : 'left';
    pointerSide.value = newSide;
    lastPointerX = event.clientX;
  }
}

useFocusGuards();
useHideOthers(contentElement, () => modal.value && !subContext);

watchEffect(() => {
  if (!props.disableOutsidePointerEvents) return;

  const cleanup = useBodyScrollLock();
  onWatcherCleanup(cleanup);
});
</script>

<template>
  <RovingFocusGroup
    ref="rovingFocusGroupRef"
    v-model:current-tab-stop-id="currentItemId"
    as="template"
    orientation="vertical"
    :dir="dir"
    :loop="loop"
    @entry-focus="onEntryFocus"
  >
    <PopperContent
      v-bind="forwardedProps"
      :ref="setContentElement"
      :floating-ref="setFloatingElement"
      role="menu"
      data-soybean-menu-content
      aria-orientation="vertical"
      :data-state="dataState"
      :dir="dir"
      :style="computedStyle"
      @keydown="onKeyDown"
      @blur="onBlur"
      @pointermove="onPointerMove"
    >
      <slot />
    </PopperContent>
  </RovingFocusGroup>
</template>
