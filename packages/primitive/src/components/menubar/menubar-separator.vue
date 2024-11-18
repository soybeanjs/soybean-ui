<script setup lang="ts">
import type { MenuSeparatorProps } from '../menu';
import { MenuSeparator } from '../menu';
import { useForwardExpose } from '../../composables';

export interface MenubarSeparatorProps extends MenuSeparatorProps {}

const props = defineProps<MenubarSeparatorProps>();
useForwardExpose();
</script>

<template>
  <MenuSeparator v-bind="props">
    <slot />
  </MenuSeparator>
</template>
