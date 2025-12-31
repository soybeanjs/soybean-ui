<script setup lang="ts">
import { computed, shallowRef, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import { useArrowNavigation, useDismissableLayer, useExposedElement } from '../../composables';
import { getActiveElement, getTabbableCandidates, tryFocusFirst } from '../../shared';
import {
  useCollectionContext,
  useNavigationMenuItemContext,
  useNavigationMenuRootContext,
  useNavigationMenuThemeContext
} from './context';
import { EVENT_ROOT_CONTENT_DISMISS } from './shared';
import type { MotionAttribute, NavigationMenuContentImplEmits, NavigationMenuContentImplProps } from './types';

defineOptions({
  name: 'NavigationMenuContentImpl'
});

const props = defineProps<NavigationMenuContentImplProps>();

const emit = defineEmits<NavigationMenuContentImplEmits>();

const { dir, orientation, modelValue, previousValue, rootElement, viewportElement, isRoot, onItemDismiss } =
  useNavigationMenuRootContext('NavigationMenuContentImpl');
const {
  value,
  triggerId,
  contentId,
  triggerElement,
  dataState,
  wasEscapeCloseRef,
  focusProxyElement,
  onContentFocusOutside,
  onRootContentClose
} = useNavigationMenuItemContext('NavigationMenuContentImpl');

const themeContext = useNavigationMenuThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);

const { getOrderedElements } = useCollectionContext('NavigationMenuContentImpl');

const [contentElement, setContentElement] = useExposedElement();

const { pointerEvents } = useDismissableLayer(contentElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);

    if (event.defaultPrevented) return;

    onItemDismiss();
    triggerElement.value?.focus();
    wasEscapeCloseRef.value = true;
  },
  onPointerDownOutside: event => {
    emit('pointerDownOutside', event);

    if (event.defaultPrevented) return;

    const target = event.target as HTMLElement;
    const isTrigger = getOrderedElements().some(el => el.contains(target));
    const isRootViewport = isRoot && viewportElement.value?.contains(target);

    if (isTrigger || isRootViewport || !isRoot) {
      event.preventDefault();
    }
  },
  onFocusOutside: event => {
    emit('focusOutside', event);
    emit('interactOutside', event);

    const target = event.detail.originalEvent.target as HTMLElement;

    if (target.hasAttribute('data-soybean-navigation-menu-trigger')) {
      event.preventDefault();
    }

    if (event.defaultPrevented) return;

    onContentFocusOutside();

    // Only dismiss content when focus moves outside of the menu
    if (rootElement.value?.contains(event.target as HTMLElement)) {
      event.preventDefault();
    }
  },
  onDismiss: () => {
    const event = new Event(EVENT_ROOT_CONTENT_DISMISS, {
      bubbles: true,
      cancelable: true
    });
    contentElement.value?.dispatchEvent(event);
  }
});

const prevMotionAttribute = shallowRef<MotionAttribute | null>(null);

const motionAttribute = computed(() => {
  const elements = getOrderedElements();
  const values = elements.map(el => el.id.split('trigger-')[1]);

  if (dir.value === 'rtl') {
    values.reverse();
  }
  const prevIndex = values.indexOf(previousValue.value ?? '');
  const isSelected = value === modelValue.value;
  const wasSelected = prevIndex === values.indexOf(value);

  // We only want to update selected and the last selected content
  // this avoids animations being interrupted outside of that range
  if (!isSelected && !wasSelected) {
    return prevMotionAttribute.value;
  }

  const index = values.indexOf(modelValue.value);

  // Don't provide a direction on the initial open
  if (index !== prevIndex) {
    // If we're moving to this item from another
    if (isSelected && prevIndex !== -1) {
      return index > prevIndex ? 'from-end' : 'from-start';
    }
    // If we're leaving this item for another
    if (wasSelected && index !== -1) {
      return index > prevIndex ? 'to-start' : 'to-end';
    }
  }
  // Otherwise we're entering from closed or leaving the list
  // entirely and should not animate in any direction
  return null;
});

const style = computed<CSSProperties>(() => ({
  pointerEvents: pointerEvents.value
}));

const onKeydown = (event: KeyboardEvent) => {
  // prevent parent menu triggering keydown event
  if ((event.target as HTMLElement).closest('[data-soybean-navigation-menu]') !== rootElement.value) return;

  const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
  const isTabKey = event.key === 'Tab' && !isMetaKey;
  const candidates = getTabbableCandidates(event.currentTarget as HTMLElement);

  if (isTabKey) {
    const focusedElement = getActiveElement();
    const index = candidates.findIndex(candidate => candidate === focusedElement);
    const isMovingBackwards = event.shiftKey;
    const nextCandidates = isMovingBackwards
      ? candidates.slice(0, index).reverse()
      : candidates.slice(index + 1, candidates.length);

    if (tryFocusFirst(nextCandidates)) {
      // prevent browser tab keydown because we've handled focus
      event.preventDefault();
    } else {
      // If we can't focus that means we're at the edges
      // so focus the proxy and let browser handle
      // tab/shift+tab keypress on the proxy instead
      focusProxyElement.value?.focus();

      return;
    }
  }

  const newSelectedElement = useArrowNavigation(event, getActiveElement() as HTMLElement, undefined, {
    itemsArray: candidates,
    loop: false,
    enableIgnoredElement: true
  });
  newSelectedElement?.focus();
};

watchEffect(() => {
  prevMotionAttribute.value = motionAttribute.value;
});

watchEffect(cleanupFn => {
  const content = contentElement.value;
  if (isRoot && content) {
    // Bubble dismiss to the root content node and focus its trigger
    const handleClose = () => {
      onItemDismiss();
      onRootContentClose();
      if (content.contains(getActiveElement())) {
        triggerElement.value?.focus();
      }
    };

    content.addEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose);

    cleanupFn(() => content.removeEventListener(EVENT_ROOT_CONTENT_DISMISS, handleClose));
  }
});
</script>

<template>
  <div
    :id="contentId"
    :ref="setContentElement"
    :class="cls"
    :aria-labelledby="triggerId"
    data-dismissable-layer
    :data-orientation="orientation"
    :data-motion="motionAttribute"
    :data-state="dataState"
    :style="style"
    @keydown="onKeydown"
  >
    <slot />
  </div>
</template>
