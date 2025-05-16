<script setup lang="ts">
import { MenuPortal, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { MenuPortalContentEmits, MenuPortalContentProps } from '../types';
import SMenuContent from './menu-content.vue';
import SMenuArrow from './menu-arrow.vue';

defineOptions({
  name: 'SMenuPortalContent'
});

const { to, defer, disabledPortal, forceMountPortal, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<MenuPortalContentProps>();

const emit = defineEmits<MenuPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <MenuPortal :to="to" :defer="defer" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <SMenuContent v-bind="forwardedContentProps" :force-mount="forceMountContent">
      <slot />
      <SMenuArrow v-if="showArrow" />
    </SMenuContent>
  </MenuPortal>
</template>
