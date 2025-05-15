<script setup lang="ts">
import { MenubarPortal, useForwardPropsEmits } from '@soybean-ui/primitives';
import SMenubarArrow from '../../menu/source/menu-arrow.vue';
import type { MenubarPortalContentEmits, MenubarPortalContentProps } from '../types';
import SMenubarContent from './menubar-content.vue';

defineOptions({
  name: 'SMenubarPortalContent'
});

const { to, disabledPortal, forceMountPortal, forceMountContent, showArrow, ...delegatedProps } =
  defineProps<MenubarPortalContentProps>();

const emit = defineEmits<MenubarPortalContentEmits>();

const forwardedContentProps = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <MenubarPortal :to="to" :disabled="disabledPortal" :force-mount="forceMountPortal">
    <SMenubarContent v-bind="forwardedContentProps" :force-mount="forceMountContent">
      <slot />
      <SMenubarArrow v-if="showArrow" />
    </SMenubarContent>
  </MenubarPortal>
</template>
