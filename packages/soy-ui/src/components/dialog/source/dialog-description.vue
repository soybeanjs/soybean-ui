<script setup lang="ts">
import { computed } from 'vue';
import { DialogDescription } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogDescriptionProps } from '../types';

defineOptions({
  name: 'SDialogDescription'
});

const { class: cls, size } = defineProps<DialogDescriptionProps>();

const mergedCls = computed(() => {
  const { description } = dialogVariants({ size });

  return cn(description(), cls);
});
</script>

<template>
  <DialogDescription :class="mergedCls">
    <slot />
  </DialogDescription>
</template>
