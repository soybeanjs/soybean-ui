<script setup lang="ts">
import {
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
  useForwardProps,
  useForwardPropsEmits,
  usePickForwardProps
} from '@soybean-ui/primitives';
import SHoverCardContent from './hover-card-content.vue';
import SHoverCardArrow from './hover-card-arrow.vue';
import type { HoverCardEmits, HoverCardProps } from './types';

defineOptions({
  name: 'SHoverCard'
});

const { avoidCollisions = true, prioritizePosition = true, ...delegatedProps } = defineProps<HoverCardProps>();

const emit = defineEmits<HoverCardEmits>();

const delegatedRootProps = usePickForwardProps(delegatedProps, ['defaultOpen', 'open', 'openDelay', 'closeDelay']);

const delegatedContentProps = usePickForwardProps(delegatedProps, [
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
    <HoverCardPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SHoverCardContent
        v-bind="forwardedContentProps"
        :class="ui?.content"
        :force-mount="forceMountContent"
        :avoid-collisions="avoidCollisions"
        :prioritize-position="prioritizePosition"
      >
        <slot />
        <SHoverCardArrow v-if="showArrow" :class="ui?.arrow" :width="arrowWidth" :height="arrowHeight" />
      </SHoverCardContent>
    </HoverCardPortal>
  </HoverCardRoot>
</template>
