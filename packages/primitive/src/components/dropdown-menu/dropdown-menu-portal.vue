<script setup lang="ts">
import { MenuPortal } from '../menu';
import type { DropdownMenuPortalProps } from './types';

defineOptions({
  name: 'DropdownMenuPortal'
});

const props = defineProps<DropdownMenuPortalProps>();
</script>

<template>
  <MenuPortal v-bind="props">
    <slot />
  </MenuPortal>
</template>
