<script setup lang="ts">
import { ContextMenuPortal, useForwardPropsEmits } from '@soybean-ui/primitives';
import SContextMenuArrow from '../menu/menu-arrow.vue';
import SContextMenuContent from './context-menu-content.vue';
import type { ContextMenuPortalContentEmits, ContextMenuPortalContentProps } from './types';

defineOptions({
  name: 'SContextMenuPortalContent'
});

const { to, defer, disabledPortal, forceMountPortal, contentClass, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<ContextMenuPortalContentProps>();

const emit = defineEmits<ContextMenuPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <ContextMenuPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <SContextMenuContent v-bind="forwardedContentProps" :class="contentClass" :force-mount="forceMountContent">
      <slot />
      <SContextMenuArrow v-if="showArrow" />
    </SContextMenuContent>
  </ContextMenuPortal>
</template>
