<script setup lang="ts">
import { useDialogRootContext } from './context';
import type { DialogTitleProps } from './types';

const props = defineProps<DialogTitleProps>();

const { titleId } = useDialogRootContext('DialogTitle');
</script>

<template>
  <div :id="titleId" :class="props.class">
    <slot />
  </div>
</template>
