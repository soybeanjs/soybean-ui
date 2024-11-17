<script lang="ts">
import type { MenuArrowProps } from '../menu';
import { MenuArrow } from '../menu';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface ContextMenuArrowProps extends MenuArrowProps {}

const props = withDefaults(defineProps<ContextMenuArrowProps>(), {
  width: 10,
  height: 5,
  as: 'svg'
});

useForwardExpose();
</script>

<template>
  <MenuArrow v-bind="props">
    <slot />
  </MenuArrow>
</template>
