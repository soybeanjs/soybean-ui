<script setup lang="ts">
import { computed } from 'vue';
import type { CSSProperties } from 'vue';
import { popperCssVars } from '../popper-v2/shared';
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardElement } from '../../composables';
import { PopperV2Popup } from '../popper-v2';
import { VisuallyHidden } from '../visually-hidden';
import { tooltipCssVars } from './shared';
import { useTooltipRootContext } from './context';
import type { TooltipPopupProps } from './types';

defineOptions({
  name: 'TooltipPopup'
});

const props = defineProps<TooltipPopupProps>();

const { popupId } = useTooltipRootContext('TooltipPopup');
const { open, wasOpenDelayed } = usePopperV2RootContext('TooltipPopup');

const [popupElement, setPopupElement] = useForwardElement();

const dataState = computed(() => {
  if (!open.value) return 'closed' as const;
  return wasOpenDelayed.value ? ('delayed-open' as const) : ('instant-open' as const);
});

const cssVarsStyle: CSSProperties = {
  [tooltipCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [tooltipCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [tooltipCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [tooltipCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [tooltipCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

const ariaLabel = computed(() => props.ariaLabel ?? popupElement.value?.textContent);
</script>

<template>
  <PopperV2Popup
    :ref="setPopupElement"
    v-bind="props"
    data-soybean-tooltip-popup
    data-dismissable-layer
    :data-state="dataState"
    :style="cssVarsStyle"
  >
    <slot />
    <VisuallyHidden :id="popupId" role="tooltip">
      {{ ariaLabel }}
    </VisuallyHidden>
  </PopperV2Popup>
</template>
