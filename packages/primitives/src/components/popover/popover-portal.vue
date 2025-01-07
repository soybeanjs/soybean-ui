<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { PopoverPortalProps } from './types';

defineOptions({
  name: 'PopoverPortal'
});

const props = defineProps<PopoverPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
