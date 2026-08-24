<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { popperCssVars } from '../popper-v2/shared';
import { PopperV2Popup } from '../popper-v2';
import { popoverCssVars } from './shared';
import type { PopoverPopupProps } from './types';

defineOptions({
  name: 'PopoverPopup'
});

const props = defineProps<PopoverPopupProps>();

const cssVarsStyle: CSSProperties = {
  [popoverCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [popoverCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [popoverCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [popoverCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [popoverCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};
</script>

<template>
  <PopperV2Popup v-bind="props" data-soybean-popover-popup role="dialog" :style="cssVarsStyle">
    <slot />
  </PopperV2Popup>
</template>
