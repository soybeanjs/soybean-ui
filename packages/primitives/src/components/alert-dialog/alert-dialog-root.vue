<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import { DialogRoot } from '../dialog';
import type { AlertDialogRootEmits, AlertDialogRootProps } from './types';

defineOptions({
  name: 'AlertDialogRoot'
});

const props = defineProps<AlertDialogRootProps>();

const emit = defineEmits<AlertDialogRootEmits>();

const forwarded = useForwardPropsEmits(props, emit);

useForwardExpose();
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="forwarded" modal>
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>
