<script setup lang="ts">
import { MenuPortal } from '../menu';
import type { MenubarPortalProps } from './types';

defineOptions({
  name: 'MenubarPortal'
});

const props = defineProps<MenubarPortalProps>();
</script>

<template>
  <MenuPortal v-bind="props">
    <slot />
  </MenuPortal>
</template>
