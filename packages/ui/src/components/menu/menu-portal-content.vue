<script setup lang="ts">
import { MenuPortal, useForwardPropsEmits } from '@soybean-ui/primitives';
import SMenuContent from './menu-content.vue';
import SMenuArrow from './menu-arrow.vue';
import type { MenuPortalContentEmits, MenuPortalContentProps } from './types';

defineOptions({
  name: 'SMenuPortalContent'
});

const { to, disabledPortal, forceMountPortal, contentClass, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<MenuPortalContentProps>();

const emit = defineEmits<MenuPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <MenuPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <SMenuContent v-bind="forwardedContentProps" :class="contentClass" :force-mount="forceMountContent">
      <slot />
      <SMenuArrow v-if="showArrow" />
    </SMenuContent>
  </MenuPortal>
</template>
