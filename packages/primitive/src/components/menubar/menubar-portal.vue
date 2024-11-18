<script setup lang="ts">
import type { MenuPortalProps } from '../menu';

import { MenuPortal } from '../menu';

export interface MenubarPortalProps extends MenuPortalProps {}

const props = defineProps<MenubarPortalProps>();
</script>

<template>
  <MenuPortal v-bind="props">
    <slot />
  </MenuPortal>
</template>
