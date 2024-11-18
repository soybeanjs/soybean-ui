<script setup lang="ts">
import type { MenuGroupProps } from '../menu';
import { MenuGroup } from '../menu';
import { useForwardExpose } from '../../composables';

export interface ContextMenuGroupProps extends MenuGroupProps {}

const props = defineProps<ContextMenuGroupProps>();
useForwardExpose();
</script>

<template>
  <MenuGroup v-bind="props">
    <slot />
  </MenuGroup>
</template>
