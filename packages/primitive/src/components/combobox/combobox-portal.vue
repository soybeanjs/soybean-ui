<script lang="ts">
import type { TeleportProps } from '../teleport';
</script>

<script setup lang="ts">
import { TeleportPrimitive } from '../teleport';

export interface ComboboxPortalProps extends TeleportProps {}

const props = defineProps<ComboboxPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
