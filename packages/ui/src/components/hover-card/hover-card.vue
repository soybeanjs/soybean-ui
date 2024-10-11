<script setup lang="ts">
import { HoverCardPortal, HoverCardRoot, HoverCardTrigger, useForwardProps, useForwardPropsEmits } from 'radix-vue';
import { computedPick } from '../../shared';
import SHoverCardContent from './hover-card-content.vue';
import SHoverCardArrow from './hover-card-arrow.vue';
import type { HoverCardEmits, HoverCardProps } from './types';

defineOptions({
  name: 'SHoverCard'
});

const { avoidCollisions = true, prioritizePosition = true, ...delegatedProps } = defineProps<HoverCardProps>();

const emit = defineEmits<HoverCardEmits>();

const delegatedRootProps = computedPick(delegatedProps, ['defaultOpen', 'open', 'openDelay', 'closeDelay']);

const delegatedContentProps = computedPick(delegatedProps, [
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached',
  'updatePositionStrategy'
]);

const forwarded = useForwardPropsEmits(delegatedRootProps, emit);

const forwardedContentProps = useForwardProps(delegatedContentProps);
</script>

<template>
  <HoverCardRoot v-bind="forwarded">
    <HoverCardTrigger as-child>
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SHoverCardContent
        v-bind="forwardedContentProps"
        :class="contentClass"
        :force-mount="forceMountContent"
        :avoid-collisions
        :prioritize-position
      >
        <slot />
        <SHoverCardArrow v-if="showArrow" :class="arrowClass" :width="arrowWidth" :height="arrowHeight" />
      </SHoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
