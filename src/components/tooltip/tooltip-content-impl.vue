<script setup lang="ts">
import { computed, onWatcherCleanup, useSlots, watchPostEffect } from 'vue';
import { useDismissableLayer, useForwardElement, useGraceArea, useOmitProps } from '../../composables';
import { getAriaLabelByVNodeList } from '../../shared';
import { PopperContent } from '../popper';
import { popperCssVars } from '../popper/shared';
import { VisuallyHidden } from '../visually-hidden';
import { useTooltipProviderContext, useTooltipRootContext } from './context';
import { TOOLTIP_OPEN, tooltipCssVars } from './shared';
import type { TooltipContentImplEmits, TooltipContentImplProps } from './types';

defineOptions({
  name: 'TooltipContentImpl'
});

const props = withDefaults(defineProps<TooltipContentImplProps>(), {
  side: 'top',
  sideOffset: 0,
  align: 'center',
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  arrowPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false
});

const emit = defineEmits<TooltipContentImplEmits>();

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

const [_, setFloatingElement] = useForwardElement(props.floatingRef);
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

const forwardedProps = useOmitProps(props, ['ariaLabel'], layerProps);

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
  <PopperContent
    v-bind="forwardedProps"
    :ref="setContentElement"
    :floating-ref="setFloatingElement"
    :data-state="dataState"
    :style="style"
  >
    <slot />
    <VisuallyHidden :id="contentId" role="tooltip">
      {{ ariaLabel }}
    </VisuallyHidden>
  </PopperContent>
</template>
