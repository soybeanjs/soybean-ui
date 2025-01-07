<script setup lang="ts">
import { ContextMenuPortal, useForwardPropsEmits } from '@soybean-ui/primitives';
import ContextMenuArrow from '../menu/menu-arrow.vue';
import ContextMenuContent from './context-menu-content.vue';
import type { ContextMenuPortalContentEmits, ContextMenuPortalContentProps } from './types';

defineOptions({
  name: 'SContextMenuPortalContent'
});

const { to, disabledPortal, forceMountPortal, contentClass, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<ContextMenuPortalContentProps>();

const emit = defineEmits<ContextMenuPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <ContextMenuPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <ContextMenuContent v-bind="forwardedContentProps" :class="contentClass" :force-mount="forceMountContent">
      <slot />
      <ContextMenuArrow v-if="showArrow" />
    </ContextMenuContent>
  </ContextMenuPortal>
</template>
