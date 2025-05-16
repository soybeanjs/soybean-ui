<script setup lang="ts">
import { computed } from 'vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogFooterProps } from '../types';

defineOptions({
  name: 'SDialogFooter'
});

const { class: cls, size } = defineProps<DialogFooterProps>();

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
