<script setup lang="ts">
import { computed, onWatcherCleanup, useAttrs, watch, watchEffect } from 'vue';
import {
  useBodyScrollLock,
  useDismissableLayer,
  useExposedElement,
  useFocusGuards,
  useFocusScope,
  useHideOthers,
  useTypeahead
} from '../../composables';
import { tryFocusFirst } from '../../shared';
import {
  provideSelectContentContext,
  useCollectionContext,
  useSelectRootContext,
  useSelectThemeContext
} from './context';
import SelectItemAlignedPosition from './select-item-aligned-position.vue';
import SelectPopperPosition from './select-popper-position.vue';
import type { SelectContentImplEmits, SelectContentImplProps } from './types';

defineOptions({
  name: 'SelectContentImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectContentImplProps>(), {
  align: 'start',
  position: 'item-aligned',
  bodyLock: true
});

const emit = defineEmits<SelectContentImplEmits>();

const attrs = useAttrs();

const themeContext = useSelectThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.content, props.class]);

const {
  onOpenChange,
  dataState,
  modelValue,
  isMultiple,
  dir,
  contentId,
  triggerElement,
  triggerPointerDownPosition,
  resetTriggerPointerDownPosition
} = useSelectRootContext('SelectContentImpl');

const { onContainerElementChange, getOrderedItems, getOrderedElements } = useCollectionContext('SelectContentImpl');
const [contentElement, setContentElement] = useExposedElement(onContainerElementChange);

const { search, handleTypeaheadSearch } = useTypeahead();

const { isPositioned, focusSelectedItem } = provideSelectContentContext({
  position: computed(() => props.position),
  modelValue,
  isMultiple,
  search
});

const { computedStyle, layerProps } = useDismissableLayer(contentElement, {
  disableOutsidePointerEvents: true,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    event.preventDefault();
  },
  onDismiss: () => {
    onOpenChange(false);
  }
});

const { onKeydown: onFocusScopeKeydown, focusScopeProps } = useFocusScope(contentElement, {
  onOpenAutoFocus: event => {
    event.preventDefault();
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
    if (event.defaultPrevented) return;
    triggerElement.value?.focus({ preventScroll: true });
    event.preventDefault();
  }
});

const forwardedProps = computed(() => ({
  ...attrs,
  ...layerProps,
  ...focusScopeProps,
  ...(props.position === 'popper' ? props : {})
}));

const onKeyDown = (event: KeyboardEvent) => {
  onFocusScopeKeydown(event);

  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;

  // select should not be navigated using tab key so we prevent it
  if (event.key === 'Tab') event.preventDefault();

  if (!isModifierKey && event.key.length === 1) {
    handleTypeaheadSearch(event.key, getOrderedItems());
  }

  if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
    const collectionItems = getOrderedElements();
    let candidateNodes = [...collectionItems];

    if (['ArrowUp', 'End'].includes(event.key)) {
      candidateNodes = candidateNodes.slice().reverse();
    }

    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      const currentElement = event.target as HTMLElement;
      const currentIndex = candidateNodes.indexOf(currentElement);
      candidateNodes = candidateNodes.slice(currentIndex + 1);
    }
    setTimeout(() => {
      tryFocusFirst(candidateNodes);
    });
    event.preventDefault();
  }
};

const onPlaced = () => {
  isPositioned.value = true;
};

useFocusGuards();
useHideOthers(contentElement);

watch(isPositioned, () => {
  focusSelectedItem();
});

watchEffect(() => {
  if (!props.bodyLock) return;

  const cleanup = useBodyScrollLock();
  onWatcherCleanup(cleanup);
});

// prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
// and close on `pointerup` outside.
watchEffect(() => {
  if (!contentElement.value) return;
  let pointerMoveDelta = { x: 0, y: 0 };

  const onPointerMove = (event: PointerEvent) => {
    const { x, y } = triggerPointerDownPosition.value ?? { x: 0, y: 0 };

    pointerMoveDelta = {
      x: Math.abs(Math.round(event.pageX) - x),
      y: Math.abs(Math.round(event.pageY) - y)
    };
  };

  const onPointerUp = (event: PointerEvent) => {
    // Prevent options from being un-tappable on touch devices
    // https://github.com/unovue/reka-ui/issues/804
    if (event.pointerType === 'touch') return;

    // If the pointer hasn't moved by a certain threshold then we prevent selecting item on `pointerup`.
    if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
      event.preventDefault();
    }
    // otherwise, if the event was outside the content, close.
    else if (!contentElement.value?.contains(event.target as HTMLElement)) {
      onOpenChange(false);
    }

    document.removeEventListener('pointermove', onPointerMove);
    resetTriggerPointerDownPosition();
  };

  if (triggerPointerDownPosition.value !== null) {
    document.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerup', onPointerUp, {
      capture: true,
      once: true
    });
  }

  onWatcherCleanup(() => {
    document.removeEventListener('pointermove', onPointerMove);
    document.removeEventListener('pointerup', onPointerUp, {
      capture: true
    });
  });
});
</script>

<template>
  <component
    :is="position === 'popper' ? SelectPopperPosition : SelectItemAlignedPosition"
    v-bind="forwardedProps"
    :id="contentId"
    :ref="setContentElement"
    :class="cls"
    role="listbox"
    :data-state="dataState"
    :dir="dir"
    style="display: flex; flex-direction: column; outline: none"
    :style="computedStyle"
    @contextmenu.prevent
    @placed="onPlaced"
    @keydown="onKeyDown"
  >
    <slot />
  </component>
</template>
