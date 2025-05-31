<script setup lang="ts">
import { useDialogRootContext } from './context';
import type { DialogDescriptionProps } from './types';

defineOptions({
  name: 'DialogDescription'
});

const props = defineProps<DialogDescriptionProps>();

const { descriptionId } = useDialogRootContext('DialogDescription');
</script>

<template>
  <p v-bind="props" :id="descriptionId">
    <slot />
  </p>
</template>
