<script setup lang="ts">
import { MenubarPortal, useForwardPropsEmits } from '@soybean-ui/primitive';
import SMenubarArrow from '../menu/menu-arrow.vue';
import SMenubarContent from './menubar-content.vue';
import type { MenubarPortalContentEmits, MenubarPortalContentProps } from './types';

defineOptions({
  name: 'SMenubarPortalContent'
});

const { to, disabledPortal, forceMountPortal, contentClass, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<MenubarPortalContentProps>();

const emit = defineEmits<MenubarPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <MenubarPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <SMenubarContent v-bind="forwardedContentProps" :class="contentClass" :force-mount="forceMountContent">
      <slot />
      <SMenubarArrow v-if="showArrow" />
    </SMenubarContent>
  </MenubarPortal>
</template>
