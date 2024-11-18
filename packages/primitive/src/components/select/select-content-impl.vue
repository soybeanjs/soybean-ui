<script setup lang="ts">
import type { ComponentPublicInstance, Ref } from 'vue';
import { computed, ref, watch, watchEffect } from 'vue';
import { unrefElement } from '@vueuse/core';
import type { PopperContentProps } from '../popper';
import type { PointerDownOutsideEvent } from '../dismissable-layer';
import { createContext, useFocusGuards, useForwardProps, useHideOthers, useTypeAhead } from '../../composables';
import { useBodyScrollLock } from '../../composables/use-body-scroll-lock';
import type { AcceptableValue } from '../../composables/types';
import { useCollection } from '../collection';
import { FocusScope } from '../focus-scope';
import { DismissableLayer } from '../dismissable-layer';
import { focusFirst } from '../menu/shared';
import { valueComparator } from './utils';

import { injectSelectRootContext } from './select-root.vue';
import SelectItemAlignedPosition from './select-item-aligned-position.vue';
import SelectPopperPosition from './select-popper-position.vue';

export interface SelectContentContext {
  content?: Ref<HTMLElement | undefined>;
  viewport?: Ref<HTMLElement | undefined>;
  onViewportChange: (node: HTMLElement | undefined) => void;
  itemRefCallback: (node: HTMLElement | undefined, value: AcceptableValue, disabled: boolean) => void;
  selectedItem?: Ref<HTMLElement | undefined>;
  onItemLeave?: () => void;
  itemTextRefCallback: (node: HTMLElement | undefined, value: AcceptableValue, disabled: boolean) => void;
  focusSelectedItem?: () => void;
  selectedItemText?: Ref<HTMLElement | undefined>;
  position?: 'item-aligned' | 'popper';
  isPositioned?: Ref<boolean>;
  searchRef?: Ref<string>;
}

export const SelectContentDefaultContextValue: SelectContentContext = {
  onViewportChange: () => {},
  itemTextRefCallback: () => {},
  itemRefCallback: () => {}
};

export type SelectContentImplEmits = {
  closeAutoFocus: [event: Event];
  /** Event handler called when the escape key is down. Can be prevented. */
  escapeKeyDown: [event: KeyboardEvent];
  /** Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`. Can be prevented. */
  pointerDownOutside: [event: PointerDownOutsideEvent];
};

export interface SelectContentImplProps extends PopperContentProps {
  /**
   * The positioning mode to use
   *
   * `item-aligned (default)` - behaves similarly to a native MacOS menu by positioning content relative to the active
   * item. <br> `popper` - positions content in the same way as our other primitives, for example `Popover` or
   * `DropdownMenu`.
   */
  position?: 'item-aligned' | 'popper';
  /**
   * The document.body will be lock, and scrolling will be disabled.
   *
   * @defaultValue true
   */
  bodyLock?: boolean;
}

export const [injectSelectContentContext, provideSelectContentContext] =
  createContext<SelectContentContext>('SelectContent');

const props = withDefaults(defineProps<SelectContentImplProps>(), {
  align: 'start',
  position: 'item-aligned',
  bodyLock: true
});
const emit = defineEmits<SelectContentImplEmits>();

const rootContext = injectSelectRootContext();

useFocusGuards();
useBodyScrollLock(props.bodyLock);
const { CollectionSlot, getItems } = useCollection();

const content = ref<HTMLElement>();
useHideOthers(content);

const { search, handleTypeaheadSearch } = useTypeAhead();

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
    } else {
      // otherwise, if the event was outside the content, close.
      if (!content.value?.contains(event.target as HTMLElement)) onOpenChange(false);
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
