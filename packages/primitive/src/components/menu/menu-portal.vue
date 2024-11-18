<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { MenuPortalProps } from './types';

defineOptions({
  name: 'MenuPortal'
});

const props = defineProps<MenuPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
