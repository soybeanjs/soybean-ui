<script setup lang="ts">
import { TooltipPortal, TooltipProvider, TooltipRoot, TooltipTrigger, useForwardProps } from 'radix-vue';
import { computedPick } from '../../shared';
import STooltipContent from './tooltip-content.vue';
import STooltipArrow from './tooltip-arrow.vue';
import type { TooltipEmits, TooltipProps } from './types';

defineOptions({
  name: 'STooltip'
});

const { delayDuration = 200, avoidCollisions = true, ...delegatedProps } = defineProps<TooltipProps>();

const emit = defineEmits<TooltipEmits>();

const delegatedRootProps = computedPick(delegatedProps, [
  'defaultOpen',
  'open',
  'disableHoverableContent',
  'disableClosingTrigger',
  'disabled',
  'ignoreNonKeyboardFocus'
]);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedPick(delegatedProps, [
  'ariaLabel',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached'
]);

const forwardedContentProps = useForwardProps(delegatedContentProps);
</script>

<template>
  <TooltipProvider>
    <TooltipRoot v-bind="forwardedRootProps" :delay-duration @update:open="emit('update:open', $event)">
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal">
        <STooltipContent
          v-bind="forwardedContentProps"
          :class="contentClass"
          :avoid-collisions
          :force-mount="forceMountContent"
          @escape-key-down="emit('escapeKeyDown', $event)"
          @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
          <slot />
          <STooltipArrow v-if="showArrow" :class="arrowClass" :width="arrowWidth" :height="arrowHeight" />
        </STooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
