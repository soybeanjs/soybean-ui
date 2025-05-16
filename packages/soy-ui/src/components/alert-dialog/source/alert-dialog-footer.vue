<script setup lang="ts">
import { computed } from 'vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogFooterProps } from '../types';

defineOptions({
  name: 'SAlertDialogFooter'
});

const { class: cls, size } = defineProps<AlertDialogFooterProps>();

const mergedCls = computed(() => {
  const { footer } = dialogVariants({ size });

  return cn(footer(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
