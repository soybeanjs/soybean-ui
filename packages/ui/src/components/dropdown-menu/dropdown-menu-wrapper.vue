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

const props = withDefaults(defineProps<DropdownMenuWrapperProps>(), {
  avoidCollisions: true,
  prioritizePosition: true
});

const emit = defineEmits<DropdownMenuWrapperEmits>();

const forwardedEmits = useEmitAsProps(emit) as Record<keyof DropdownMenuWrapperEmits, any>;

const delegatedRootProps = computedPick(props, ['defaultOpen', 'open', 'dir', 'modal']);

const forwardedRootProps = useForwardProps(delegatedRootProps);

const delegatedContentProps = computedPick(props, [
  'loop',
  'side',
  'sideOffset',
  'align',
  'alignOffset',
  'avoidCollisions',
  'collisionBoundary',
  'collisionPadding',
  'arrowPadding',
  'sticky',
  'hideWhenDetached',
  'updatePositionStrategy',
  'prioritizePosition'
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
    <DropdownMenuPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal"></DropdownMenuPortal>
    <SDropdownMenuContent v-bind="forwardedContent" :class="contentClass" :force-mount="forceMountContent">
      <slot />
      <SDropdownMenuArrow v-if="showArrow" />
    </SDropdownMenuContent>
  </DropdownMenuRoot>
</template>

<style scoped></style>
