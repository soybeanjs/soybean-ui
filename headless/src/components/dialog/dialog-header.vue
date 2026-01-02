<script setup lang="ts">
import { useDialogUi } from './context';
import type { DialogHeaderProps } from './types';

defineOptions({
  name: 'DialogHeader'
});

defineProps<DialogHeaderProps>();

const cls = useDialogUi('header');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
