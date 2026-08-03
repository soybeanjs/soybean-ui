<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { popperCssVars } from '../popper/shared';
import { useForwardElement, useOmitProps } from '../../composables';
import { PopperPopup } from '../popper';
import { popoverCssVars } from './shared';
import { usePopoverRootContext } from './context';
import type { PopoverPopupProps } from './types';

defineOptions({
  name: 'PopoverPopup'
});

const props = defineProps<PopoverPopupProps>();

const { dataState, triggerId, popupId, initPopupId, onPopupElementChange } = usePopoverRootContext('PopoverPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const cssVarsStyle: CSSProperties = {
  [popoverCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [popoverCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [popoverCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [popoverCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [popoverCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

initPopupId();

const popupAttrs = useOmitProps(props, [
  'class',
  'id',
  'style',
  'aria-labelledby',
  'data-state',
  'data-dismissable-layer',
  'data-soybean-popover-popup',
  'role',
  'tabindex'
]);
</script>

<template>
  <PopperPopup
    v-bind="popupAttrs"
    :id="popupId"
    :ref="setPopupElement"
    data-soybean-popover-popup
    :aria-labelledby="triggerId"
    data-dismissable-layer
    :data-state="dataState"
    role="dialog"
    tabindex="-1"
    :style="cssVarsStyle"
  >
    <slot />
  </PopperPopup>
</template>
