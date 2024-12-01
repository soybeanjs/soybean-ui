<script setup lang="ts">
import {
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  useCombinedPropsEmits,
  useOmitEmitAsProps,
  usePickForwardProps
} from '@soybean-ui/primitive';
import SDropdownMenuContent from './dropdown-menu-content.vue';
import SDropdownMenuArrow from './dropdown-menu-arrow.vue';
import type { DropdownMenuWrapperEmits, DropdownMenuWrapperProps } from './types';

defineOptions({
  name: 'SDropdownMenuWrapper'
});

const {
  avoidCollisions = true,
  prioritizePosition = true,
  ...delegatedProps
} = defineProps<DropdownMenuWrapperProps>();

const emit = defineEmits<DropdownMenuWrapperEmits>();

const forwardedRootProps = usePickForwardProps(delegatedProps, ['defaultOpen', 'open', 'dir', 'modal']);

const forwardedContentProps = usePickForwardProps(delegatedProps, [
  'loop',
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

const forwardedContentEmits = useOmitEmitAsProps(emit, ['update:open']);

const forwardedContent = useCombinedPropsEmits(forwardedContentProps, forwardedContentEmits);
</script>

<template>
  <DropdownMenuRoot v-bind="forwardedRootProps" @update:open="emit('update:open', $event)">
    <DropdownMenuTrigger as-child>
      <slot name="trigger" />
    </DropdownMenuTrigger>
    <DropdownMenuPortal :to :disabled="disabledPortal" :force-mount="forceMountPortal" />
    <SDropdownMenuContent
      v-bind="forwardedContent"
      :class="contentClass"
      :avoid-collisions
      :prioritize-position
      :force-mount="forceMountContent"
    >
      <slot />
      <SDropdownMenuArrow v-if="showArrow" />
    </SDropdownMenuContent>
  </DropdownMenuRoot>
</template>

<style scoped></style>
