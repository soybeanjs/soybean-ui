<script setup lang="ts">
import { useToastUi } from './context';
import type { ToastTitleProps } from './types';

defineOptions({
  name: 'ToastTitle'
});

defineProps<ToastTitleProps>();

const cls = useToastUi('title');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
