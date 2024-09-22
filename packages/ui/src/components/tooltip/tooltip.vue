<script setup lang="ts">
import {
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  useForwardProps,
  useForwardPropsEmits
} from 'radix-vue';
import type { TooltipRootEmits } from 'radix-vue';
import { computedPick } from '../../shared';
import STooltipContent from './tooltip-content.vue';
import STooltipArrow from './tooltip-arrow.vue';
import type { TooltipProps } from './types';

defineOptions({
  name: 'STooltip'
});

const props = withDefaults(defineProps<TooltipProps>(), {
  delayDuration: 200,
  avoidCollisions: true,
  prioritizePosition: true
});

const delegatedRootProps = computedPick(props, [
  'defaultOpen',
  'open',
  'delayDuration',
  'disableHoverableContent',
  'disableClosingTrigger',
  'disabled',
  'ignoreNonKeyboardFocus'
]);

const emit = defineEmits<TooltipRootEmits>();

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);

const delegatedContentProps = computedPick(props, [
  'ariaLabel',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'avoidCollisions',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached'
]);

const contentProps = useForwardProps(delegatedContentProps);
</script>

<template>
  <TooltipProvider>
    <TooltipRoot v-bind="forwarded">
      <TooltipTrigger as-child>
        <slot name="trigger" />
      </TooltipTrigger>
      <TooltipPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
        <STooltipContent :class="contentClass" :force-mount="forceMountContent" v-bind="contentProps">
          <slot />
          <STooltipArrow v-if="showArrow" :class="arrowClass" :width="arrowWidth" :height="arrowHeight" />
        </STooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
