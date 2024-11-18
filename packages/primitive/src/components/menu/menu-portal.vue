<script setup lang="ts">
import type { TeleportProps } from '../teleport';

import { TeleportPrimitive } from '../teleport';

export interface MenuPortalProps extends TeleportProps {}

const props = defineProps<MenuPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
