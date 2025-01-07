<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { ComboboxPortalProps } from './types';

defineOptions({
  name: 'ComboboxPortal'
});

const props = defineProps<ComboboxPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
