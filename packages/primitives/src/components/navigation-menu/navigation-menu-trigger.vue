<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import type { VNode } from 'vue';
import { refAutoReset, unrefElement } from '@vueuse/core';
import { useCollection, useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { VisuallyHidden } from '../visually-hidden';
import { injectNavigationMenuItemContext, injectNavigationMenuRootContext } from './context';
import { getOpenState, makeContentId, makeTriggerId } from './shared';
import type { NavigationMenuTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'NavigationMenuTrigger',
  inheritAttrs: false
});

const props = withDefaults(defineProps<NavigationMenuTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const menuContext = injectNavigationMenuRootContext();
const itemContext = injectNavigationMenuItemContext();

const { CollectionItem } = useCollection({ key: 'NavigationMenu' });
const { forwardRef, currentElement: triggerElement } = useForwardExpose();
const triggerId = ref('');
const contentId = ref('');

const hasPointerMoveOpenedRef = refAutoReset(false, 300);
const wasClickCloseRef = ref(false);

const open = computed(() => itemContext.value === menuContext.modelValue.value);

onMounted(() => {
  itemContext.triggerRef = triggerElement;
  triggerId.value = makeTriggerId(menuContext.baseId, itemContext.value);
  contentId.value = makeContentId(menuContext.baseId, itemContext.value);
});

function handlePointerEnter() {
  if (menuContext.disableHoverTrigger.value) return;

  wasClickCloseRef.value = false;
  itemContext.wasEscapeCloseRef.value = false;
}

function handlePointerMove(ev: PointerEvent) {
  if (menuContext.disableHoverTrigger.value) return;

  if (ev.pointerType === 'mouse') {
    if (
      props.disabled ||
      wasClickCloseRef.value ||
      itemContext.wasEscapeCloseRef.value ||
      hasPointerMoveOpenedRef.value
    ) {
      return;
    }

    menuContext.onTriggerEnter(itemContext.value);
    hasPointerMoveOpenedRef.value = true;
  }
}

function handlePointerLeave(ev: PointerEvent) {
  if (menuContext.disableHoverTrigger.value) return;

  if (ev.pointerType === 'mouse') {
    if (props.disabled) return;
    menuContext.onTriggerLeave();
    hasPointerMoveOpenedRef.value = false;
  }
}

function handleClick(event: PointerEvent) {
  if (event.pointerType === 'mouse' && menuContext.disableClickTrigger.value) return;

  // if open via pointermove, we prevent click event
  if (hasPointerMoveOpenedRef.value) return;

  if (open.value) menuContext.onItemSelect('');
  else menuContext.onItemSelect(itemContext.value);

  wasClickCloseRef.value = open.value;
}

function handleKeydown(ev: KeyboardEvent) {
  const verticalEntryKey = menuContext.dir.value === 'rtl' ? 'ArrowLeft' : 'ArrowRight';
  const entryKey = { horizontal: 'ArrowDown', vertical: verticalEntryKey }[menuContext.orientation];
  if (open.value && ev.key === entryKey) {
    itemContext.onEntryKeyDown();
    // Prevent FocusGroupItem from handling the event
    ev.preventDefault();
    ev.stopPropagation();
  }
}

function setFocusProxyRef(node: VNode) {
  // @ts-expect-error unrefElement expect MaybeRef, but also support Vnode
  itemContext.focusProxyRef.value = unrefElement(node);
  return undefined;
}

function handleVisuallyHiddenFocus(ev: FocusEvent) {
  const content = document.getElementById(itemContext.contentId);
  const prevFocusedElement = ev.relatedTarget as HTMLElement | null;

  const wasTriggerFocused = prevFocusedElement === triggerElement.value;
  const wasFocusFromContent = content?.contains(prevFocusedElement);

  if (wasTriggerFocused || !wasFocusFromContent) itemContext.onFocusProxyEnter(wasTriggerFocused ? 'start' : 'end');
}
</script>

<template>
  <CollectionItem>
    <Primitive
      :id="triggerId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :disabled="disabled"
      :data-disabled="disabled ? '' : undefined"
      :data-state="getOpenState(open)"
      data-navigation-menu-trigger
      :aria-expanded="open"
      :aria-controls="contentId"
      v-bind="$attrs"
      @pointerenter="handlePointerEnter"
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @click="handleClick"
      @keydown="handleKeydown"
    >
      <slot />
    </Primitive>
  </CollectionItem>

  <template v-if="open">
    <VisuallyHidden :ref="setFocusProxyRef" aria-hidden="true" :tabindex="0" @focus="handleVisuallyHiddenFocus" />
    <span v-if="menuContext.viewport" :aria-owns="contentId" />
  </template>
</template>
