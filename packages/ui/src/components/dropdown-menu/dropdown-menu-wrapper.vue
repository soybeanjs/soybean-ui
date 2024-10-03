<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuPortal, DropdownMenuRoot, DropdownMenuTrigger, useEmitAsProps, useForwardProps } from 'radix-vue';
import { computedOmitEmits, computedPick } from '../../shared';
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

const forwardedEmits = useEmitAsProps(emit) as Record<keyof DropdownMenuWrapperEmits, any>;

const delegatedRootProps = computedPick(delegatedProps, ['defaultOpen', 'open', 'dir', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedPick(delegatedProps, [
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

const forwardedContentProps = useForwardProps(delegatedContentProps);

const forwardedContentEmits = computedOmitEmits(forwardedEmits, ['update:open']);

const forwardedContent = computed(() => ({
  ...forwardedContentProps.value,
  ...forwardedContentEmits.value
}));
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
