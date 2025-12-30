<script setup lang="ts">
import { computed, useSlots } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement } from '../../composables';
import { getAriaLabelByVNodeList } from '../../shared';
import { PopperPopup } from '../popper';
import { popperCssVars } from '../popper/shared';
import { VisuallyHidden } from '../visually-hidden';
import { useTooltipPositionerContext, useTooltipRootContext } from './context';
import { tooltipCssVars } from './shared';
import type { TooltipPopupProps } from './types';

defineOptions({
  name: 'TooltipPopup'
});

const props = defineProps<TooltipPopupProps>();

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const { popupId, dataState, initPopupId, onPopupElementChange } = useTooltipRootContext('TooltipPopup');
const { pointerEvents } = useTooltipPositionerContext('TooltipPopup');
const [, setPopupElement] = useForwardElement(onPopupElementChange);

const cssVarsStyle = {
  [tooltipCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [tooltipCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [tooltipCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [tooltipCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [tooltipCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

const style = computed<CSSProperties>(() => ({
  ...cssVarsStyle,
  pointerEvents: pointerEvents.value
}));

const ariaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel;
  }

  return getAriaLabelByVNodeList(defaultSlot.value);
});

initPopupId();
</script>

<template>
  <PopperPopup :ref="setPopupElement" data-dismissable-layer :data-state="dataState" :style="style">
    <slot />
    <VisuallyHidden :id="popupId" role="tooltip">
      {{ ariaLabel }}
    </VisuallyHidden>
  </PopperPopup>
</template>
