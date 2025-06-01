<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { PopperContent } from '../popper';
import { useDismissableLayer, useGraceArea } from '../../composables';
import { getAriaLabelByVNodeList, omit } from '../../shared';
import { popperCssVars } from '../popper/shared';
import { VisuallyHidden } from '../visually-hidden';
import { useTooltipProviderContext, useTooltipRootContext } from './context';
import { tooltipCssVars } from './shared';
import type { TooltipContentImplEmits, TooltipContentImplProps } from './types';

defineOptions({
  name: 'TooltipContentImpl'
});

const props = withDefaults(defineProps<TooltipContentImplProps>(), {
  side: 'top'
});

const emit = defineEmits<TooltipContentImplEmits>();

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const { isPointerInTransitRef } = useTooltipProviderContext('TooltipContentImpl');
const {
  contentId,
  contentElement,
  setContentElement,
  triggerElement,
  dataState,
  disableClosingTrigger,
  disableHoverableContent,
  onClose
} = useTooltipRootContext('TooltipContentImpl');

useGraceArea({
  triggerElement,
  contentElement,
  onPointerInTransitChange: v => {
    isPointerInTransitRef.value = v;
  },
  onPointerExit: () => {
    onClose();
  },
  disabled: disableHoverableContent
});

const { computedStyle, layerProps } = useDismissableLayer(contentElement, {
  disableOutsidePointerEvents: false,
  onEscapeKeyDown: event => {
    emit('escapeKeyDown', event);
  },
  onPointerDownOutside: event => {
    if (disableClosingTrigger.value && triggerElement.value?.contains(event.target as HTMLElement)) {
      event.preventDefault();
    }
    emit('pointerDownOutside', event);
  },
  onFocusOutside: event => {
    event.preventDefault();
  },
  onDismiss: () => {
    onClose();
  }
});

const forwardedProps = computed(() => ({
  ...omit(props, ['ariaLabel']),
  ...layerProps
}));

const cssVarsStyle = {
  [tooltipCssVars.transformOrigin]: `var(${popperCssVars.transformOrigin})`,
  [tooltipCssVars.availableWidth]: `var(${popperCssVars.availableWidth})`,
  [tooltipCssVars.availableHeight]: `var(${popperCssVars.availableHeight})`,
  [tooltipCssVars.anchorWidth]: `var(${popperCssVars.anchorWidth})`,
  [tooltipCssVars.anchorHeight]: `var(${popperCssVars.anchorHeight})`
};

const style = computed(() => ({
  ...cssVarsStyle,
  ...computedStyle.value
}));

const ariaLabel = computed(() => {
  if (props.ariaLabel) {
    return props.ariaLabel;
  }

  return getAriaLabelByVNodeList(defaultSlot.value);
});
</script>

<template>
  <PopperContent v-bind="forwardedProps" :ref="setContentElement" :data-state="dataState" :style="style">
    <slot />
    <VisuallyHidden :id="contentId" role="tooltip">
      {{ ariaLabel }}
    </VisuallyHidden>
  </PopperContent>
</template>
