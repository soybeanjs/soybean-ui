<script lang="ts">
import type { MenuSubTriggerProps } from '../menu';
import { MenuSubTrigger } from '../menu';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface MenubarSubTriggerProps extends MenuSubTriggerProps {}

const props = defineProps<MenubarSubTriggerProps>();
useForwardExpose();
</script>

<template>
  <MenuSubTrigger v-bind="props" data-soybean-menubar-subtrigger="">
    <slot />
  </MenuSubTrigger>
</template>
