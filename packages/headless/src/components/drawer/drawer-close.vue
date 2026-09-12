<script setup lang="ts">
import { DialogClose } from '../dialog';
import type { DrawerCloseProps, DrawerCloseEmits } from './types';

defineOptions({
  name: 'DrawerClose'
});

const props = defineProps<DrawerCloseProps>();

const emit = defineEmits<DrawerCloseEmits>();
</script>

<template>
  <DialogClose v-bind="props" data-soybean-drawer-close @close="emit('close', $event)">
    <slot />
  </DialogClose>
</template>
