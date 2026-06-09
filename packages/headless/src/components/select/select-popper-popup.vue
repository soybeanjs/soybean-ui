<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { popperCssVars } from '../popper/shared';
import { useForwardElement } from '../../composables';
import { PopperPopup } from '../popper';
import { selectCssVars } from './shared';
import { useSelectPopupElementContext } from './context';
import type { SelectPopupProps } from './types';

defineOptions({
  name: 'SelectPopperPopup'
});

defineProps<SelectPopupProps>();

const { onPopupElementChange } = useSelectPopupElementContext('SelectPopperPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const style: CSSProperties = {
  boxSizing: 'border-box',
  [selectCssVars.popupTransformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [selectCssVars.popupAvailableWidth]: `var(${popperCssVars.availableWidth})`,
  [selectCssVars.popupAvailableHeight]: `var(${popperCssVars.availableHeight})`,
  [selectCssVars.triggerWidth]: `var(${popperCssVars.anchorWidth})`,
  [selectCssVars.triggerHeight]: `var(${popperCssVars.anchorHeight})`
};
</script>

<template>
  <PopperPopup :ref="setPopupElement" data-soybean-select-popper-popup :style="style">
    <slot />
  </PopperPopup>
</template>
