<script setup lang="ts">
import { computed } from 'vue';
import { popperCssVars } from '../popper/shared';
import { useForwardElement } from '../../composables';
import { PopperPopup } from '../popper';
import { VisuallyHidden } from '../visually-hidden';
import { tooltipCssVars } from './shared';
import { useTooltipRootContext } from './context';
import type { TooltipPopupProps } from './types';

defineOptions({
  name: 'TooltipPopup'
});

const props = defineProps<TooltipPopupProps>();

const { popupId, dataState, initPopupId, onPopupElementChange } = useTooltipRootContext('TooltipPopup');
const [popupElement, setPopupElement] = useForwardElement(onPopupElementChange);

const cssVarsStyle = {
  [tooltipCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [tooltipCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [tooltipCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [tooltipCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [tooltipCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

const ariaLabel = computed(() => props.ariaLabel ?? popupElement.value?.textContent);

initPopupId();
</script>

<template>
  <PopperPopup
    :ref="setPopupElement"
    data-soybean-tooltip-popup
    data-dismissable-layer
    :data-state="dataState"
    :style="cssVarsStyle"
  >
    <slot />
    <VisuallyHidden :id="popupId" role="tooltip">
      {{ ariaLabel }}
    </VisuallyHidden>
  </PopperPopup>
</template>
