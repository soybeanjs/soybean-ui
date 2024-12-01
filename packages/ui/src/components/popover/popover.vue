<script setup lang="ts">
import {
  PopoverClose,
  PopoverPortal,
  PopoverRoot,
  PopoverTrigger,
  useCombinedPropsEmits,
  useForwardProps,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import SPopoverContent from './popover-content.vue';
import SPopoverArrow from './popover-arrow.vue';
import type { PopoverEmits, PopoverProps } from './types';

defineOptions({
  name: 'SPopover'
});

const { avoidCollisions = true, prioritizePosition = true, ...delegatedProps } = defineProps<PopoverProps>();

const emit = defineEmits<PopoverEmits>();

const delegatedRootProps = usePickForwardProps(delegatedProps, ['defaultOpen', 'open', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = usePickForwardProps(delegatedProps, [
  'trapFocus',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached',
  'updatePositionStrategy',
  'disableOutsidePointerEvents'
]);

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);
</script>

<template>
  <PopoverRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <PopoverTrigger as-child>
      <slot name="trigger" />
    </PopoverTrigger>
    <PopoverPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal">
      <SPopoverContent
        v-bind="forwardedContent"
        :class="contentClass"
        :force-mount="forceMountContent"
        :avoid-collisions
        :prioritize-position
      >
        <slot />
        <SPopoverArrow v-if="showArrow" :class="arrowClass" :width="arrowWidth" :height="arrowHeight" />
        <PopoverClose v-if="$slots.close" as-child>
          <slot name="close" />
        </PopoverClose>
      </SPopoverContent>
    </PopoverPortal>
  </PopoverRoot>
</template>

<style scoped></style>
