<script setup lang="ts">
import { DialogRoot } from '../dialog';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { AlertDialogRootEmits, AlertDialogRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogRoot'
});

const props = defineProps<AlertDialogRootPropsWithPrimitive>();

const emit = defineEmits<AlertDialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <DialogRoot v-bind="forwarded" modal>
    <slot />
  </DialogRoot>
</template>
