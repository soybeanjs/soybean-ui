<script lang="ts">
import type { MenuGroupProps } from '../menu';
import { MenuGroup } from '../menu';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface DropdownMenuGroupProps extends MenuGroupProps {}

const props = defineProps<DropdownMenuGroupProps>();
useForwardExpose();
</script>

<template>
  <MenuGroup v-bind="props">
    <slot />
  </MenuGroup>
</template>
