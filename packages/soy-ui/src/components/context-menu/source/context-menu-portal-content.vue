<script setup lang="ts">
import { ContextMenuPortal, useForwardPropsEmits } from '@soybean-ui/primitives';
import SContextMenuArrow from '../../menu/source/menu-arrow.vue';
import type { ContextMenuPortalContentEmits, ContextMenuPortalContentProps } from '../types';
import SContextMenuContent from './context-menu-content.vue';

defineOptions({
  name: 'SContextMenuPortalContent'
});

const { ui, to, defer, disabledPortal, forceMountPortal, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<ContextMenuPortalContentProps>();

const emit = defineEmits<ContextMenuPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <ContextMenuPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <SContextMenuContent v-bind="forwardedContentProps" :class="ui?.content" :force-mount="forceMountContent">
      <slot />
      <SContextMenuArrow v-if="showArrow" :class="ui?.arrow" />
    </SContextMenuContent>
  </ContextMenuPortal>
</template>
