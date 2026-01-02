<script setup lang="ts">
import { useToastUi } from './context';
import type { ToastDescriptionProps } from './types';

defineOptions({
  name: 'ToastDescription'
});

defineProps<ToastDescriptionProps>();

const cls = useToastUi('description');
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
