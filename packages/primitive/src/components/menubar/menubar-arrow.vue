<script setup lang="ts">
import { MenuArrow } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarArrow'
});

const props = withDefaults(defineProps<MenubarArrowPropsWithPrimitive>(), {
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
