<script setup lang="ts">
import { useAttrs } from 'vue';
import { refAutoReset } from '@vueuse/core';
import { useForwardElement } from '../../composables';
import { isMouseEvent, isNullish } from '../../shared';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import {
  useCollectionItem,
  useNavigationMenuItemContext,
  useNavigationMenuRootContext,
  useNavigationMenuUi
} from './context';
import type { NavigationMenuTriggerProps } from './types';

defineOptions({
  name: 'NavigationMenuTrigger',
  inheritAttrs: false
});

const props = withDefaults(defineProps<NavigationMenuTriggerProps>(), {
  as: 'button'
});

const attrs = useAttrs();

const {
  dir,
  orientation,
  disableClickTrigger,
  disableHoverTrigger,
  viewportElement,
  onItemSelect,
  onTriggerEnter,
  onTriggerLeave
} = useNavigationMenuRootContext('NavigationMenuTrigger');
const {
  value,
  triggerId,
  contentId,
  open,
  dataState,
  wasEscapeCloseRef,
  onTriggerElementChange,
  setFocusProxyElement,
  onEntryKeyDown,
  onFocusProxyEnter
} = useNavigationMenuItemContext('NavigationMenuTrigger');

const cls = useNavigationMenuUi('trigger');

const { itemProps, onItemElementChange } = useCollectionItem();
const [triggerElement, setTriggerElement] = useForwardElement(el => {
  onTriggerElementChange(el);
  onItemElementChange(el);
});

const hasPointerMoveOpenedRef = refAutoReset(false, 300);
let wasClickCloseRef = false;

const onPointerEnter = () => {
  if (disableHoverTrigger.value) return;

  wasClickCloseRef = false;
  wasEscapeCloseRef.value = false;
};

const onPointerMove = (event: PointerEvent) => {
  if (disableHoverTrigger.value) return;
  if (!isMouseEvent(event)) return;

  if (props.disabled || wasClickCloseRef || wasEscapeCloseRef.value || hasPointerMoveOpenedRef.value) {
    return;
  }

  onTriggerEnter(value);
  hasPointerMoveOpenedRef.value = true;
};

const onPointerLeave = (event: PointerEvent) => {
  if (disableHoverTrigger.value) return;
  if (!isMouseEvent(event)) return;
  if (props.disabled) return;

  onTriggerLeave();
  hasPointerMoveOpenedRef.value = false;
};

const onClick = (event: PointerEvent) => {
  const matchEvent = isNullish(event.pointerType) || event.pointerType === 'mouse';

  if (matchEvent && disableClickTrigger.value) return;

  // if open via pointermove, we prevent click event
  if (hasPointerMoveOpenedRef.value) return;

  if (open.value) {
    onItemSelect('');
  } else {
    onItemSelect(value);
  }

  wasClickCloseRef = open.value;
};

const onKeydown = (event: KeyboardEvent) => {
  const verticalEntryKey = dir.value === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  const entryKey = { horizontal: 'ArrowDown', vertical: verticalEntryKey }[orientation.value];

  if (open.value && event.key === entryKey) {
    onEntryKeyDown();
    // Prevent FocusGroupItem from handling the event
    event.preventDefault();
    event.stopPropagation();
  }
};

const onVisuallyHiddenFocus = (event: FocusEvent) => {
  const contentElement = document.getElementById(contentId);
  const prevFocusedElement = event.relatedTarget as HTMLElement | null;

  const wasTriggerFocused = prevFocusedElement === triggerElement.value;
  const wasFocusFromContent = contentElement?.contains(prevFocusedElement);

  if (wasTriggerFocused || !wasFocusFromContent) {
    onFocusProxyEnter(wasTriggerFocused ? 'start' : 'end');
  }
};
</script>

<template>
  <Primitive
    v-bind="{ ...attrs, ...itemProps }"
    :id="triggerId"
    :ref="setTriggerElement"
    :as="as"
    :as-child="asChild"
    :class="cls"
    :disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :data-state="dataState"
    data-soybean-navigation-menu-trigger
    :aria-expanded="open"
    :aria-controls="contentId"
    @pointerenter="onPointerEnter"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
    @click="onClick"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>

  <template v-if="open">
    <VisuallyHidden :ref="setFocusProxyElement" aria-hidden="true" :tabindex="0" @focus="onVisuallyHiddenFocus" />
    <span v-if="viewportElement" :aria-owns="contentId" />
  </template>
</template>
