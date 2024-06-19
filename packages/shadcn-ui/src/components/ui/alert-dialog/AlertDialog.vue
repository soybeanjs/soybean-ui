<script setup lang="ts">
import { type AlertDialogEmits, type AlertDialogProps, AlertDialogRoot, useForwardPropsEmits } from 'radix-vue';

const props = defineProps<AlertDialogProps>();
const emit = defineEmits<AlertDialogEmits>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot />
  </AlertDialogRoot>
</template>
