<script setup lang="ts">
import { computed } from 'vue';
import { PopoverClose, PopoverPortal, PopoverRoot, PopoverTrigger, useEmitAsProps, useForwardProps } from '@soybean-ui/primitive';
import { computedOmitEmits, computedPick } from '../../shared';
import SPopoverContent from './popover-content.vue';
import SPopoverArrow from './popover-arrow.vue';
import type { PopoverEmits, PopoverProps } from './types';

defineOptions({
  name: 'SPopover'
});

const { avoidCollisions = true, prioritizePosition = true, ...delegatedProps } = defineProps<PopoverProps>();

const emit = defineEmits<PopoverEmits>();

const delegatedRootProps = computedPick(delegatedProps, ['defaultOpen', 'open', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedPick(delegatedProps, [
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

const emits = useEmitAsProps(emit) as Record<keyof PopoverEmits, any>;

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedContentEmits = computedOmitEmits(emits, ['update:open']);

const forwardedContent = computed(() => ({
  ...forwardedContentProps.value,
  ...forwardedContentEmits.value
}));
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
