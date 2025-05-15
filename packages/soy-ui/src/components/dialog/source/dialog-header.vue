<script setup lang="ts">
import { computed } from 'vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogHeaderProps } from '../types';

defineOptions({
  name: 'SDialogHeader'
});

const { class: cls, size } = defineProps<DialogHeaderProps>();

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
