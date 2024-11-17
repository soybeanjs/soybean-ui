<script setup lang="ts">
import { DialogPortal } from '../dialog';
import type { AlertDialogPortalProps } from './types';

defineOptions({
  name: 'AlertDialogPortal'
});

const props = defineProps<AlertDialogPortalProps>();
</script>

<template>
  <DialogPortal v-bind="props">
    <slot />
  </DialogPortal>
</template>
