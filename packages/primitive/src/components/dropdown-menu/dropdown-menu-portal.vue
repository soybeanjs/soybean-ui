<script setup lang="ts">
import type { MenuPortalProps } from '../menu';

import { MenuPortal } from '../menu';

export interface DropdownMenuPortalProps extends MenuPortalProps {}

const props = defineProps<DropdownMenuPortalProps>();
</script>

<template>
  <MenuPortal v-bind="props">
    <slot />
  </MenuPortal>
</template>
