<script setup lang="ts">
import { DialogTrigger } from '../dialog';
import { useForwardExpose } from '../../composables';
import type { AlertDialogTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'AlertDialogTrigger'
});

const props = defineProps<AlertDialogTriggerPropsWithPrimitive>();

useForwardExpose();
</script>

<template>
  <DialogTrigger v-bind="props">
    <slot />
  </DialogTrigger>
</template>
