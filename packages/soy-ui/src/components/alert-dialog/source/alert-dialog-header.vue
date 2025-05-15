<script setup lang="ts">
import { computed } from 'vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogHeaderProps } from '../types';

defineOptions({
  name: 'SAlertDialogHeader'
});

const { class: cls, size } = defineProps<AlertDialogHeaderProps>();

const mergedCls = computed(() => {
  const { header } = dialogVariants({ size });

  return cn(header(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
