<script lang="ts">
import type { MenuSubTriggerProps } from '../menu';
import { MenuSubTrigger } from '../menu';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface DropdownMenuSubTriggerProps extends MenuSubTriggerProps {}

const props = defineProps<DropdownMenuSubTriggerProps>();
useForwardExpose();
</script>

<template>
  <MenuSubTrigger v-bind="props">
    <slot />
  </MenuSubTrigger>
</template>
