<script setup lang="ts">
import type { TeleportProps } from '../teleport/types';

import { TeleportPrimitive } from '../teleport';

export interface HoverCardPortalProps extends TeleportProps {}

const props = defineProps<HoverCardPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
