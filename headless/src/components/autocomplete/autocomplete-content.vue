<script setup lang="ts">
import { useForwardElement, useOmitProps } from '../../composables';
import { PopperPopup } from '../popper';
import { usePopoverRootContext } from '../popover/context';
import { PopoverPositioner } from '../popover';
import { useAutocompleteRootContext, useAutocompleteUi } from './context';
import type { AutocompleteContentProps } from './types';

defineOptions({
  name: 'AutocompleteContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<AutocompleteContentProps>(), {
  avoidCollisions: true,
  side: 'bottom',
  sideOffset: 4
});

const forwardedProps = useOmitProps(props, ['forceMount']);

const cls = useAutocompleteUi('content');

const { dataState, onPopupElementChange } = usePopoverRootContext('AutocompleteContent');
const { inputElement } = useAutocompleteRootContext('AutocompleteContent');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const onCloseAutoFocus = (event: Event) => {
  event.preventDefault();
  inputElement.value?.focus();
};
</script>

<template>
  <PopoverPositioner v-bind="forwardedProps" :force-mount="forceMount" @close-auto-focus="onCloseAutoFocus">
    <PopperPopup :ref="setPopupElement" :class="cls" :data-state="dataState">
      <slot />
    </PopperPopup>
  </PopoverPositioner>
</template>
