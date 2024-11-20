<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { SelectPortalProps } from './types';

defineOptions({
  name: 'SelectPortal'
});

const props = defineProps<SelectPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
