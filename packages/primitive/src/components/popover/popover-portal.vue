<script setup lang="ts">
import type { TeleportProps } from '../teleport';

import { TeleportPrimitive } from '../teleport';

export interface PopoverPortalProps extends TeleportProps {}

const props = defineProps<PopoverPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
