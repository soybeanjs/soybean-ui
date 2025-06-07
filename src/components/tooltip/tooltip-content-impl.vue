<script setup lang="ts">
import { computed, onWatcherCleanup, useAttrs, useSlots, watchPostEffect } from 'vue';
import { PopperContent, PopperContentWrapper } from '../popper';
import { useDismissableLayer, useForwardElement, useGraceArea } from '../../composables';
import { getAriaLabelByVNodeList, omit } from '../../shared';
import { popperCssVars } from '../popper/shared';
import { VisuallyHidden } from '../visually-hidden';
import { useTooltipProviderContext, useTooltipRootContext } from './context';
import { TOOLTIP_OPEN, tooltipCssVars } from './shared';
import type { TooltipContentImplEmits, TooltipContentImplProps } from './types';

defineOptions({
  name: 'TooltipContentImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipContentImplProps>(), {
  side: 'top'
});

const emit = defineEmits<TooltipContentImplEmits>();

const attrs = useAttrs();

const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());

const { isPointerInTransitRef } = useTooltipProviderContext('TooltipContentImpl');
const {
  contentId,
  onContentElementChange,
  triggerElement,
  dataState,
  disableClosingTrigger,
  disableHoverableContent,
  onClose
} = useTooltipRootContext('TooltipContentImpl');

const [wrapperElement, setWrapperElement] = useForwardElement();
const [contentElement, setContentElement] = useForwardElement(onContentElementChange);

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

const { computedStyle, layerProps } = useDismissableLayer(wrapperElement, {
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
  ...attrs,
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

watchPostEffect(() => {
  const handleScroll = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target?.contains(triggerElement.value!)) {
      onClose();
    }
  };

  window.addEventListener('scroll', handleScroll);
  window.addEventListener(TOOLTIP_OPEN, onClose);
  onWatcherCleanup(() => {
    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener(TOOLTIP_OPEN, onClose);
  });
});
</script>

<template>
  <PopperContentWrapper :ref="setWrapperElement">
    <PopperContent v-bind="forwardedProps" :ref="setContentElement" :data-state="dataState" :style="style">
      <slot />
      <VisuallyHidden :id="contentId" role="tooltip">
        {{ ariaLabel }}
      </VisuallyHidden>
    </PopperContent>
  </PopperContentWrapper>
</template>
