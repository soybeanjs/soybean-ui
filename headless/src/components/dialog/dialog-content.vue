<script setup lang="ts">
import { useDialogUi } from './context';
import type { DialogContentProps } from './types';

defineOptions({
  name: 'DialogContent'
});

defineProps<DialogContentProps>();

const cls = useDialogUi('content');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
