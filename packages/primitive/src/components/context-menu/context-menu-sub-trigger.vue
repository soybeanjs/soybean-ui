<script lang="ts">
import type { MenuSubTriggerProps } from '../menu';
</script>

<script setup lang="ts">
import { MenuSubTrigger } from '../menu';
import { useForwardExpose } from '../../composables';

export interface ContextMenuSubTriggerProps extends MenuSubTriggerProps {}

const props = defineProps<ContextMenuSubTriggerProps>();
useForwardExpose();
</script>

<template>
  <MenuSubTrigger v-bind="props">
    <slot />
  </MenuSubTrigger>
</template>
