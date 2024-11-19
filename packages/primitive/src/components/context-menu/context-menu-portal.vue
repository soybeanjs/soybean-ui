<script setup lang="ts">
import { MenuPortal } from '../menu';
import type { ContextMenuPortalProps } from './types';

defineOptions({
  name: 'ContextMenuPortal'
});

const props = defineProps<ContextMenuPortalProps>();
</script>

<template>
  <MenuPortal v-bind="props">
    <slot />
  </MenuPortal>
</template>
