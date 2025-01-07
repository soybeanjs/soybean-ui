<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { HoverCardPortalProps } from './types';

defineOptions({
  name: 'HoverCardPortal'
});

const props = defineProps<HoverCardPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
