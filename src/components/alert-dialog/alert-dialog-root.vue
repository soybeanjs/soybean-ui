<script setup lang="ts">
import { useForwardEmits } from '../../composables';
import { DialogRoot } from '../dialog';
import type { AlertDialogRootEmits, AlertDialogRootProps } from './types';

defineOptions({
  name: 'AlertDialogRoot',
  inheritAttrs: false
});

const props = withDefaults(defineProps<AlertDialogRootProps>(), {
  open: undefined,
  defaultOpen: false
});

const emit = defineEmits<AlertDialogRootEmits>();

const events = useForwardEmits(emit);
</script>

<template>
  <DialogRoot v-slot="slotProps" v-bind="props" modal v-on="events">
    <slot v-bind="slotProps" />
  </DialogRoot>
</template>
