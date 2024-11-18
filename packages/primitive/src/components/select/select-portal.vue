<script setup lang="ts">
import type { TeleportProps } from '../teleport/types';

import { TeleportPrimitive } from '../teleport';

export interface SelectPortalProps extends TeleportProps {}

const props = defineProps<SelectPortalProps>();
</script>

<template>
  <TeleportPrimitive v-bind="props">
    <slot />
  </TeleportPrimitive>
</template>
