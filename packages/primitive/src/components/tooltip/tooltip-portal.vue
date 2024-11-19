<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { TooltipPortalProps } from './types';

defineOptions({
  name: 'TooltipPortal'
});

const props = defineProps<TooltipPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
