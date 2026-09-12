<script setup lang="ts">
import { DialogFooter } from '../dialog';
import type { DrawerFooterProps } from './types';

defineOptions({
  name: 'DrawerFooter'
});

const props = defineProps<DrawerFooterProps>();
</script>

<template>
  <DialogFooter v-bind="props" data-soybean-drawer-footer>
    <slot />
  </DialogFooter>
</template>
