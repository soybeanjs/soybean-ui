<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';
import type { DialogPortalProps } from './types';

defineOptions({
  name: 'DialogPortal'
});

const props = defineProps<DialogPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
