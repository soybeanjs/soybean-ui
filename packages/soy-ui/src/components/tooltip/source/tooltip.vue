<script setup lang="ts">
import {
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { TooltipEmits, TooltipProps } from '../types';
import STooltipContent from './tooltip-content.vue';
import STooltipArrow from './tooltip-arrow.vue';

defineOptions({
  name: 'STooltip'
});

const {
  class: cls,
  delayDuration = 200,
  avoidCollisions = true,
  content,
  ...delegatedProps
} = defineProps<TooltipProps>();

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
      <TooltipPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
        <STooltipContent
          v-bind="forwardedContentProps"
          :class="cls || ui?.content"
          :size="size"
          :avoid-collisions="avoidCollisions"
          :force-mount="forceMountContent"
          @escape-key-down="emit('escapeKeyDown', $event)"
          @pointer-down-outside="emit('pointerDownOutside', $event)"
        >
          <slot>{{ content }}</slot>
          <STooltipArrow
            v-if="showArrow"
            :class="ui?.arrow"
            :size="size"
            :width="arrowWidth"
            :height="arrowHeight"
            :rounded="arrowRounded"
          />
        </STooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
