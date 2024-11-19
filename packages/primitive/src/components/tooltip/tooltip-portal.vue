<script setup lang="ts">
import type { TeleportProps } from '../teleport';

import { TeleportPrimitive } from '../teleport';

export interface TooltipPortalProps extends TeleportProps {}

const props = defineProps<TooltipPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
