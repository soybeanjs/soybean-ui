<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useForwardElement } from '../../composables';
import { PopperPopup } from '../popper';
import { popperCssVars } from '../popper/shared';
import { useSelectPopupElementContext } from './context';
import { selectCssVars } from './shared';
import type { SelectPopupProps } from './types';

defineOptions({
  name: 'SelectPopperPopup'
});

defineProps<SelectPopupProps>();

const { onPopupElementChange } = useSelectPopupElementContext('SelectPopperPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const style: CSSProperties = {
  boxSizing: 'border-box',
  [selectCssVars.contentTransformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [selectCssVars.contentAvailableWidth]: `var(${popperCssVars.availableWidth})`,
  [selectCssVars.contentAvailableHeight]: `var(${popperCssVars.availableHeight})`,
  [selectCssVars.triggerWidth]: `var(${popperCssVars.anchorWidth})`,
  [selectCssVars.triggerHeight]: `var(${popperCssVars.anchorHeight})`
};
</script>

<template>
  <PopperPopup :ref="setPopupElement" :style="style">
    <slot />
  </PopperPopup>
</template>
