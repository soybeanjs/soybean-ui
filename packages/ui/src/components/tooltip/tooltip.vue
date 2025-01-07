<script setup lang="ts">
import {
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  usePickForwardProps
} from '@soybean-ui/primitives';
import STooltipContent from './tooltip-content.vue';
import STooltipArrow from './tooltip-arrow.vue';
import type { TooltipEmits, TooltipProps } from './types';

defineOptions({
  name: 'STooltip'
});

const { delayDuration = 200, avoidCollisions = true, ...delegatedProps } = defineProps<TooltipProps>();

const emit = defineEmits<TooltipEmits>();

const forwardedRootProps = usePickForwardProps(delegatedProps, [
  'defaultOpen',
  'open',
  'disableHoverableContent',
  'disableClosingTrigger',
  'disabled',
  'ignoreNonKeyboardFocus'
]);

const forwardedContentProps = usePickForwardProps(delegatedProps, [
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
</script>

<template>
  <TooltipProvider>
    <TooltipRoot v-bind="forwardedRootProps" :delay-duration="delayDuration" @update:open="emit('update:open', $event)">
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal">
        <STooltipContent
          v-bind="forwardedContentProps"
          :class="contentClass"
          :avoid-collisions="avoidCollisions"
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
