<script setup lang="ts">
import { useDialogRootContext } from './context';
import type { DialogDescriptionProps } from './types';

const props = defineProps<DialogDescriptionProps>();

const { descriptionId } = useDialogRootContext('DialogDescription');
</script>

<template>
  <p :id="descriptionId" :class="props.class">
    <slot />
  </p>
</template>
