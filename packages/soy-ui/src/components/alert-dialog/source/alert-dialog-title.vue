<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogTitle } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogTitleProps } from '../types';

defineOptions({
  name: 'SAlertDialogTitle'
});

const { class: cls, size } = defineProps<AlertDialogTitleProps>();

const mergedCls = computed(() => {
  const { title } = dialogVariants({ size });

  return cn(title(), cls);
});
</script>

<template>
  <AlertDialogTitle :class="mergedCls">
    <slot />
  </AlertDialogTitle>
</template>
