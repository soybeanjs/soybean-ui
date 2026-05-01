<script setup lang="ts">
import { computed, onMounted, onUnmounted, onWatcherCleanup, ref, useAttrs, watchEffect } from 'vue';
import type { CSSProperties } from 'vue';
import {
  useBodyScrollLock,
  useDismissableLayer,
  useExposedElement,
  useFocusGuards,
  useFocusScope,
  useHideOthers,
  useOmitProps
} from '../../composables';
import { PopperPopup, PopperPositioner } from '../popper';
import { popperCssVars } from '../popper/shared';
import { Primitive } from '../primitive';
import { provideComboboxContentContext, useComboboxRootContext } from './context';
import type { ComboboxContentImplEmits, ComboboxContentImplProps } from './types';

defineOptions({
  name: 'ComboboxContentImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ComboboxContentImplProps>(), {
  position: 'popper'
});

const emit = defineEmits<ComboboxContentImplEmits>();

const attrs = useAttrs();

const {
  contentId,
  open,
  ignoreFilter,
  allItems,
  filterState,
  parentElement,
  inputElement,
  triggerElement,
  onOpenChange,
  onPopupElementChange
} = useComboboxRootContext('ComboboxContentImpl');

const [contentElement, setContentElement] = useExposedElement(onPopupElementChange);

const { pointerEvents } = useDismissableLayer(contentElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    if (parentElement.value?.contains(event.target as Node)) {
      event.preventDefault();
    }

    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    if (parentElement.value?.contains(event.target as Node)) {
      event.preventDefault();
    }

    emit('focusOutside', event);
  },
  onInteractOutside: event => {
    emit('interactOutside', event);
  },
  onDismiss: () => {
    onOpenChange(false);
  }
});

const { onKeydown } = useFocusScope(contentElement, {
  trapped: () => props.trapFocus,
  loop: true,
  onOpenAutoFocus: event => {
    emit('openAutoFocus', event);
    event.preventDefault();
  },
  onCloseAutoFocus: event => {
    emit('closeAutoFocus', event);
    event.preventDefault();
  }
});

const position = computed(() => props.position);

const positionerProps = useOmitProps(props, [
  'bodyLock',
  'disableOutsidePointerEvents',
  'forceMount',
  'hideWhenEmpty',
  'popupProps',
  'position',
  'trapFocus'
]);

const popupProps = computed(() => ({
  ...attrs,
  ...props.popupProps
}));

const isEmpty = computed(() => {
  if (ignoreFilter.value) {
    return allItems.value.size === 0;
  }

  return filterState.value.count === 0;
});

const popupStyle = computed<CSSProperties>(() => ({
  pointerEvents: pointerEvents.value,
  display: props.hideWhenEmpty && isEmpty.value ? 'none' : 'flex',
  flexDirection: 'column',
  outline: 'none',
  ...(position.value === 'popper'
    ? {
        ['--soybean-combobox-content-transform-origin']: `var(${popperCssVars.transformOrigin})`,
        ['--soybean-combobox-content-available-width']: `var(${popperCssVars.availableWidth})`,
        ['--soybean-combobox-content-available-height']: `var(${popperCssVars.availableHeight})`,
        ['--soybean-combobox-trigger-width']: `var(${popperCssVars.anchorWidth})`,
        ['--soybean-combobox-trigger-height']: `var(${popperCssVars.anchorHeight})`,
        boxSizing: 'border-box'
      }
    : {})
}));

provideComboboxContentContext({
  position
});

useFocusGuards();
useHideOthers(() => [parentElement.value, contentElement.value], open);

watchEffect(() => {
  if (!props.bodyLock) {
    return;
  }

  const cleanup = useBodyScrollLock();

  onWatcherCleanup(cleanup);
});

const isInputWithinContent = ref(false);

onMounted(() => {
  if (inputElement.value && contentElement.value) {
    isInputWithinContent.value = contentElement.value.contains(inputElement.value);

    if (isInputWithinContent.value) {
      inputElement.value.focus();
    }
  }
});

onUnmounted(() => {
  const activeElement = document.activeElement;

  if (isInputWithinContent.value && (!activeElement || activeElement === document.body)) {
    triggerElement.value?.focus();
  }
});
</script>

<template>
  <PopperPositioner v-if="position === 'popper'" v-bind="positionerProps" @placed="emit('placed')">
    <PopperPopup
      :id="contentId"
      :ref="setContentElement"
      v-bind="popupProps"
      data-slot="popup"
      data-dismissable-layer
      :data-state="open ? 'open' : 'closed'"
      :data-empty="isEmpty ? '' : undefined"
      :style="popupStyle"
      @keydown="onKeydown"
    >
      <slot />
    </PopperPopup>
  </PopperPositioner>
  <Primitive
    v-else
    :id="contentId"
    :ref="setContentElement"
    v-bind="popupProps"
    as="div"
    data-slot="popup"
    data-dismissable-layer
    :data-state="open ? 'open' : 'closed'"
    :data-empty="isEmpty ? '' : undefined"
    :style="popupStyle"
    @keydown="onKeydown"
  >
    <slot />
  </Primitive>
</template>
