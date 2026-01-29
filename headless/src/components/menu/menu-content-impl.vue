<script setup lang="ts">
import { computed, onWatcherCleanup, useTemplateRef, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import {
  useArrowNavigation,
  useBodyScrollLock,
  useDismissableLayer,
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
import { PopperPopup, PopperPositioner } from '../popper';
import { popperCssVars } from '../popper/shared';
import { provideMenuContentContext, useMenuContext, useMenuRootContext, useMenuUi } from './context';
import { FIRST_LAST_KEYS, LAST_KEYS, MENU_POPUP_DATA_ATTRIBUTE, menuCssVars, subMenuCssVars } from './shared';
import type { MenuContentImplEmits, MenuContentImplProps } from './types';

defineOptions({
  name: 'MenuContentImpl'
});

const props = defineProps<MenuContentImplProps>();

const emit = defineEmits<MenuContentImplEmits>();

const { modal, dir, isUsingKeyboard } = useMenuRootContext('MenuContentImpl');
const { isRoot, dataState, popupId, triggerId, dataPopupAttr, initPopupId, onOpenChange, onPopupElementChange } =
  useMenuContext('MenuContentImpl');

const [positionerElement, setPositionerElement] = useForwardElement();
const [popupElement, setPopupElement] = useForwardElement(node => {
  onPopupElementChange(node);
});
const { currentItemId, searchRef, pointerSide } = provideMenuContentContext({
  popupElement
});

const ui = useMenuUi();
const cls = computed(() => (isRoot ? ui.value?.positioner : ui.value?.subPositioner));
const popupCls = computed(() => (isRoot ? ui.value?.popup : ui.value?.subPopup));

const { handleTypeaheadSearch } = useTypeahead();
const rovingFocusGroupRef = useTemplateRef('rovingFocusGroupRef');

const { pointerEvents } = useDismissableLayer(popupElement, {
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
    if (!isRoot) return;
    onOpenChange(false);
  }
});

const { onKeydown: onFocusScopeKeydown } = useFocusScope(positionerElement, {
  trapped: () => props.trapFocus,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
    if (event.defaultPrevented) return;
    // when opening, explicitly focus the popup area only and leave
    // `onEntryFocus` in  control of focusing first item
    event.preventDefault();
    popupElement.value?.focus({
      preventScroll: true
    });
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
  }
});

const forwardedProps = useOmitProps(props, ['disableOutsidePointerEvents', 'trapFocus', 'loop', 'popupProps']);

const popupProps = computed(() => {
  return {
    ...props.popupProps,
    [dataPopupAttr]: ''
  };
});

const popupStyle = computed<CSSProperties>(() => {
  const cssVars = isRoot ? menuCssVars : subMenuCssVars;

  return {
    [cssVars.popupTransformOrigin]: `var(${popperCssVars.transformOrigin})`,
    [cssVars.popupAvailableWidth]: `var(${popperCssVars.availableWidth})`,
    [cssVars.popupAvailableHeight]: `var(${popperCssVars.availableHeight})`,
    [cssVars.triggerWidth]: `var(${popperCssVars.anchorWidth})`,
    [cssVars.triggerHeight]: `var(${popperCssVars.anchorHeight})`,
    pointerEvents: pointerEvents.value
  };
});

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
  const isKeyDownInside = target.closest(`[${MENU_POPUP_DATA_ATTRIBUTE}]`) === event.currentTarget;
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;
  const isCharacterKey = event.key.length === 1;

  const el = useArrowNavigation(event, getActiveElement() as HTMLElement, popupElement.value, {
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
  if (event.target !== popupElement.value) return;
  if (!FIRST_LAST_KEYS.includes(event.key)) return;

  event.preventDefault();
  const candidateNodes = collectionItems.map(item => item.element);
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

initPopupId();
useFocusGuards();
useHideOthers(positionerElement, () => modal.value && isRoot);

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
    as-child
    orientation="vertical"
    :dir="dir"
    :loop="loop"
    @entry-focus="onEntryFocus"
  >
    <PopperPositioner
      v-bind="forwardedProps"
      :ref="setPositionerElement"
      :class="cls"
      @keydown="onKeyDown"
      @blur="onBlur"
      @pointermove="onPointerMove"
    >
      <PopperPopup
        v-bind="popupProps"
        :id="popupId"
        :ref="setPopupElement"
        :class="popupCls"
        :aria-labelledby="triggerId"
        aria-orientation="vertical"
        data-dismissable-layer
        :data-state="dataState"
        :dir="dir"
        role="menu"
        tabindex="-1"
        :style="popupStyle"
      >
        <slot />
      </PopperPopup>
    </PopperPositioner>
  </RovingFocusGroup>
</template>
