<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement } from '../../composables';
import { PopperPopup } from '../popper';
import { popperCssVars } from '../popper/shared';
import { usePopoverPositionerContext, usePopoverRootContext } from './context';
import { popoverCssVars } from './shared';
import type { PopoverPopupProps } from './types';

defineOptions({
  name: 'PopoverPopup'
});

defineProps<PopoverPopupProps>();

const { dataState, triggerId, popupId, initPopupId, onPopupElementChange } = usePopoverRootContext('PopoverPopup');
const { pointerEvents } = usePopoverPositionerContext('PopoverPopup');

const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const cssVarsStyle: CSSProperties = {
  [popoverCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [popoverCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [popoverCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [popoverCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [popoverCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

const style = computed<CSSProperties>(() => ({
  ...cssVarsStyle,
  pointerEvents: pointerEvents.value
}));

initPopupId();
</script>

<template>
  <PopperPopup
    :id="popupId"
    :ref="setPopupElement"
    :aria-labelledby="triggerId"
    data-dismissable-layer
    :data-state="dataState"
    role="dialog"
    tabindex="-1"
    :style="style"
  >
    <slot />
  </PopperPopup>
</template>
