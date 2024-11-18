<script setup lang="ts">
import type { VNode } from 'vue';
import { Comment, computed, onMounted, useSlots } from 'vue';
import { useEventListener } from '@vueuse/core';
import type { PrimitiveProps } from '../primitive/types';
import type { PopperContentProps } from '../popper';
import { PopperContent } from '../popper';
import { VisuallyHidden } from '../visually-hidden';
import { DismissableLayer } from '../dismissable-layer';
import { useForwardExpose } from '../../composables';

import { TOOLTIP_OPEN } from './utils';
import { injectTooltipRootContext } from './tooltip-root.vue';

export type TooltipContentImplEmits = {
  /**
   * Event handler called when focus moves to the destructive action after opening. It can be prevented by calling
   * `event.preventDefault`
   */
  escapeKeyDown: [event: KeyboardEvent];
  /**
   * Event handler called when a pointer event occurs outside the bounds of the component. It can be prevented by
   * calling `event.preventDefault`.
   */
  pointerDownOutside: [event: Event];
};

export interface TooltipContentImplProps
  extends PrimitiveProps,
    Pick<
      PopperContentProps,
      | 'side'
      | 'sideOffset'
      | 'align'
      | 'alignOffset'
      | 'avoidCollisions'
      | 'collisionBoundary'
      | 'collisionPadding'
      | 'arrowPadding'
      | 'sticky'
      | 'hideWhenDetached'
    > {
  /**
   * By default, screenreaders will announce the content inside the component. If this is not descriptive enough, or you
   * have content that cannot be announced, use aria-label as a more descriptive label.
   *
   * @defaultValue String
   */
  ariaLabel?: string;
}

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

const rootContext = injectTooltipRootContext();

const { forwardRef } = useForwardExpose();
const slot = useSlots();
const defaultSlot = computed(() => slot.default?.());
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
