<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogDescription } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogDescriptionProps } from '../types';

defineOptions({
  name: 'SAlertDialogDescription'
});

const { class: cls, size } = defineProps<AlertDialogDescriptionProps>();

const mergedCls = computed(() => {
  const { description } = dialogVariants({ size });

  return cn(description(), cls);
});
</script>

<template>
  <AlertDialogDescription :class="mergedCls">
    <slot />
  </AlertDialogDescription>
</template>
