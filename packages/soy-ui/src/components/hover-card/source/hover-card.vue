<script setup lang="ts">
import {
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
  useCombinedPropsEmits,
  useForwardProps,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitives';
import type { HoverCardEmits, HoverCardProps } from '../types';
import SHoverCardContent from './hover-card-content.vue';
import SHoverCardArrow from './hover-card-arrow.vue';

defineOptions({
  name: 'SHoverCard'
});

const props = defineProps<HoverCardProps>();

const emit = defineEmits<HoverCardEmits>();

const delegatedRootProps = usePickForwardProps(props, ['defaultOpen', 'open', 'openDelay', 'closeDelay']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = usePickForwardProps(props, [
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

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);
</script>

<template>
  <HoverCardRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <HoverCardTrigger as-child>
      <slot name="trigger" />
    </HoverCardTrigger>
    <HoverCardPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SHoverCardContent
        v-bind="forwardedContent"
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
