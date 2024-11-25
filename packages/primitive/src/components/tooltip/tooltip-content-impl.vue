<script setup lang="ts">
import { Comment, computed, onMounted, useSlots } from 'vue';
import type { VNode } from 'vue';
import { useEventListener } from '@vueuse/core';
import { PopperContent } from '../popper';
import { VisuallyHidden } from '../visually-hidden';
import { DismissableLayer } from '../dismissable-layer';
import { useForwardExpose } from '../../composables';
import { injectTooltipRootContext } from './context';
import { TOOLTIP_OPEN } from './shared';
import type { TooltipContentEmits, TooltipContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'TooltipContentImpl',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TooltipContentPropsWithPrimitive>(), {
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

const emit = defineEmits<TooltipContentEmits>();

const rootContext = injectTooltipRootContext();

const { forwardRef } = useForwardExpose();
const slots = useSlots();
const defaultSlot = computed(() => slots.default?.());
const ariaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel;
  let content = '';

  function recursiveTextSearch(node: VNode) {
    if (typeof node.children === 'string' && node.type !== Comment) content += node.children;
    else if (Array.isArray(node.children)) node.children.forEach(child => recursiveTextSearch(child as VNode));
  }

  defaultSlot.value?.forEach(node => recursiveTextSearch(node));
  return content;
});

const popperContentProps = computed(() => {
  const { ariaLabel: _, ...restProps } = props;
  return restProps;
});

onMounted(() => {
  // Close the tooltip if the trigger is scrolled
  useEventListener(window, 'scroll', event => {
    const target = event.target as HTMLElement;
    if (target?.contains(rootContext.trigger.value!)) rootContext.onClose();
  });
  // Close this tooltip if another one opens
  useEventListener(window, TOOLTIP_OPEN, rootContext.onClose);
});
</script>

<template>
  <DismissableLayer
    as-child
    :disable-outside-pointer-events="false"
    @escape-key-down="emit('escapeKeyDown', $event)"
    @pointer-down-outside="
      event => {
        if (rootContext.disableClosingTrigger.value && rootContext.trigger.value?.contains(event.target as HTMLElement))
          event.preventDefault();

        emit('pointerDownOutside', event);
      }
    "
    @focus-outside.prevent
    @dismiss="rootContext.onClose()"
  >
    <PopperContent
      :ref="forwardRef"
      :data-state="rootContext.stateAttribute.value"
      v-bind="{ ...$attrs, ...popperContentProps }"
      :style="{
        '--soybean-tooltip-content-transform-origin': 'var(--soybean-popper-transform-origin)',
        '--soybean-tooltip-content-available-width': 'var(--soybean-popper-available-width)',
        '--soybean-tooltip-content-available-height': 'var(--soybean-popper-available-height)',
        '--soybean-tooltip-trigger-width': 'var(--soybean-popper-anchor-width)',
        '--soybean-tooltip-trigger-height': 'var(--soybean-popper-anchor-height)'
      }"
    >
      <slot />
      <VisuallyHidden :id="rootContext.contentId" role="tooltip">
        {{ ariaLabel }}
      </VisuallyHidden>
    </PopperContent>
  </DismissableLayer>
</template>
