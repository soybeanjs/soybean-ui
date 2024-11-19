<script setup lang="ts">
import { MenuSubTrigger } from '../menu';
import { useForwardExpose } from '../../composables';
import type { MenubarSubTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarSubTrigger'
});

const props = defineProps<MenubarSubTriggerPropsWithPrimitive>();
useForwardExpose();
</script>

<template>
  <MenuSubTrigger v-bind="props" data-soybean-menubar-sub-trigger="">
    <slot />
  </MenuSubTrigger>
</template>
