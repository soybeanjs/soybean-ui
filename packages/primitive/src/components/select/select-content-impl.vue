<script setup lang="ts">
import { computed, ref, watch, watchEffect } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import { unrefElement } from '@vueuse/core';
import {
  useBodyScrollLock,
  useCollection,
  useFocusGuards,
  useForwardProps,
  useHideOthers,
  useTypeahead
} from '../../composables';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { focusFirst } from '../menu/shared';
import { injectSelectRootContext, provideSelectContentContext } from './context';
import { valueComparator } from './shared';
import SelectItemAlignedPosition from './select-item-aligned-position.vue';
import SelectPopperPosition from './select-popper-position.vue';
import type { SelectContentEmits, SelectContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectContentImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectContentPropsWithPrimitive>(), {
  align: 'start',
  position: 'item-aligned',
  bodyLock: true
});

const emit = defineEmits<SelectContentEmits>();

const rootContext = injectSelectRootContext();

useFocusGuards();
useBodyScrollLock(props.bodyLock);
const { CollectionSlot, getItems } = useCollection();

const content = ref<HTMLElement>();
useHideOthers(content);

const { search, handleTypeaheadSearch } = useTypeahead();

const viewport = ref<HTMLElement>();
const selectedItem = ref<HTMLElement>();
const selectedItemText = ref<HTMLElement>();
const isPositioned = ref(false);
const firstValidItemFoundRef = ref(false);

function refTrigger(vnode: ComponentPublicInstance) {
  content.value = unrefElement(vnode) as HTMLElement;
  return undefined;
}

function focusSelectedItem() {
  if (selectedItem.value && content.value) focusFirst([selectedItem.value, content.value]);
}

watch(isPositioned, () => {
  focusSelectedItem();
});

// prevent selecting items on `pointerup` in some cases after opening from `pointerdown`
// and close on `pointerup` outside.
const { onOpenChange, triggerPointerDownPosRef } = rootContext;
watchEffect(cleanupFn => {
  if (!content.value) return;
  let pointerMoveDelta = { x: 0, y: 0 };

  const handlePointerMove = (event: PointerEvent) => {
    pointerMoveDelta = {
      x: Math.abs(Math.round(event.pageX) - (triggerPointerDownPosRef.value?.x ?? 0)),
      y: Math.abs(Math.round(event.pageY) - (triggerPointerDownPosRef.value?.y ?? 0))
    };
  };
  const handlePointerUp = (event: PointerEvent) => {
    // Prevent options from being untappable on touch devices
    // https://github.com/unovue/soybean-ui/issues/804
    if (event.pointerType === 'touch') return;

    // If the pointer hasn't moved by a certain threshold then we prevent selecting item on `pointerup`.
    if (pointerMoveDelta.x <= 10 && pointerMoveDelta.y <= 10) {
      event.preventDefault();
    }
    // otherwise, if the event was outside the content, close.
    else if (!content.value?.contains(event.target as HTMLElement)) {
      onOpenChange(false);
    }

    document.removeEventListener('pointermove', handlePointerMove);
    triggerPointerDownPosRef.value = null;
  };

  if (triggerPointerDownPosRef.value !== null) {
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp, {
      capture: true,
      once: true
    });
  }

  cleanupFn(() => {
    document.removeEventListener('pointermove', handlePointerMove);
    document.removeEventListener('pointerup', handlePointerUp, {
      capture: true
    });
  });
});

function handleKeyDown(event: KeyboardEvent) {
  const isModifierKey = event.ctrlKey || event.altKey || event.metaKey;

  // select should not be navigated using tab key so we prevent it
  if (event.key === 'Tab') event.preventDefault();

  const collectionItems = getItems().map(i => i.ref);
  if (!isModifierKey && event.key.length === 1) handleTypeaheadSearch(event.key, collectionItems);

  if (['ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
    let candidateNodes = [...collectionItems];

    if (['ArrowUp', 'End'].includes(event.key)) candidateNodes = candidateNodes.slice().reverse();

    if (['ArrowUp', 'ArrowDown'].includes(event.key)) {
      const currentElement = event.target as HTMLElement;
      const currentIndex = candidateNodes.indexOf(currentElement);
      candidateNodes = candidateNodes.slice(currentIndex + 1);
    }
    setTimeout(() => focusFirst(candidateNodes));
    event.preventDefault();
  }
}

const pickedProps = computed(() => {
  if (props.position === 'popper') return props;
  return {};
});

const forwardedProps = useForwardProps(pickedProps.value);

provideSelectContentContext({
  content,
  viewport,
  onViewportChange: node => {
    viewport.value = node;
  },
  itemRefCallback: (node, value, disabled) => {
    const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
    const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);

    if (isFirstValidItem) {
      if (rootContext.isEmptyModelValue.value) {
        firstValidItemFoundRef.value = true;
        selectedItem.value = node;
      } else if (isSelectedItem) {
        firstValidItemFoundRef.value = true;
        selectedItem.value = node;
      }
    }
  },
  selectedItem,
  selectedItemText,
  onItemLeave: () => {
    content.value?.focus();
  },
  itemTextRefCallback: (node, value, disabled) => {
    const isFirstValidItem = !firstValidItemFoundRef.value && !disabled;
    const isSelectedItem = valueComparator(rootContext.modelValue.value, value, rootContext.by);

    if (isSelectedItem || isFirstValidItem) selectedItemText.value = node;
  },
  focusSelectedItem,
  position: props.position,
  isPositioned,
  searchRef: search
});
</script>

<template>
  <CollectionSlot>
    <FocusScope
      as-child
      @mount-auto-focus.prevent
      @unmount-auto-focus="
        event => {
          emit('closeAutoFocus', event);
          if (event.defaultPrevented) return;
          rootContext.triggerElement.value?.focus({ preventScroll: true });
          event.preventDefault();
        }
      "
    >
      <DismissableLayer
        as-child
        disable-outside-pointer-events
        @focus-outside.prevent
        @dismiss="rootContext.onOpenChange(false)"
        @escape-key-down="emit('escapeKeyDown', $event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
      >
        <component
          :is="position === 'popper' ? SelectPopperPosition : SelectItemAlignedPosition"
          v-bind="{ ...$attrs, ...forwardedProps }"
          :id="rootContext.contentId"
          :ref="refTrigger"
          role="listbox"
          :data-state="rootContext.open.value ? 'open' : 'closed'"
          :dir="rootContext.dir.value"
          :style="{
            // flex layout so we can place the scroll buttons properly
            display: 'flex',
            flexDirection: 'column',
            // reset the outline by default as the content MAY get focused
            outline: 'none'
          }"
          @contextmenu.prevent
          @placed="isPositioned = true"
          @keydown="handleKeyDown as any"
        >
          <slot />
        </component>
      </DismissableLayer>
    </FocusScope>
  </CollectionSlot>
</template>
