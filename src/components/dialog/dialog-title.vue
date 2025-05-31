<script setup lang="ts">
import { useDialogRootContext } from './context';
import type { DialogTitleProps } from './types';

defineOptions({
  name: 'DialogTitle'
});

const props = defineProps<DialogTitleProps>();

const { titleId } = useDialogRootContext('DialogTitle');
</script>

<template>
  <h2 v-bind="props" :id="titleId">
    <slot />
  </h2>
</template>
